// Headless AI-vs-AI matches, used to check that higher skill actually wins more
import { newGame } from './game'
import { takeAiTurn } from './ai'
import type { Rng } from './rng'

const MAX_TURNS = 2000

/** Plays one heads-up match; returns the index of the winner. */
export function playMatch(skills: [number, number], rng: Rng): number {
  let state = newGame('A', 2, { rng, aiSkill: skills, aiNames: ['B'] })
  // Seat 0 is human-typed by default; ranked self-play needs both seats driven by AI
  state = {
    ...state,
    players: state.players.map((p, i) => ({ ...p, type: 'ai' as const, skill: skills[i] })),
  }

  for (let turn = 0; turn < MAX_TURNS && state.phase !== 'game_over'; turn++) {
    state = takeAiTurn(state, state.currentPlayer, rng)
  }
  return state.finished[0] ?? 0
}

/** Win rate of skills[0] over `games` matches. */
export function winRate(skills: [number, number], games: number, rng: Rng): number {
  let wins = 0
  for (let i = 0; i < games; i++) {
    if (playMatch(skills, rng) === 0) wins++
  }
  return wins / games
}
