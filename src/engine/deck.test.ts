import { describe, it, expect } from 'vitest'
import type { Card, Color } from './card'
import { isWild } from './card'
import { newDeck, shuffle, draw, reshuffleDiscard } from './deck'

describe('newDeck', () => {
  it('creates 108 cards', () => {
    expect(newDeck().length).toBe(108)
  })

  it('has correct number of each color', () => {
    const deck = newDeck()
    for (const color of ['red', 'blue', 'green', 'yellow'] as Color[]) {
      const colored = deck.filter(c => c.color === color)
      expect(colored.length).toBe(25)
    }
  })

  it('has 4 wild cards', () => {
    const wilds = newDeck().filter(c => c.value === 'wild')
    expect(wilds.length).toBe(4)
  })

  it('has 4 wild draw four cards', () => {
    const wd4s = newDeck().filter(c => c.value === 'wild_draw_four')
    expect(wd4s.length).toBe(4)
  })

  it('has one zero per color', () => {
    const deck = newDeck()
    for (const color of ['red', 'blue', 'green', 'yellow'] as Color[]) {
      const zeros = deck.filter(c => c.color === color && c.value === 0)
      expect(zeros.length).toBe(1)
    }
  })

  it('has two of each number 1-9 per color', () => {
    const deck = newDeck()
    for (const color of ['red', 'blue', 'green', 'yellow'] as Color[]) {
      for (let num = 1; num <= 9; num++) {
        const cards = deck.filter(c => c.color === color && c.value === num)
        expect(cards.length).toBe(2)
      }
    }
  })
})

describe('shuffle', () => {
  it('returns same number of cards', () => {
    expect(shuffle(newDeck()).length).toBe(108)
  })
})

describe('draw', () => {
  it('draws correct number of cards', () => {
    const deck = newDeck()
    const [drawn, remaining] = draw(deck, 7)
    expect(drawn.length).toBe(7)
    expect(remaining.length).toBe(101)
  })

  it('drawing 0 returns empty list', () => {
    const deck = newDeck()
    const [drawn, remaining] = draw(deck, 0)
    expect(drawn).toEqual([])
    expect(remaining.length).toBe(108)
  })
})

describe('reshuffleDiscard', () => {
  it('clears chosenColor from wilds', () => {
    const cards: Card[] = [
      { color: null, value: 'wild', chosenColor: 'red' },
      { color: 'blue', value: 5 },
    ]
    const reshuffled = reshuffleDiscard(cards)
    const wild = reshuffled.find(c => isWild(c))!
    expect(wild.chosenColor).toBe(null)
  })
})
