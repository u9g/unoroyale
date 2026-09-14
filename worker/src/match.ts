import { DurableObject } from 'cloudflare:workers'
import type { GameState } from '../../src/engine/gameState'
import type { Color } from '../../src/engine/card'
import * as Game from '../../src/engine/game'
import { takeAiTurn } from '../../src/engine/ai'
import { redactFor } from '../../src/engine/redact'
import { seededRng } from '../../src/engine/rng'
import { nextRating, skillForRating, START_RATING } from '../../src/engine/elo'
import { applyResult, emptyProfile } from '../../src/ladder'
import { botName } from './botNames'
import type { Env } from './env'

/** The human always sits at seat 0; bots take the rest. */
const SEAT = 0
const DEFAULT_AI_DELAY_MS = 900

interface Match {
  id: string
  deviceId: string
  seed: number
  turns: number
  state: GameState
  opponent: string
  ratingBefore: number
  matchesBefore: number
  trophiesBefore: number
  settled: boolean
}

export interface MatchStart {
  id: string
  deviceId: string
  playerName: string
  rating: number
  matches: number
  trophies: number
}

type Intent =
  | { t: 'play'; cardIndex: number; color?: Color | null }
  | { t: 'draw' }
  | { t: 'one' }

export class MatchRoom extends DurableObject<Env> {
  async fetch(req: Request): Promise<Response> {
    const url = new URL(req.url)
    if (url.pathname.endsWith('/start')) {
      await this.start(await req.json<MatchStart>())
      return new Response(null, { status: 204 })
    }
    if (req.headers.get('upgrade') !== 'websocket') return new Response('expected websocket', { status: 426 })

    const match = await this.load()
    if (!match) return new Response('no such match', { status: 404 })
    if (url.searchParams.get('device_id') !== match.deviceId) return new Response('not your match', { status: 403 })

    const pair = new WebSocketPair()
    // Hibernation: the socket outlives this instance, so state lives in storage
    this.ctx.acceptWebSocket(pair[1])
    pair[1].send(JSON.stringify({ t: 'state', state: redactFor(match.state, SEAT) }))
    await this.scheduleAi(match)
    return new Response(null, { status: 101, webSocket: pair[0] })
  }

  async start(opts: MatchStart): Promise<void> {
    const seed = (Math.random() * 2 ** 32) >>> 0
    const rng = seededRng(seed)
    const skill = skillForRating(opts.rating)
    const opponent = botName(rng)
    const state = Game.newGame(opts.playerName, 2, { rng, aiSkill: skill, aiNames: [opponent] })

    await this.ctx.storage.put('match', {
      id: opts.id,
      deviceId: opts.deviceId,
      seed,
      turns: 0,
      state,
      opponent,
      ratingBefore: opts.rating,
      matchesBefore: opts.matches,
      trophiesBefore: opts.trophies,
      settled: false,
    } satisfies Match)
  }

  async webSocketMessage(ws: WebSocket, raw: string | ArrayBuffer): Promise<void> {
    const match = await this.load()
    if (!match || match.settled) return

    let intent: Intent
    try {
      intent = JSON.parse(typeof raw === 'string' ? raw : new TextDecoder().decode(raw))
    } catch {
      return ws.send(JSON.stringify({ t: 'error', error: 'bad_json' }))
    }

    // The server decides whether the move was legal; the client only asks
    const result = this.apply(match.state, intent)
    if (!result.ok) return ws.send(JSON.stringify({ t: 'error', error: result.error }))

    match.state = result.state
    match.turns++
    await this.save(match)
    this.broadcast({ t: 'state', state: redactFor(match.state, SEAT) })
    await this.afterTurn(match)
  }

  async alarm(): Promise<void> {
    const match = await this.load()
    if (!match || match.settled || match.state.phase !== 'playing') return
    if (match.state.players[match.state.currentPlayer].type !== 'ai') return

    match.state = takeAiTurn(match.state, match.state.currentPlayer, seededRng(match.seed + match.turns))
    match.turns++
    await this.save(match)
    this.broadcast({ t: 'state', state: redactFor(match.state, SEAT) })
    await this.afterTurn(match)
  }

  // --- Private ---

  private apply(
    state: GameState,
    intent: Intent
  ): { ok: true; state: GameState } | { ok: false; error: string } {
    if (state.phase !== 'playing') return { ok: false, error: 'wrong_phase' }
    if (state.currentPlayer !== SEAT) return { ok: false, error: 'not_your_turn' }

    if (intent.t === 'one') return Game.sayUno(state, SEAT)
    if (intent.t === 'play') return Game.playCard(state, SEAT, intent.cardIndex, intent.color ?? null)

    const drawn = Game.drawCard(state, SEAT)
    if (!drawn.ok) return drawn
    const top = state.discardPile[0]
    // A playable draw stays in hand for the player to use; anything else passes
    const playable = top && (drawn.drawnCard.color === null || drawn.drawnCard.color === (top.chosenColor ?? top.color) || drawn.drawnCard.value === top.value)
    return playable ? { ok: true, state: drawn.state } : Game.pass(drawn.state, SEAT)
  }

  private async afterTurn(match: Match): Promise<void> {
    if (match.state.phase === 'game_over') return this.settle(match)
    await this.scheduleAi(match)
  }

  private async scheduleAi(match: Match): Promise<void> {
    if (match.state.phase !== 'playing') return
    if (match.state.players[match.state.currentPlayer].type !== 'ai') return
    const delay = Number(this.env.AI_DELAY_MS ?? DEFAULT_AI_DELAY_MS)
    await this.ctx.storage.setAlarm(Date.now() + delay)
  }

  private async settle(match: Match): Promise<void> {
    const won = match.state.finished[0] === SEAT
    // The bot is tuned to this player's rating, so it counts as an equal
    const rating = nextRating(match.ratingBefore, match.ratingBefore, won, match.matchesBefore)
    const ladder = applyResult({ ...emptyProfile(), trophies: match.trophiesBefore }, won)

    match.settled = true
    await this.save(match)

    await this.env.DB.batch([
      this.env.DB.prepare(
        `insert into ratings (device_id, rating, matches, trophies, updated)
         values (?, ?, ?, ?, current_timestamp)
         on conflict(device_id) do update set
           rating = excluded.rating, matches = excluded.matches,
           trophies = excluded.trophies, updated = current_timestamp`
      ).bind(match.deviceId, rating, match.matchesBefore + 1, ladder.profile.trophies),
      this.env.DB.prepare(
        `insert into matches (id, device_id, opponent, opponent_kind, won, seed, turns,
                              rating_before, rating_after, trophies_after)
         values (?, ?, ?, 'bot', ?, ?, ?, ?, ?, ?)`
      ).bind(match.id, match.deviceId, match.opponent, won ? 1 : 0, match.seed, match.turns,
             match.ratingBefore, rating, ladder.profile.trophies),
    ])

    this.broadcast({
      t: 'result',
      won,
      delta: ladder.delta,
      trophies: ladder.profile.trophies,
      promoted: ladder.promoted?.name ?? null,
      floored: ladder.floored,
      rating,
    })
  }

  private broadcast(message: unknown): void {
    const payload = JSON.stringify(message)
    for (const ws of this.ctx.getWebSockets()) ws.send(payload)
  }

  private load(): Promise<Match | undefined> {
    return this.ctx.storage.get<Match>('match')
  }

  private save(match: Match): Promise<void> {
    return this.ctx.storage.put('match', match)
  }
}

export { START_RATING }
