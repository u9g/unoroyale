import type { Card } from './card'
import type { Player } from './player'

export type Phase = 'playing' | 'choosing_color' | 'game_over'
export type Direction = 'clockwise' | 'counter_clockwise'

export interface GameState {
  players: Player[]
  drawPile: Card[]
  discardPile: Card[]
  currentPlayer: number
  direction: Direction
  phase: Phase
  winner: number | null
  lastAction: string | null
  recentPlays: [string, Card][]
}

export function topCard(state: GameState): Card | null {
  return state.discardPile.length > 0 ? state.discardPile[0] : null
}

export function currentPlayer(state: GameState): Player {
  return state.players[state.currentPlayer]
}

export function updatePlayer(
  state: GameState,
  index: number,
  fn: (player: Player) => Player
): GameState {
  const players = state.players.map((p, i) => (i === index ? fn(p) : p))
  return { ...state, players }
}

export function nextPlayerIndex(state: GameState): number {
  const count = state.players.length
  const delta = state.direction === 'clockwise' ? 1 : count - 1
  return (state.currentPlayer + delta) % count
}

export function recordPlay(state: GameState, playerName: string, card: Card): GameState {
  const plays: [string, Card][] = [[playerName, card] as [string, Card], ...state.recentPlays].slice(0, 4)
  return { ...state, recentPlays: plays }
}

export function advanceTurn(state: GameState): GameState {
  // Clear drawn flags on the current player's hand before advancing
  const cleared = updatePlayer(state, state.currentPlayer, player => ({
    ...player,
    hand: player.hand.map(c => ({ ...c, drawn: false })),
  }))
  return { ...cleared, currentPlayer: nextPlayerIndex(cleared) }
}
