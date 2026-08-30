import { Preferences } from '@capacitor/preferences'

// Random, generated once per install; stable identity for experiment bucketing and stats
export let deviceId = ''

export async function loadDeviceId(): Promise<string> {
  const { value } = await Preferences.get({ key: 'device_id' })
  deviceId = value ?? crypto.randomUUID()
  if (!value) await Preferences.set({ key: 'device_id', value: deviceId })
  return deviceId
}
