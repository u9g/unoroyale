import { ref, watch } from 'vue'
import type { Card, Color } from './engine/card'
import type { GameState } from './engine/gameState'
import { topCard, updatePlayer } from './engine/gameState'
import * as Game from './engine/game'
import * as AI from './engine/ai'
import { playable } from './engine/rules'
import { track } from './stats'
import { pickNames } from './names'
import type { RankedResult } from './ranked'
import { ROOMS, profile, saveProfile } from './ranked'
import type { OnlineMatch, ServerResult } from './online'
import { fetchServerProfile, startOnlineMatch } from './online'

export type Mode = 'casual' | 'ranked'
export const RANKED_PLAYERS = 2

const AI_DELAY_MIN = 800
const AI_DELAY_MAX = 1500

export function useGameController() {
  const gameState = ref<GameState | null>(null)
  const phase = ref<'lobby' | 'playing' | 'game_over'>('lobby')
  const playerName = ref('')
  const playerCount = ref(Game.MAX_PLAYERS)
  const mode = ref<Mode>('casual')
  const lastRanked = ref<RankedResult | null>(null)
  // Set while a ranked match is being played on the server
  let online: OnlineMatch | null = null
  let stopWatching: (() => void) | null = null
  // Set when the player walks out: the result still has to be banked, but they
  // have already left the table and should not be dragged back to it
  let abandoned = false
  const instantCpu = ref(localStorage.getItem('uno_instant_cpu') === 'true')
  let aiTimer: ReturnType<typeof setTimeout> | null = null
  let startedAt = 0

  function beginGame(state: GameState) {
    gameState.value = state
    phase.value = 'playing'
    startedAt = Date.now()
    lastRanked.value = null
    track({ event: 'started', players: state.players.length, mode: mode.value, trophies: profile.value.trophies })
    maybeScheduleAiTurn(state)
  }

  function endGame(state: GameState) {
    phase.value = 'game_over'
    const won = state.finished[0] === 0
    track({
      event: 'finished',
      players: state.players.length,
      winner: won ? 'human' : 'ai',
      duration_s: Math.round((Date.now() - startedAt) / 1000),
      mode: mode.value,
      trophies: profile.value.trophies,
    })
  }

  /** Mirrors a server-settled result into the local profile, which the UI reads. */
  async function applyServerResult(result: ServerResult) {
    if (abandoned) {
      await saveProfile({
        ...profile.value,
        trophies: result.trophies,
        best: Math.max(profile.value.best, result.trophies),
        losses: profile.value.losses + 1,
      })
      closeSocket()
      return
    }

    lastRanked.value = {
      profile: { ...profile.value, trophies: result.trophies, best: Math.max(profile.value.best, result.trophies) },
      delta: result.delta,
      promoted: result.promoted ? ROOMS.find(r => r.name === result.promoted) ?? null : null,
      floored: result.floored,
    }
    phase.value = 'game_over'
    await saveProfile({
      ...profile.value,
      trophies: result.trophies,
      best: Math.max(profile.value.best, result.trophies),
      wins: profile.value.wins + (result.won ? 1 : 0),
      losses: profile.value.losses + (result.won ? 0 : 1),
    })
    track({
      event: 'finished',
      players: 2,
      winner: result.won ? 'human' : 'ai',
      duration_s: Math.round((Date.now() - startedAt) / 1000),
      mode: 'ranked',
      trophies: result.trophies,
    })
  }

  /** The server owns trophies; the local profile is a cache of what it says. */
  async function syncFromServer(): Promise<void> {
    const server = await fetchServerProfile()
    if (!server || server.trophies === profile.value.trophies) return
    await saveProfile({ ...profile.value, trophies: server.trophies, best: Math.max(profile.value.best, server.trophies) })
  }

  async function beginOnlineGame(name: string) {
    const match = await startOnlineMatch(name)
    online = match
    abandoned = false
    mode.value = 'ranked'
    playerCount.value = RANKED_PLAYERS
    lastRanked.value = null
    startedAt = Date.now()
    track({ event: 'started', players: RANKED_PLAYERS, mode: 'ranked', trophies: profile.value.trophies })

    stopWatching = watch([match.state, match.result], ([state, result]) => {
      if (state) gameState.value = state
      if (result) void applyServerResult(result)
    }, { immediate: true })

    phase.value = 'playing'
  }

  function endOnlineGame(resign: boolean) {
    if (!online) return
    // The server only learns a match was abandoned if the client says so, and
    // the socket has to stay open long enough to hear what it cost
    if (resign && !lastRanked.value) {
      abandoned = true
      online.send({ t: 'resign' })
      setTimeout(() => {
        if (abandoned) void syncFromServer().finally(closeSocket)
      }, 2000)
      return
    }
    closeSocket()
  }

  function closeSocket() {
    abandoned = false
    online?.close()
    online = null
    stopWatching?.()
    stopWatching = null
  }

  function newCasualGame(name: string, count: number): GameState {
    return Game.newGame(name, count, { aiNames: pickNames(name, count - 1) })
  }

  async function startGame(name: string, count: number, gameMode: Mode = 'casual') {
    playerName.value = name
    mode.value = gameMode
    playerCount.value = gameMode === 'ranked' ? RANKED_PLAYERS : count
    if (gameMode === 'ranked') return beginOnlineGame(name)
    beginGame(newCasualGame(name, count))
  }

  function quitToLobby() {
    if (aiTimer) clearTimeout(aiTimer)
    // Walking out of a ranked match still costs the trophies, so quitting is not an escape
    endOnlineGame(phase.value === 'playing')
    gameState.value = null
    phase.value = 'lobby'
  }

  async function restartGame() {
    if (aiTimer) clearTimeout(aiTimer)
    endOnlineGame(phase.value === 'playing')
    if (mode.value === 'ranked') return beginOnlineGame(playerName.value)
    beginGame(newCasualGame(playerName.value, playerCount.value))
  }

  function playCardAction(cardIndex: number, chosenColor?: Color | null) {
    if (online) return online.send({ t: 'play', cardIndex, color: chosenColor ?? null })
    if (!gameState.value) return
    const result = Game.playCard(gameState.value, 0, cardIndex, chosenColor)
    if (result.ok) {
      gameState.value = result.state
      if (result.state.phase === 'game_over') {
        endGame(result.state)
      }
      maybeScheduleAiTurn(result.state)
    }
  }

  function drawCardAction(): Card | null {
    if (online) {
      online.send({ t: 'draw' })
      return null
    }
    if (!gameState.value) return null
    const result = Game.drawCard(gameState.value, 0)
    if (result.ok) {
      gameState.value = result.state
      const top = topCard(result.state)

      if (top && playable(result.drawnCard, top)) {
        // Drawn card is playable — leave it for the player to play
        maybeScheduleAiTurn(result.state)
        return result.drawnCard
      } else {
        // Not playable — auto-pass
        const passResult = Game.pass(result.state, 0)
        if (passResult.ok) {
          gameState.value = passResult.state
          maybeScheduleAiTurn(passResult.state)
        }
        return result.drawnCard
      }
    }
    return null
  }

  function sayUnoAction() {
    if (online) return online.send({ t: 'one' })
    if (!gameState.value) return
    const result = Game.sayUno(gameState.value, 0)
    if (result.ok) {
      gameState.value = result.state
    }
  }

  function reorderHand(from: number, to: number) {
    // Hand order is the client's business; the server addresses cards by index,
    // so a reorder would desync it
    if (online) return
    if (!gameState.value) return
    const state = gameState.value
    const player = state.players[0]
    const hand = player.hand

    if (from >= 0 && from < hand.length && to >= 0 && to < hand.length) {
      const card = hand[from]
      const newHand = [...hand.slice(0, from), ...hand.slice(from + 1)]
      newHand.splice(to, 0, card)
      gameState.value = updatePlayer(state, 0, p => ({ ...p, hand: newHand }))
    }
  }

  function maybeScheduleAiTurn(state: GameState) {
    if (aiTimer) clearTimeout(aiTimer)
    if (state.phase === 'playing') {
      const player = state.players[state.currentPlayer]
      if (player.type === 'ai') {
        const delay = instantCpu.value ? 0 : AI_DELAY_MIN + Math.floor(Math.random() * (AI_DELAY_MAX - AI_DELAY_MIN))
        aiTimer = setTimeout(() => executeAiTurn(), delay)
      }
    }
  }

  function executeAiTurn() {
    if (!gameState.value) return
    const state = AI.takeAiTurn(gameState.value, gameState.value.currentPlayer)

    gameState.value = state
    if (state.phase === 'game_over') {
      endGame(state)
    }
    maybeScheduleAiTurn(state)
  }

  return {
    gameState,
    phase,
    playerName,
    mode,
    lastRanked,
    startGame,
    restartGame,
    quitToLobby,
    playCard: playCardAction,
    drawCard: drawCardAction,
    sayUno: sayUnoAction,
    reorderHand,
    instantCpu,
    syncFromServer,
    setInstantCpu(enabled: boolean) {
      instantCpu.value = enabled
      localStorage.setItem('uno_instant_cpu', String(enabled))
    },
  }
}
