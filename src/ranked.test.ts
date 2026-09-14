import { describe, it, expect } from 'vitest'
import { applyResult, arenaFor, emptyProfile, skillForTrophies, ARENAS } from './ranked'

describe('trophies', () => {
  it('awards trophies for a win and takes them for a loss', () => {
    const start = { ...emptyProfile(), trophies: 500 }
    expect(applyResult(start, true).profile.trophies).toBe(530)
    expect(applyResult(start, false).profile.trophies).toBe(470)
  })

  it('never drops below the floor of the arena you are in', () => {
    const start = { ...emptyProfile(), trophies: 310 }
    const after = applyResult(start, false)
    expect(after.profile.trophies).toBe(300)
    expect(after.delta).toBe(-10)
  })

  it('cannot go negative in the first arena', () => {
    expect(applyResult(emptyProfile(), false).profile.trophies).toBe(0)
  })

  it('reports a promotion when a win crosses an arena threshold', () => {
    const after = applyResult({ ...emptyProfile(), trophies: 290 }, true)
    expect(after.promoted?.name).toBe(ARENAS[1].name)
    expect(applyResult({ ...emptyProfile(), trophies: 200 }, true).promoted).toBeNull()
  })

  it('tracks the best-ever total and the win/loss record', () => {
    let p = emptyProfile()
    p = applyResult(p, true).profile
    p = applyResult(p, true).profile
    p = applyResult(p, false).profile
    expect(p).toMatchObject({ trophies: 30, best: 60, wins: 2, losses: 1 })
  })
})

describe('arenas', () => {
  it('maps trophies to the highest arena reached', () => {
    expect(arenaFor(0)).toBe(ARENAS[0])
    expect(arenaFor(299)).toBe(ARENAS[0])
    expect(arenaFor(300)).toBe(ARENAS[1])
    expect(arenaFor(99999)).toBe(ARENAS[ARENAS.length - 1])
  })

  it('raises opponent skill with the ladder, within bounds', () => {
    expect(skillForTrophies(0)).toBeCloseTo(0.15)
    expect(skillForTrophies(1500)).toBe(1)
    expect(skillForTrophies(99999)).toBe(1)
    expect(skillForTrophies(800)).toBeGreaterThan(skillForTrophies(300))
  })
})
