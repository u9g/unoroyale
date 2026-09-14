// Client for the ranked match server (uno-stats). The server owns the game;
// this only sends intents and renders what comes back.
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { Color } from './engine/card'
import type { GameState } from './engine/gameState'
import { deviceId } from './deviceId'
import { STATS_URL } from './stats'

export interface ServerResult {
  won: boolean
  delta: number
  trophies: number
  promoted: string | null
  floored: boolean
  rating: number
}

export type Intent =
  | { t: 'play'; cardIndex: number; color?: Color | null }
  | { t: 'draw' }
  | { t: 'one' }
  | { t: 'resign' }

export interface OnlineMatch {
  state: Ref<GameState | null>
  result: Ref<ServerResult | null>
  closed: Ref<boolean>
  send(intent: Intent): void
  close(): void
}

export const MATCH_URL = STATS_URL

export interface ServerProfile {
  rating: number
  matches: number
  trophies: number
}

/** The server's view of this install. Trophies here outrank the local copy. */
export async function fetchServerProfile(): Promise<ServerProfile | null> {
  if (!MATCH_URL) return null
  try {
    const res = await fetch(`${MATCH_URL}/me?device_id=${encodeURIComponent(deviceId)}`)
    return res.ok ? ((await res.json()) as ServerProfile) : null
  } catch {
    return null
  }
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${MATCH_URL}${path}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`${path} ${res.status}`)
  return res.json() as Promise<T>
}

/**
 * Opens a ranked match. Throws if the server cannot be reached — ranked is
 * server-decided, so there is no offline fallback for it.
 */
export async function startOnlineMatch(name: string): Promise<OnlineMatch> {
  if (!MATCH_URL) throw new Error('no match server configured')

  const { token } = await post<{ token: string }>('/session', { device_id: deviceId })
  const { match_id } = await post<{ match_id: string }>('/match', {
    device_id: deviceId,
    name,
    token,
  })

  const socket = new WebSocket(
    `${MATCH_URL.replace(/^http/, 'ws')}/match/${match_id}/ws?device_id=${encodeURIComponent(deviceId)}&token=${encodeURIComponent(token)}`
  )

  const state = ref<GameState | null>(null)
  const result = ref<ServerResult | null>(null)
  const closed = ref(false)

  socket.addEventListener('message', event => {
    const msg = JSON.parse(event.data as string)
    if (msg.t === 'state') state.value = msg.state
    if (msg.t === 'result') result.value = msg
  })
  socket.addEventListener('close', () => (closed.value = true))

  await new Promise<void>((resolve, reject) => {
    if (socket.readyState === WebSocket.OPEN) return resolve()
    socket.addEventListener('open', () => resolve(), { once: true })
    socket.addEventListener('error', () => reject(new Error('socket failed')), { once: true })
  })

  return {
    state,
    result,
    closed,
    send(intent) {
      if (socket.readyState === WebSocket.OPEN) socket.send(JSON.stringify(intent))
    },
    close() {
      socket.close()
    },
  }
}
