import { ref } from 'vue'
import { Preferences } from '@capacitor/preferences'

const STORAGE_KEY = 'ranked_profile'
const WIN_TROPHIES = 30
const LOSS_TROPHIES = -30

export interface RankedProfile {
  trophies: number
  best: number
  wins: number
  losses: number
  /** Bumped if the shape changes, and when trophies move server-side */
  version: 1
}

export interface Arena {
  name: string
  /** Trophies needed to reach the arena, and the floor a loss cannot drop you below */
  min: number
  accent: string
}

export const ARENAS: Arena[] = [
  { name: 'The Parlour', min: 0, accent: '#8fbf7a' },
  { name: 'Velvet Room', min: 300, accent: '#b06ac4' },
  { name: 'Gilded Hall', min: 600, accent: '#e0b44a' },
  { name: 'Crown Court', min: 900, accent: '#5aa9e6' },
  { name: 'Royal Vault', min: 1200, accent: '#e2744a' },
  { name: "Sovereign's Table", min: 1500, accent: '#f2f0e6' },
]

export const emptyProfile = (): RankedProfile => ({
  trophies: 0,
  best: 0,
  wins: 0,
  losses: 0,
  version: 1,
})

export const profile = ref<RankedProfile>(emptyProfile())

export function arenaFor(trophies: number): Arena {
  return ARENAS.reduce((best, arena) => (trophies >= arena.min ? arena : best), ARENAS[0])
}

/** Opponent strength rises with the ladder; see engine/skill.ts for what it changes. */
export function skillForTrophies(trophies: number): number {
  return Math.max(0.15, Math.min(1, 0.15 + (trophies / 1500) * 0.85))
}

export interface RankedResult {
  profile: RankedProfile
  delta: number
  promoted: Arena | null
  /** The loss was cushioned by the arena floor */
  floored: boolean
}

export function applyResult(current: RankedProfile, won: boolean): RankedResult {
  const floor = arenaFor(current.trophies).min
  const raw = current.trophies + (won ? WIN_TROPHIES : LOSS_TROPHIES)
  const trophies = Math.max(floor, raw)
  const before = arenaFor(current.trophies)
  const after = arenaFor(trophies)

  return {
    profile: {
      ...current,
      trophies,
      best: Math.max(current.best, trophies),
      wins: current.wins + (won ? 1 : 0),
      losses: current.losses + (won ? 0 : 1),
    },
    delta: trophies - current.trophies,
    promoted: after.min > before.min ? after : null,
    floored: raw < trophies,
  }
}

export async function loadProfile(): Promise<RankedProfile> {
  const { value } = await Preferences.get({ key: STORAGE_KEY })
  if (value) {
    try {
      profile.value = { ...emptyProfile(), ...JSON.parse(value) }
    } catch {
      profile.value = emptyProfile()
    }
  }
  return profile.value
}

export async function saveProfile(next: RankedProfile): Promise<void> {
  profile.value = next
  await Preferences.set({ key: STORAGE_KEY, value: JSON.stringify(next) })
}
