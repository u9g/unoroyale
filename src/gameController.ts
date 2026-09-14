import { ref } from 'vue'
import type { Card, Color } from './engine/card'
import type { GameState } from './engine/gameState'
import { topCard, updatePlayer } from './engine/gameState'
import * as Game from './engine/game'
import * as AI from './engine/ai'
import { playable } from './engine/rules'
import { track } from './stats'
import type { RankedResult } from './ranked'
import { applyResult, profile, saveProfile, skillForTrophies } from './ranked'

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
    if (mode.value === 'ranked') settleRanked(won)
    track({
      event: 'finished',
      players: state.players.length,
      winner: won ? 'human' : 'ai',
      duration_s: Math.round((Date.now() - startedAt) / 1000),
      mode: mode.value,
      trophies: profile.value.trophies,
    })
  }

  function settleRanked(won: boolean) {
    const result = applyResult(profile.value, won)
    lastRanked.value = result
    saveProfile(result.profile)
  }

  function newRankedGame(): GameState {
    return Game.newGame(playerName.value, RANKED_PLAYERS, {
      aiSkill: skillForTrophies(profile.value.trophies),
    })
  }

  function startGame(name: string, count: number, gameMode: Mode = 'casual') {
    playerName.value = name
    mode.value = gameMode
    playerCount.value = gameMode === 'ranked' ? RANKED_PLAYERS : count
    beginGame(gameMode === 'ranked' ? newRankedGame() : Game.newGame(name, count))
  }

  function quitToLobby() {
    if (aiTimer) clearTimeout(aiTimer)
    // Walking out of a ranked match still costs the trophies, so quitting is not an escape
    if (mode.value === 'ranked' && phase.value === 'playing') settleRanked(false)
    gameState.value = null
    phase.value = 'lobby'
  }

  function restartGame() {
    if (aiTimer) clearTimeout(aiTimer)
    if (mode.value === 'ranked' && phase.value === 'playing') settleRanked(false)
    beginGame(mode.value === 'ranked' ? newRankedGame() : Game.newGame(playerName.value, playerCount.value))
  }

  function playCardAction(cardIndex: number, chosenColor?: Color | null) {
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
    if (!gameState.value) return
    const result = Game.sayUno(gameState.value, 0)
    if (result.ok) {
      gameState.value = result.state
    }
  }

  function reorderHand(from: number, to: number) {
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
    setInstantCpu(enabled: boolean) {
      instantCpu.value = enabled
      localStorage.setItem('uno_instant_cpu', String(enabled))
    },
  }
}
