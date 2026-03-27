import type { Card, Color } from './card'

const COLORS: Color[] = ['red', 'blue', 'green', 'yellow']
const ACTION_VALUES = ['skip', 'reverse', 'draw_two'] as const

export function newDeck(): Card[] {
  const coloredCards: Card[] = []

  for (const color of COLORS) {
    // One 0 per color
    coloredCards.push({ color, value: 0 })

    // Two each of 1-9
    for (let num = 1; num <= 9; num++) {
      for (let copy = 0; copy < 2; copy++) {
        coloredCards.push({ color, value: num as Card['value'] })
      }
    }

    // Two each of Skip, Reverse, Draw Two
    for (const action of ACTION_VALUES) {
      for (let copy = 0; copy < 2; copy++) {
        coloredCards.push({ color, value: action })
      }
    }
  }

  // 4 Wilds
  for (let i = 0; i < 4; i++) {
    coloredCards.push({ color: null, value: 'wild' })
  }

  // 4 Wild Draw Fours
  for (let i = 0; i < 4; i++) {
    coloredCards.push({ color: null, value: 'wild_draw_four' })
  }

  return coloredCards
}

export function shuffle(cards: Card[]): Card[] {
  const shuffled = [...cards]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function draw(pile: Card[], count: number): [Card[], Card[]] {
  return [pile.slice(0, count), pile.slice(count)]
}

export function reshuffleDiscard(discardPile: Card[]): Card[] {
  return shuffle(
    discardPile.map(card => ({ ...card, chosenColor: null }))
  )
}
