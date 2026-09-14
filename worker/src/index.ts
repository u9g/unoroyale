import { MatchRoom, START_RATING } from './match'
import type { Env } from './env'

export { MatchRoom }

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json' } })

const status = (code: number, text?: string) => new Response(text ?? null, { status: code })

function withCors(req: Request, res: Response): Response {
  if (res.status === 101) return res
  const out = new Response(res.body, res)
  out.headers.set('access-control-allow-origin', req.headers.get('origin') ?? '*')
  out.headers.set('access-control-allow-methods', 'POST, GET, OPTIONS')
  out.headers.set('access-control-allow-headers', 'content-type')
  out.headers.set('vary', 'origin')
  return out
}

/**
 * Ties a request to a device id. This stops a client editing its own id in
 * flight; it does not prove who the device belongs to. Real identity needs the
 * token minted when the name is claimed — see uno-stats /name.
 */
async function sign(secret: string, deviceId: string): Promise<string> {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const mac = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(deviceId))
  return btoa(String.fromCharCode(...new Uint8Array(mac))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

async function authed(env: Env, deviceId: string, token: string | null): Promise<boolean> {
  if (!env.SESSION_SECRET) return true // local dev without a secret set
  if (!token || !deviceId) return false
  const expected = await sign(env.SESSION_SECRET, deviceId)
  if (token.length !== expected.length) return false
  let diff = 0
  for (let i = 0; i < expected.length; i++) diff |= token.charCodeAt(i) ^ expected.charCodeAt(i)
  return diff === 0
}

interface RatingRow {
  rating: number
  matches: number
  trophies: number
}

async function ratingFor(env: Env, deviceId: string): Promise<RatingRow> {
  const row = await env.DB.prepare('select rating, matches, trophies from ratings where device_id = ?')
    .bind(deviceId)
    .first<RatingRow>()
  return row ?? { rating: START_RATING, matches: 0, trophies: 0 }
}

async function session(req: Request, env: Env): Promise<Response> {
  const body = await req.json<{ device_id?: string }>().catch(() => null)
  const deviceId = body?.device_id?.trim()
  if (!deviceId) return status(400, 'device_id required')
  const token = env.SESSION_SECRET ? await sign(env.SESSION_SECRET, deviceId) : 'dev'
  return json({ token })
}

async function createMatch(req: Request, env: Env): Promise<Response> {
  const body = await req.json<{ device_id?: string; name?: string; token?: string }>().catch(() => null)
  const deviceId = body?.device_id?.trim()
  if (!deviceId) return status(400, 'device_id required')
  if (!(await authed(env, deviceId, body?.token ?? null))) return status(401, 'bad token')

  const { rating, matches, trophies } = await ratingFor(env, deviceId)
  const id = crypto.randomUUID()
  const room = env.MATCH.get(env.MATCH.idFromName(id))
  await room.fetch(new Request('https://match/start', {
    method: 'POST',
    body: JSON.stringify({ id, deviceId, playerName: body?.name?.trim() || 'Player', rating, matches, trophies }),
  }))
  return json({ match_id: id, rating, trophies })
}

async function joinMatch(req: Request, env: Env, id: string): Promise<Response> {
  const url = new URL(req.url)
  const deviceId = url.searchParams.get('device_id') ?? ''
  if (!(await authed(env, deviceId, url.searchParams.get('token')))) return status(401, 'bad token')
  return env.MATCH.get(env.MATCH.idFromName(id)).fetch(req)
}

async function me(req: Request, env: Env): Promise<Response> {
  const url = new URL(req.url)
  const deviceId = url.searchParams.get('device_id') ?? ''
  if (!deviceId) return status(400, 'device_id required')
  return json(await ratingFor(env, deviceId))
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url)
    if (req.method === 'OPTIONS') return withCors(req, status(204))

    const match = url.pathname.match(/^\/match\/([\w-]+)\/ws$/)
    if (match) return withCors(req, await joinMatch(req, env, match[1]))
    if (req.method === 'POST' && url.pathname === '/session') return withCors(req, await session(req, env))
    if (req.method === 'POST' && url.pathname === '/match') return withCors(req, await createMatch(req, env))
    if (req.method === 'GET' && url.pathname === '/me') return withCors(req, await me(req, env))
    return withCors(req, new Response('ok'))
  },
} satisfies ExportedHandler<Env>
