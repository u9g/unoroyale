import { ref } from 'vue'
import { Preferences } from '@capacitor/preferences'
import { deviceId } from './deviceId'
import { STATS_URL } from './stats'
import type { RankedProfile } from './ladder'
import { emptyProfile } from './ladder'

export * from './ladder'

const STORAGE_KEY = 'ranked_profile'
const NAME_KEY = 'ranked_name'

export const profile = ref<RankedProfile>(emptyProfile())

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

// --- Ranked name ---

/** The name this install has claimed on the server; empty until it has one. */
export const claimedName = ref('')

export type ClaimOutcome = 'claimed' | 'taken' | 'invalid' | 'unreachable'

export async function loadClaimedName(): Promise<string> {
  const { value } = await Preferences.get({ key: NAME_KEY })
  claimedName.value = value ?? ''
  return claimedName.value
}

/**
 * Binds a name to this install. Claiming is idempotent server-side, so a device
 * that already has a name gets that name back rather than an error.
 */
export async function claimName(name: string): Promise<ClaimOutcome> {
  if (!STATS_URL) return 'unreachable'
  let res: Response
  try {
    res = await fetch(`${STATS_URL}/name`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ device_id: deviceId, name }),
    })
  } catch {
    return 'unreachable'
  }

  if (res.status === 409) return 'taken'
  if (res.status === 400) return 'invalid'
  if (!res.ok) return 'unreachable'

  const body = await res.json().catch(() => null) as { name?: string } | null
  if (!body?.name) return 'unreachable'

  claimedName.value = body.name
  await Preferences.set({ key: NAME_KEY, value: body.name })
  return 'claimed'
}
