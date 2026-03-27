import { ref } from 'vue'
import type { Card, Color } from './engine/card'
import { isWild } from './engine/card'
import type { GameState } from './engine/gameState'
import { topCard, updatePlayer } from './engine/gameState'
import * as Game from './engine/game'
import * as AI from './engine/ai'
import { playable } from './engine/rules'
import { handSize } from './engine/player'

const AI_DELAY_MIN = 800
const AI_DELAY_MAX = 1500

export function useGameController() {
  const gameState = ref<GameState | null>(null)
  const phase = ref<'lobby' | 'playing' | 'game_over'>('lobby')
  const playerName = ref('')
  const instantCpu = ref(localStorage.getItem('uno_instant_cpu') === 'true')
  let aiTimer: ReturnType<typeof setTimeout> | null = null

  function startGame(name: string) {
    playerName.value = name
    const state = Game.newGame(name)
    gameState.value = state
    phase.value = 'playing'
    maybeScheduleAiTurn(state)
  }

  function restartGame() {
    if (aiTimer) clearTimeout(aiTimer)
    const state = Game.newGame(playerName.value)
    gameState.value = state
    phase.value = 'playing'
    maybeScheduleAiTurn(state)
  }

  function playCardAction(cardIndex: number, chosenColor?: Color | null) {
    if (!gameState.value) return
    const result = Game.playCard(gameState.value, 0, cardIndex, chosenColor)
    if (result.ok) {
      gameState.value = result.state
      if (result.state.phase === 'game_over') {
        phase.value = 'game_over'
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
    let state = gameState.value
    if (state.phase !== 'playing') return

    const playerIndex = state.currentPlayer
    const player = state.players[playerIndex]
    if (player.type !== 'ai') return

    // Auto-call UNO if AI has 2 cards
    if (handSize(player) === 2) {
      const unoResult = Game.sayUno(state, playerIndex)
      if (unoResult.ok) state = unoResult.state
    }

    const action = AI.chooseAction(state, playerIndex)

    if (action.type === 'play') {
      const result = Game.playCard(state, playerIndex, action.cardIndex, action.color)
      if (result.ok) {
        state = result.state
      } else {
        state = drawAndPass(state, playerIndex)
      }
    } else {
      // Draw
      const drawResult = Game.drawCard(state, playerIndex)
      if (drawResult.ok) {
        state = tryPlayDrawnCard(drawResult.state, playerIndex, drawResult.drawnCard)
      }
    }

    gameState.value = state
    if (state.phase === 'game_over') {
      phase.value = 'game_over'
    }
    maybeScheduleAiTurn(state)
  }

  function tryPlayDrawnCard(state: GameState, playerIndex: number, drawnCard: Card): GameState {
    const top = topCard(state)
    if (top && playable(drawnCard, top)) {
      const player = state.players[playerIndex]
      const cardIndex = player.hand.length - 1
      const chosenColor = isWild(drawnCard) ? AI.chooseColor(player.hand) : null
      const result = Game.playCard(state, playerIndex, cardIndex, chosenColor)
      if (result.ok) return result.state
      return passOrKeep(state, playerIndex)
    }
    return passOrKeep(state, playerIndex)
  }

  function passOrKeep(state: GameState, playerIndex: number): GameState {
    const result = Game.pass(state, playerIndex)
    return result.ok ? result.state : state
  }

  function drawAndPass(state: GameState, playerIndex: number): GameState {
    const drawResult = Game.drawCard(state, playerIndex)
    if (drawResult.ok) {
      const passResult = Game.pass(drawResult.state, playerIndex)
      return passResult.ok ? passResult.state : drawResult.state
    }
    return state
  }

  return {
    gameState,
    phase,
    playerName,
    startGame,
    restartGame,
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
