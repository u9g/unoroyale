import { Capacitor } from '@capacitor/core'
import { CapacitorUpdater } from '@capgo/capacitor-updater'

// 'builtin' is the bundle shipped in the native binary; otherwise the OTA bundle's version
export let bundleVersion = 'builtin'

export async function initUpdater(deviceId: string): Promise<void> {
  if (!Capacitor.isNativePlatform()) return
  await CapacitorUpdater.setCustomId({ customId: deviceId })
  bundleVersion = (await CapacitorUpdater.current()).bundle.version
  // Must be called on every launch or the plugin rolls back to the previous bundle
  await CapacitorUpdater.notifyAppReady()
}
