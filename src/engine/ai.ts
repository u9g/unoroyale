import type { Card, Color } from './card'
import { isWild } from './card'
import type { GameState } from './gameState'
import { topCard, nextPlayerIndex } from './gameState'
import { handSize } from './player'
import { playable, playableCards } from './rules'
import type { Rng } from './rng'
import { defaultRng, pick } from './rng'
import type { AiProfile } from './skill'
import { DEFAULT_SKILL, profileForSkill } from './skill'
import * as Game from './game'

const COLORS: Color[] = ['red', 'blue', 'green', 'yellow']

export type AiAction =
  | { type: 'play'; cardIndex: number; color: Color | null }
  | { type: 'draw' }

export function chooseAction(
  state: GameState,
  playerIndex: number,
  rng: Rng = defaultRng
): AiAction {
  const player = state.players[playerIndex]
  const top = topCard(state)!
  const profile = profileForSkill(player.skill ?? DEFAULT_SKILL)

  const plays = playableCards(player.hand, top)
  if (plays.length === 0) return { type: 'draw' }

  const [cardIndex, card] =
    rng() < profile.blunder ? pick(plays, rng) : pickBestCard(plays, state, playerIndex, profile)

  const color = isWild(card)
    ? chooseColor(player.hand, { rng, profile, avoid: opponentColors(state, playerIndex, profile) })
    : null
  return { type: 'play', cardIndex, color }
}

export interface ColorOptions {
  rng?: Rng
  profile?: AiProfile
  avoid?: Color[]
}

export function chooseColor(hand: Card[], options: ColorOptions = {}): Color {
  const rng = options.rng ?? defaultRng
  const profile = options.profile ?? profileForSkill(DEFAULT_SKILL)
  const avoid = options.avoid ?? []

  if (!profile.smartColor) return pick(COLORS, rng)

  const counts = new Map<Color, number>()
  for (const card of hand) {
    if (!isWild(card) && card.color) {
      counts.set(card.color, (counts.get(card.color) ?? 0) + 1)
    }
  }
  if (counts.size === 0) return pick(COLORS, rng)

  let bestColor: Color = COLORS[0]
  let bestScore = -Infinity
  for (const color of COLORS) {
    const count = counts.get(color) ?? 0
    if (count === 0) continue
    // Fractional penalty so avoidance only breaks ties between equal counts
    const score = count - (avoid.includes(color) ? 0.5 : 0)
    if (score > bestScore) {
      bestScore = score
      bestColor = color
    }
  }
  return bestColor
}

/** Runs a full AI turn — call ONE!, then play, or draw and play the drawn card. */
export function takeAiTurn(state: GameState, playerIndex: number, rng: Rng = defaultRng): GameState {
  const player = state.players[playerIndex]
  if (state.phase !== 'playing' || player.type !== 'ai') return state
  const profile = profileForSkill(player.skill ?? DEFAULT_SKILL)

  let s = state
  if (handSize(player) === 2 && rng() < profile.callsOne) {
    s = Game.sayUno(s, playerIndex).state
  }

  const action = chooseAction(s, playerIndex, rng)

  if (action.type === 'play') {
    const result = Game.playCard(s, playerIndex, action.cardIndex, action.color, rng)
    return result.ok ? result.state : drawAndPass(s, playerIndex, rng)
  }

  const drawResult = Game.drawCard(s, playerIndex, rng)
  if (!drawResult.ok) return s
  return playDrawnCard(drawResult.state, playerIndex, drawResult.drawnCard, rng)
}

// --- Private ---

function playDrawnCard(state: GameState, playerIndex: number, drawnCard: Card, rng: Rng): GameState {
  const top = topCard(state)
  if (top && playable(drawnCard, top)) {
    const player = state.players[playerIndex]
    const profile = profileForSkill(player.skill ?? DEFAULT_SKILL)
    const cardIndex = player.hand.length - 1
    const color = isWild(drawnCard)
      ? chooseColor(player.hand, { rng, profile, avoid: opponentColors(state, playerIndex, profile) })
      : null
    const result = Game.playCard(state, playerIndex, cardIndex, color, rng)
    if (result.ok) return result.state
  }
  return pass(state, playerIndex)
}

function drawAndPass(state: GameState, playerIndex: number, rng: Rng): GameState {
  const drawResult = Game.drawCard(state, playerIndex, rng)
  return drawResult.ok ? pass(drawResult.state, playerIndex) : state
}

function pass(state: GameState, playerIndex: number): GameState {
  const result = Game.pass(state, playerIndex)
  return result.ok ? result.state : state
}

/** Colours opponents have played recently — a hint at what they still hold. */
function opponentColors(state: GameState, playerIndex: number, profile: AiProfile): Color[] {
  if (!profile.readsOpponents) return []
  const own = state.players[playerIndex].name
  return state.recentPlays
    .filter(([name]) => name !== own)
    .map(([, card]) => card.chosenColor ?? card.color)
    .filter((c): c is Color => c != null)
}

function pickBestCard(
  plays: [number, Card][],
  state: GameState,
  playerIndex: number,
  profile: AiProfile
): [number, Card] {
  const hasColored = plays.some(([, card]) => !isWild(card))
  const next = state.players[nextPlayerIndex(state)]
  const nextIsLow = handSize(next) <= 2
  // Heads-up, a reverse skips the only opponent
  const reverseSkips = state.players.length - state.finished.length === 2

  const colorCounts = new Map<Color, number>()
  const hand = state.players[playerIndex].hand
  for (const card of hand) {
    if (!isWild(card) && card.color) colorCounts.set(card.color, (colorCounts.get(card.color) ?? 0) + 1)
  }

  const score = (card: Card): number =>
    cardScore(card, profile, hasColored, nextIsLow, reverseSkips, colorCounts)
  return plays.reduce((best, current) => (score(current[1]) > score(best[1]) ? current : best))
}

function cardScore(
  card: Card,
  profile: AiProfile,
  hasColored: boolean,
  nextIsLow: boolean,
  reverseSkips: boolean,
  colorCounts: Map<Color, number>
): number {
  if (isWild(card)) {
    // Careless players burn wilds on sight; sharp ones keep them as an escape hatch
    if (!profile.holdWilds) return 120
    if (!hasColored) return card.value === 'wild' ? 10 : 5
    if (profile.aggressive && nextIsLow && card.value === 'wild_draw_four') return 190
    return -10
  }

  switch (card.value) {
    case 'draw_two': return 200
    case 'skip': return 180
    // Heads-up a reverse skips the only opponent, which sharp players exploit
    case 'reverse': return profile.aggressive && reverseSkips ? 170 : 50
    default: {
      // Dump the colours the hand is thin on so the remaining hand stays chainable
      const spread = profile.aggressive ? 10 - (colorCounts.get(card.color!) ?? 0) : 0
      return 60 + (card.value as number) + spread * 2
    }
  }
}
