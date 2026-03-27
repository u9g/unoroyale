import { describe, it, expect } from 'vitest'
import type { Card } from './card'
import { playable, playableCards, playableIndices } from './rules'

describe('playable', () => {
  it('same color is playable', () => {
    expect(playable({ color: 'red', value: 3 }, { color: 'red', value: 7 })).toBe(true)
  })

  it('same value is playable', () => {
    expect(playable({ color: 'blue', value: 5 }, { color: 'red', value: 5 })).toBe(true)
  })

  it('wild is always playable', () => {
    expect(playable({ color: null, value: 'wild' }, { color: 'red', value: 7 })).toBe(true)
  })

  it('wild_draw_four is always playable', () => {
    expect(playable({ color: null, value: 'wild_draw_four' }, { color: 'green', value: 'skip' })).toBe(true)
  })

  it('different color and value is not playable', () => {
    expect(playable({ color: 'blue', value: 3 }, { color: 'red', value: 7 })).toBe(false)
  })

  it('matches chosen color of wild on discard', () => {
    expect(playable(
      { color: 'green', value: 2 },
      { color: null, value: 'wild', chosenColor: 'green' }
    )).toBe(true)
  })

  it('does not match different chosen color', () => {
    expect(playable(
      { color: 'red', value: 2 },
      { color: null, value: 'wild', chosenColor: 'green' }
    )).toBe(false)
  })

  it('action cards match by value', () => {
    expect(playable(
      { color: 'blue', value: 'skip' },
      { color: 'red', value: 'skip' }
    )).toBe(true)
  })

  it('action cards match by color', () => {
    expect(playable(
      { color: 'red', value: 'reverse' },
      { color: 'red', value: 3 }
    )).toBe(true)
  })
})

describe('playableCards', () => {
  it('returns only playable cards with indices', () => {
    const hand: Card[] = [
      { color: 'red', value: 3 },
      { color: 'blue', value: 7 },
      { color: 'green', value: 5 },
    ]
    const top: Card = { color: 'red', value: 5 }

    const result = playableCards(hand, top)
    const indices = result.map(([idx]) => idx)
    expect(indices).toContain(0)  // Red 3 matches color
    expect(indices).toContain(2)  // Green 5 matches value
    expect(indices).not.toContain(1)  // Blue 7 matches neither
  })
})

describe('playableIndices', () => {
  it('returns indices of playable cards', () => {
    const hand: Card[] = [
      { color: 'blue', value: 1 },
      { color: null, value: 'wild' },
      { color: 'yellow', value: 9 },
    ]
    const top: Card = { color: 'red', value: 9 }

    const indices = playableIndices(hand, top)
    expect(indices).toContain(1)  // Wild is always playable
    expect(indices).toContain(2)  // Yellow 9 matches value
    expect(indices).not.toContain(0)  // Blue 1 matches neither
  })
})
