import type { Card } from './card'

export type PlayerType = 'human' | 'ai'

export interface Player {
  id: number
  name: string
  type: PlayerType
  hand: Card[]
  saidUno: boolean
}

export function handSize(player: Player): number {
  return player.hand.length
}

export function removeCardAt(player: Player, index: number): [Card, Player] {
  const card = player.hand[index]
  const newHand = [...player.hand.slice(0, index), ...player.hand.slice(index + 1)]
  return [card, { ...player, hand: newHand }]
}

export function addCards(player: Player, cards: Card[]): Player {
  return { ...player, hand: [...player.hand, ...cards] }
}
