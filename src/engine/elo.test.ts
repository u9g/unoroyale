import { describe, it, expect } from 'vitest'
import { expectedScore, kFactor, nextRating, skillForRating, START_RATING } from './elo'

describe('expectedScore', () => {
  it('is even between equals', () => {
    expect(expectedScore(1200, 1200)).toBe(0.5)
  })

  it('favours the higher rating, symmetrically', () => {
    const strong = expectedScore(1600, 1400)
    expect(strong).toBeGreaterThan(0.7)
    expect(strong + expectedScore(1400, 1600)).toBeCloseTo(1)
  })
})

describe('nextRating', () => {
  it('pays little for beating someone far below you', () => {
    const gain = nextRating(1600, 1400, true, 50) - 1600
    expect(gain).toBeGreaterThan(0)
    expect(gain).toBeLessThan(6)
  })

  it('punishes losing to someone far below you', () => {
    expect(1600 - nextRating(1600, 1400, false, 50)).toBeGreaterThan(10)
  })

  it('pays well for an upset', () => {
    expect(nextRating(1400, 1600, true, 50) - 1400).toBeGreaterThan(10)
  })

  it('is zero-sum between two equals', () => {
    const winner = nextRating(1200, 1200, true, 50) - 1200
    const loser = 1200 - nextRating(1200, 1200, false, 50)
    expect(winner).toBe(loser)
  })

  it('moves new players fastest', () => {
    expect(kFactor(0)).toBeGreaterThan(kFactor(20))
    expect(kFactor(20)).toBeGreaterThan(kFactor(200))
    const rookie = nextRating(START_RATING, START_RATING, true, 0) - START_RATING
    const veteran = nextRating(START_RATING, START_RATING, true, 200) - START_RATING
    expect(rookie).toBeGreaterThan(veteran * 3)
  })

  it('settles a 50% player back where they started', () => {
    let rating = START_RATING
    for (let i = 0; i < 100; i++) rating = nextRating(rating, START_RATING, i % 2 === 0, i)
    expect(Math.abs(rating - START_RATING)).toBeLessThan(20)
  })

  it('climbs a consistently better player', () => {
    let rating = START_RATING
    for (let i = 0; i < 40; i++) rating = nextRating(rating, 1200, i % 4 !== 0, i)
    expect(rating).toBeGreaterThan(1150)
  })
})

describe('skillForRating', () => {
  it('stays inside the skill range', () => {
    expect(skillForRating(0)).toBe(0.15)
    expect(skillForRating(99999)).toBe(1)
  })

  it('rises with rating', () => {
    expect(skillForRating(1400)).toBeGreaterThan(skillForRating(1000))
  })
})
