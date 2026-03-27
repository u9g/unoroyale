import type { Card } from './card'
import { isWild, displayColor } from './card'

export function playable(card: Card, topCard: Card): boolean {
  if (isWild(card)) return true
  if (displayColor(card) === displayColor(topCard)) return true
  if (card.value === topCard.value) return true
  return false
}

export function playableCards(hand: Card[], topCard: Card): [number, Card][] {
  return hand
    .map((card, idx) => [idx, card] as [number, Card])
    .filter(([, card]) => playable(card, topCard))
}

export function playableIndices(hand: Card[], topCard: Card): number[] {
  return playableCards(hand, topCard).map(([idx]) => idx)
}

export function hasPlayableCard(hand: Card[], topCard: Card): boolean {
  return hand.some(card => playable(card, topCard))
}
