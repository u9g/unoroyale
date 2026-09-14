import { describe, it, expect } from 'vitest'
import { winRate } from './selfPlay'
import { seededRng } from './rng'
import { profileForSkill } from './skill'

describe('skill curve', () => {
  it('a sharp AI beats a careless one', () => {
    expect(winRate([0.9, 0.2], 600, seededRng(7))).toBeGreaterThan(0.65)
  })

  it('equal skill is close to even', () => {
    const rate = winRate([0.6, 0.6], 600, seededRng(11))
    expect(rate).toBeGreaterThan(0.4)
    expect(rate).toBeLessThan(0.6)
  })

  it('ranks monotonically against a mid-ladder opponent', () => {
    const low = winRate([0.3, 0.6], 800, seededRng(23))
    const high = winRate([0.9, 0.6], 800, seededRng(23))
    expect(low).toBeLessThan(0.5)
    expect(high).toBeGreaterThan(0.52)
  })
})

describe('profileForSkill', () => {
  it('clamps out-of-range skill', () => {
    expect(profileForSkill(-1)).toEqual(profileForSkill(0))
    expect(profileForSkill(2)).toEqual(profileForSkill(1))
  })
})
