// Anonymous gameplay counters; sends nothing unless VITE_STATS_URL is set (see uno-stats repo)
export const STATS_URL: string | undefined = import.meta.env.VITE_STATS_URL

type GameEvent =
  | { event: 'started'; players: number }
  | { event: 'finished'; players: number; winner: 'human' | 'ai'; duration_s: number }

export function track(data: GameEvent) {
  if (!STATS_URL) return
  navigator.sendBeacon(STATS_URL, new Blob([JSON.stringify(data)], { type: 'application/json' }))
}
