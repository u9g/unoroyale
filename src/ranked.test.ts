import { describe, it, expect, vi, afterEach } from 'vitest'
import { applyResult, arenaFor, emptyProfile, skillForTrophies, ARENAS } from './ranked'

vi.mock('@capacitor/preferences', () => ({
  Preferences: { get: async () => ({ value: null }), set: async () => {} },
}))

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

  it('flags a loss that the arena floor cushioned', () => {
    expect(applyResult({ ...emptyProfile(), trophies: 310 }, false).floored).toBe(true)
    expect(applyResult({ ...emptyProfile(), trophies: 500 }, false).floored).toBe(false)
    expect(applyResult({ ...emptyProfile(), trophies: 500 }, true).floored).toBe(false)
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

describe('claimName', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
  })

  async function withResponse(res: Response | Error, statsUrl = 'https://stats.test') {
    vi.resetModules()
    vi.stubEnv('VITE_STATS_URL', statsUrl)
    vi.stubGlobal('fetch', async () => {
      if (res instanceof Error) throw res
      return res
    })
    return await import('./ranked')
  }

  it('stores the name the server confirms', async () => {
    const { claimName, claimedName } = await withResponse(Response.json({ name: 'u9g', claimed: true }))
    expect(await claimName('u9g')).toBe('claimed')
    expect(claimedName.value).toBe('u9g')
  })

  it('keeps the server name when the device already claimed a different one', async () => {
    const { claimName, claimedName } = await withResponse(Response.json({ name: 'u9g', claimed: true }))
    expect(await claimName('someone-else')).toBe('claimed')
    expect(claimedName.value).toBe('u9g')
  })

  it('reports a name held by another device', async () => {
    const { claimName, claimedName } = await withResponse(new Response(null, { status: 409 }))
    expect(await claimName('u9g')).toBe('taken')
    expect(claimedName.value).toBe('')
  })

  it('reports a rejected name', async () => {
    const { claimName } = await withResponse(new Response(null, { status: 400 }))
    expect(await claimName('ab')).toBe('invalid')
  })

  // Play must never be blocked by the network, so these fall through to an unclaimed match
  it('treats a network failure as unreachable', async () => {
    const { claimName } = await withResponse(new Error('offline'))
    expect(await claimName('Jason')).toBe('unreachable')
  })

  it('treats a missing stats URL as unreachable', async () => {
    const { claimName } = await withResponse(Response.json({ name: 'Jason' }), '')
    expect(await claimName('Jason')).toBe('unreachable')
  })
})
