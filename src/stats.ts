// Anonymous gameplay counters; sends nothing unless VITE_STATS_URL is set (see uno-stats repo)
import { deviceId } from './deviceId'
import { bundleVersion } from './updater'

export const STATS_URL: string | undefined = import.meta.env.VITE_STATS_URL

type GameEvent =
  | { event: 'started'; players: number }
  | { event: 'finished'; players: number; winner: 'human' | 'ai'; duration_s: number }

export function track(data: GameEvent) {
  if (!STATS_URL) return
  const body = JSON.stringify({ ...data, device_id: deviceId, bundle: bundleVersion })
  navigator.sendBeacon(STATS_URL, new Blob([body], { type: 'application/json' }))
}
