import { STATS_URL } from './stats'

// Debug-branch only, never merged to main: my phone holds a WebSocket to the uno-stats relay and
// runs whatever my CLI sends, so a bundle pinned with ota:try can be inspected without a cable.
const MY_DEVICE_ID = 'af44f784-965f-496f-b0eb-b86e6c810399'
const RECONNECT_MS = 3000

export function startDebugBridge(deviceId: string): void {
  if (!STATS_URL || deviceId !== MY_DEVICE_ID) return
  connect(`${STATS_URL.replace(/^http/, 'ws')}/debug/ws?role=device&device_id=${encodeURIComponent(deviceId)}`)
}

function connect(url: string): void {
  const ws = new WebSocket(url)
  ws.onmessage = async (event) => {
    const { id, code } = JSON.parse(event.data as string) as { id: number; code: string }
    ws.send(JSON.stringify({ id, result: await run(code) }))
  }
  // Backgrounding the app kills the socket, so every close schedules a fresh one
  ws.onclose = () => setTimeout(() => connect(url), RECONNECT_MS)
  ws.onerror = () => ws.close()
}

async function run(code: string): Promise<string> {
  try {
    const fn = new Function(`return (async () => {${code}})()`) as () => Promise<unknown>
    return format(await fn())
  } catch (e) {
    return e instanceof Error ? `${e.name}: ${e.message}\n${e.stack ?? ''}` : String(e)
  }
}

// Structured values come back as JSON; anything unserializable falls back to its string form
function format(value: unknown): string {
  if (value === undefined) return 'undefined'
  try {
    return JSON.stringify(value, replacer, 2) ?? String(value)
  } catch {
    return String(value)
  }
}

const replacer = (_key: string, value: unknown) =>
  value instanceof Error ? `${value.name}: ${value.message}` : value
