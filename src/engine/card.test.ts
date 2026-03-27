import { describe, it, expect } from 'vitest'
import { isWild, isAction, displayColor, displayValue } from './card'

describe('isWild', () => {
  it('returns true for wild', () => {
    expect(isWild({ color: null, value: 'wild' })).toBe(true)
  })

  it('returns true for wild_draw_four', () => {
    expect(isWild({ color: null, value: 'wild_draw_four' })).toBe(true)
  })

  it('returns false for number cards', () => {
    expect(isWild({ color: 'red', value: 5 })).toBe(false)
  })

  it('returns false for action cards', () => {
    expect(isWild({ color: 'blue', value: 'skip' })).toBe(false)
  })
})

describe('isAction', () => {
  it('returns true for skip', () => {
    expect(isAction({ color: 'red', value: 'skip' })).toBe(true)
  })

  it('returns true for reverse', () => {
    expect(isAction({ color: 'green', value: 'reverse' })).toBe(true)
  })

  it('returns true for draw_two', () => {
    expect(isAction({ color: 'yellow', value: 'draw_two' })).toBe(true)
  })

  it('returns false for numbers', () => {
    expect(isAction({ color: 'red', value: 3 })).toBe(false)
  })

  it('returns false for wilds', () => {
    expect(isAction({ color: null, value: 'wild' })).toBe(false)
  })
})

describe('displayColor', () => {
  it('returns color for colored card', () => {
    expect(displayColor({ color: 'red', value: 5 })).toBe('red')
  })

  it('returns chosenColor for wild with chosen color', () => {
    expect(displayColor({ color: null, value: 'wild', chosenColor: 'blue' })).toBe('blue')
  })

  it('returns null for unplayed wild', () => {
    expect(displayColor({ color: null, value: 'wild' })).toBe(null)
  })
})

describe('displayValue', () => {
  it('returns string for number', () => {
    expect(displayValue({ color: 'red', value: 7 })).toBe('7')
  })

  it('returns Skip for skip', () => {
    expect(displayValue({ color: 'red', value: 'skip' })).toBe('Skip')
  })

  it('returns +2 for draw_two', () => {
    expect(displayValue({ color: 'red', value: 'draw_two' })).toBe('+2')
  })

  it('returns Wild for wild', () => {
    expect(displayValue({ color: null, value: 'wild' })).toBe('Wild')
  })

  it('returns +4 for wild_draw_four', () => {
    expect(displayValue({ color: null, value: 'wild_draw_four' })).toBe('+4')
  })
})
