import type { Card, Color } from './card'
import { isWild } from './card'
import type { GameState } from './gameState'
import { topCard } from './gameState'
import { playableCards } from './rules'

export function chooseAction(
  state: GameState,
  playerIndex: number
): { type: 'play'; cardIndex: number; color: Color | null } | { type: 'draw' } {
  const player = state.players[playerIndex]
  const top = topCard(state)!

  const plays = playableCards(player.hand, top)

  if (plays.length === 0) {
    return { type: 'draw' }
  }

  const [cardIndex, card] = pickBestCard(plays)
  const color = isWild(card) ? chooseColor(player.hand) : null
  return { type: 'play', cardIndex, color }
}

export function chooseColor(hand: Card[]): Color {
  const colors: Color[] = ['red', 'blue', 'green', 'yellow']

  const nonWild = hand.filter(c => !isWild(c))
  if (nonWild.length === 0) {
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const counts = new Map<Color, number>()
  for (const card of nonWild) {
    if (card.color) {
      counts.set(card.color, (counts.get(card.color) ?? 0) + 1)
    }
  }

  if (counts.size === 0) {
    return colors[Math.floor(Math.random() * colors.length)]
  }

  let bestColor: Color = colors[0]
  let bestCount = 0
  for (const [color, count] of counts) {
    if (count > bestCount) {
      bestColor = color
      bestCount = count
    }
  }
  return bestColor
}

function pickBestCard(plays: [number, Card][]): [number, Card] {
  return plays.reduce((best, current) =>
    cardScore(current[1]) > cardScore(best[1]) ? current : best
  )
}

function cardScore(card: Card): number {
  switch (card.value) {
    case 'draw_two': return 100
    case 'skip': return 90
    case 'reverse': return 50
    case 'wild': return 10
    case 'wild_draw_four': return 5
    default:
      return 60 + (card.value as number)
  }
}
