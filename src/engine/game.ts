import type { Card, Color } from './card'
import { isWild, cardToString } from './card'
import * as Deck from './deck'
import type { Player } from './player'
import { handSize, removeCardAt, addCards } from './player'
import type { GameState } from './gameState'
import { topCard, updatePlayer, nextPlayerIndex, recordPlay, advanceTurn } from './gameState'
import { playable } from './rules'
import type { Rng } from './rng'
import { defaultRng, pick } from './rng'

const HAND_SIZE = 7
const DEFAULT_AI_SKILL = 0.6
export const MIN_PLAYERS = 2
export const MAX_PLAYERS = 4

// Callers supply opponent names; these are only a fallback so the engine stays
// free of app assets and runs unchanged inside a Worker
function fallbackNames(count: number): string[] {
  return Array.from({ length: count }, (_, i) => `Player ${i + 2}`)
}

export interface NewGameOptions {
  rng?: Rng
  /** AI strength, 0 (careless) to 1 (sharp); see engine/skill.ts */
  aiSkill?: number | number[]
  aiNames?: string[]
}

export function newGame(
  playerName: string,
  playerCount: number = MAX_PLAYERS,
  options: NewGameOptions = {}
): GameState {
  const rng = options.rng ?? defaultRng
  let deck = Deck.shuffle(Deck.newDeck(), rng)

  const aiNames = options.aiNames ?? fallbackNames(playerCount - 1)
  const skillOf = (i: number): number =>
    Array.isArray(options.aiSkill) ? options.aiSkill[i] ?? DEFAULT_AI_SKILL : options.aiSkill ?? DEFAULT_AI_SKILL
  const players: Player[] = [
    { id: 0, name: playerName, type: 'human', hand: [], saidUno: false },
    ...aiNames.map((name, i): Player => ({ id: i + 1, name, type: 'ai', hand: [], saidUno: false, skill: skillOf(i) })),
  ]

  // Deal hands
  const dealtPlayers: Player[] = []
  for (const player of players) {
    const [hand, remaining] = Deck.draw(deck, HAND_SIZE)
    dealtPlayers.push({ ...player, hand })
    deck = remaining
  }

  // Draw starting card (no Wild Draw Four allowed)
  const [firstCard, remainingDeck] = drawStartingCard(deck, rng)
  deck = remainingDeck

  const state: GameState = {
    players: dealtPlayers,
    drawPile: deck,
    discardPile: [firstCard],
    currentPlayer: 0,
    direction: 'counter_clockwise',
    phase: 'playing',
    finished: [],
    lastAction: `Game started! ${cardToString(firstCard)} on the pile.`,
    unoPenalty: false,
    recentPlays: [],
  }

  return applyOpeningCard(state, firstCard, rng)
}

export function playCard(
  state: GameState,
  playerIndex: number,
  cardIndex: number,
  chosenColor?: Color | null,
  rng: Rng = defaultRng
): { ok: true; state: GameState } | { ok: false; error: string } {
  const player = state.players[playerIndex]
  const card = player.hand[cardIndex]
  const top = topCard(state)

  if (state.phase !== 'playing') return { ok: false, error: 'wrong_phase' }
  if (state.currentPlayer !== playerIndex) return { ok: false, error: 'not_your_turn' }
  if (!card) return { ok: false, error: 'invalid_card' }
  if (!playable(card, top!)) return { ok: false, error: 'not_playable' }
  if (isWild(card) && !chosenColor) return { ok: false, error: 'must_choose_color' }

  return doPlayCard(state, playerIndex, cardIndex, card, chosenColor ?? null, rng)
}

export function drawCard(
  state: GameState,
  playerIndex: number,
  rng: Rng = defaultRng
): { ok: true; state: GameState; drawnCard: Card } | { ok: false; error: string } {
  if (state.phase !== 'playing') return { ok: false, error: 'wrong_phase' }
  if (state.currentPlayer !== playerIndex) return { ok: false, error: 'not_your_turn' }
  return doDrawCard(state, playerIndex, rng)
}

export function sayUno(
  state: GameState,
  playerIndex: number
): { ok: true; state: GameState } {
  const player = state.players[playerIndex]
  const updated = updatePlayer(state, playerIndex, p => ({ ...p, saidUno: true }))
  return { ok: true, state: { ...updated, lastAction: `${player.name} called ONE!` } }
}

export function pass(
  state: GameState,
  playerIndex: number
): { ok: true; state: GameState } | { ok: false; error: string } {
  if (state.currentPlayer === playerIndex) {
    return { ok: true, state: advanceTurn(state) }
  }
  return { ok: false, error: 'not_your_turn' }
}

// --- Private ---

function drawStartingCard(deck: Card[], rng: Rng): [Card, Card[]] {
  const [[card], rest] = Deck.draw(deck, 1)
  if (card.value === 'wild_draw_four') {
    return drawStartingCard(Deck.shuffle([...rest, card], rng), rng)
  }
  return [card, rest]
}

function applyOpeningCard(state: GameState, card: Card, rng: Rng): GameState {
  const currentName = state.players[state.currentPlayer].name

  switch (card.value) {
    case 'skip':
      return advanceTurn({
        ...state,
        lastAction: `${cardToString(card)} - ${currentName} is skipped!`,
      })

    case 'reverse':
      return advanceTurn({
        ...state,
        discardPile: [{ ...state.discardPile[0], reverseTo: 'clockwise' }, ...state.discardPile.slice(1)],
        direction: 'clockwise',
        lastAction: `${cardToString(card)} - Reversed! Playing clockwise.`,
      })

    case 'draw_two': {
      const [cards, drawPile] = drawCards(state.drawPile, state.discardPile, 2, rng)
      const targetIdx = state.currentPlayer
      let s = { ...state, drawPile }
      s = updatePlayer(s, targetIdx, p => addCards(p, cards))
      return { ...s, lastAction: `${cardToString(card)} - ${currentName} drew 2!` }
    }

    case 'wild': {
      const colors: Color[] = ['red', 'blue', 'green', 'yellow']
      const color = pick(colors, rng)
      const updatedCard: Card = { ...card, chosenColor: color }
      return { ...state, discardPile: [updatedCard], lastAction: `Wild opened - color is ${color}!` }
    }

    default:
      return state
  }
}

function doPlayCard(
  state: GameState,
  playerIndex: number,
  cardIndex: number,
  card: Card,
  chosenColor: Color | null,
  rng: Rng
): { ok: true; state: GameState } {
  const playedCard: Card = isWild(card)
    ? { ...card, chosenColor }
    : card

  const player = state.players[playerIndex]
  const [, updatedPlayer] = removeCardAt(player, cardIndex)

  let s: GameState = {
    ...state,
    discardPile: [playedCard, ...state.discardPile],
  }
  s = updatePlayer(s, playerIndex, () => updatedPlayer)
  s = recordPlay(s, player.name, playedCard)

  // Check win — but if player didn't call UNO, penalize instead
  const currentHand = handSize(s.players[playerIndex])

  s = { ...s, unoPenalty: false }

  if (currentHand === 0) {
    if (!player.saidUno) {
      // Penalty: draw 2, no win
      s = unoPenalty(s, playerIndex, rng)
      const penaltyAction = s.lastAction
      s = applyCardEffect(s, playedCard, playerIndex, rng)
      s = { ...s, unoPenalty: playerIndex === 0, lastAction: `${penaltyAction} ${s.lastAction}` }
      return { ok: true, state: s }
    } else {
      return { ok: true, state: finishPlayer(s, playerIndex, playedCard, rng) }
    }
  } else {
    // Reset saidUno only when hand has more than 1 card remaining —
    // keep the flag when exactly 1 card so the winning play succeeds
    if (currentHand > 1) {
      s = updatePlayer(s, playerIndex, p => ({ ...p, saidUno: false }))
    }
    s = applyCardEffect(s, playedCard, playerIndex, rng)
    return { ok: true, state: s }
  }
}

function finishPlayer(state: GameState, playerIndex: number, playedCard: Card, rng: Rng): GameState {
  const player = state.players[playerIndex]
  const finished = [...state.finished, playerIndex]
  const remaining = state.players.map((_, i) => i).filter(i => !finished.includes(i))

  if (remaining.length <= 1) {
    return {
      ...state,
      phase: 'game_over',
      finished: [...finished, ...remaining],
      lastAction: finished.length === 1 ? `${player.name} wins!` : `${player.name} is out! Game over.`,
    }
  }

  const s = applyCardEffect({ ...state, finished }, playedCard, playerIndex, rng)
  return { ...s, lastAction: `${player.name} is out in ${ordinal(finished.length)}! ${s.lastAction}` }
}

export function ordinal(n: number): string {
  return `${n}${['th', 'st', 'nd', 'rd'][n % 10 <= 3 && Math.floor(n / 10) !== 1 ? n % 10 : 0]}`
}

function applyCardEffect(state: GameState, card: Card, playerIndex: number, rng: Rng): GameState {
  const player = state.players[playerIndex]

  switch (card.value) {
    case 'skip': {
      const next = nextPlayerIndex(state)
      const skipped = state.players[next]
      return advanceTurn(
        advanceTurn({
          ...state,
          lastAction: `${player.name} played ${cardToString(card)} - ${skipped.name} is skipped!`,
        })
      )
    }

    case 'reverse': {
      const newDir = state.direction === 'clockwise' ? 'counter_clockwise' : 'clockwise'
      // Stamp the played card with the direction it changed to
      const stamped: GameState = {
        ...state,
        discardPile: [{ ...state.discardPile[0], reverseTo: newDir }, ...state.discardPile.slice(1)],
        recentPlays: state.recentPlays.map((entry, i) => i === 0 ? [entry[0], { ...entry[1], reverseTo: newDir }] as [string, Card] : entry),
      }
      return advanceTurn({
        ...stamped,
        direction: newDir,
        lastAction: `${player.name} played ${cardToString(card)} - Reversed!`,
      })
    }

    case 'draw_two': {
      const next = nextPlayerIndex(state)
      const target = state.players[next]
      const [cards, drawPile] = drawCards(state.drawPile, state.discardPile, 2, rng)
      let s = { ...state, drawPile }
      s = updatePlayer(s, next, p => addCards(p, cards))
      return advanceTurn({
        ...s,
        lastAction: `${player.name} played ${cardToString(card)} - ${target.name} drew 2!`,
      })
    }

    case 'wild': {
      const color = card.chosenColor
      return advanceTurn({
        ...state,
        lastAction: `${player.name} played Wild - chose ${color}!`,
      })
    }

    case 'wild_draw_four': {
      const next = nextPlayerIndex(state)
      const target = state.players[next]
      const color = card.chosenColor
      const [cards, drawPile] = drawCards(state.drawPile, state.discardPile, 4, rng)
      let s = { ...state, drawPile }
      s = updatePlayer(s, next, p => addCards(p, cards))
      return advanceTurn({
        ...s,
        lastAction: `${player.name} played Wild +4 - ${target.name} drew 4! Color is ${color}!`,
      })
    }

    default:
      return advanceTurn({
        ...state,
        lastAction: `${player.name} played ${cardToString(card)}.`,
      })
  }
}

function doDrawCard(
  state: GameState,
  playerIndex: number,
  rng: Rng
): { ok: true; state: GameState; drawnCard: Card } {
  const [cards, drawPile] = drawCards(state.drawPile, state.discardPile, 1, rng)
  const drawn = cards[0]
  const player = state.players[playerIndex]

  let s: GameState = { ...state, drawPile }
  s = updatePlayer(s, playerIndex, p => addCards(p, [drawn]))
  s = { ...s, lastAction: `${player.name} drew a card.` }

  return { ok: true, state: s, drawnCard: drawn }
}

function drawCards(drawPile: Card[], discardPile: Card[], count: number, rng: Rng): [Card[], Card[]] {
  if (drawPile.length >= count) {
    const [cards, remaining] = Deck.draw(drawPile, count)
    return [cards.map(c => ({ ...c, drawn: true })), remaining]
  }

  // Recycle discard pile (keep top card)
  const [, ...rest] = discardPile
  const recycled = Deck.reshuffleDiscard(rest, rng)
  const newPile = [...drawPile, ...recycled]
  const [cards, remaining] = Deck.draw(newPile, Math.min(count, newPile.length))
  return [cards.map(c => ({ ...c, drawn: true })), remaining]
}

function unoPenalty(state: GameState, playerIndex: number, rng: Rng): GameState {
  const player = state.players[playerIndex]
  const [penaltyCards, drawPile] = drawCards(state.drawPile, state.discardPile, 2, rng)

  let s: GameState = { ...state, drawPile }
  s = updatePlayer(s, playerIndex, p => addCards(p, penaltyCards))
  return { ...s, lastAction: `${player.name} forgot to call ONE! Drew 2 penalty cards.` }
}
