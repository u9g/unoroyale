# card-royale-match

The authoritative match server for ranked play: a Cloudflare Worker with one
Durable Object per match. It runs the same engine the app does (`../src/engine`,
imported directly — no copy to drift), drives the bot seats itself, and is the
only thing that decides who won.

## Why it exists

With the AI and the ladder on the client, a client can simply claim a win.
Everything here follows from moving that decision server-side.

## Endpoints

| | |
|---|---|
| `POST /session` | `{ device_id }` → `{ token }` |
| `POST /match` | `{ device_id, name, token }` → `{ match_id, rating, trophies }` |
| `GET /match/:id/ws?device_id=&token=` | the match socket |
| `GET /me?device_id=` | `{ rating, matches, trophies }` |

Socket messages, client → server: `{t:'play', cardIndex, color?}`, `{t:'draw'}`,
`{t:'one'}`. Server → client: `{t:'state', state}`, `{t:'result', ...}`,
`{t:'error', error}`.

**Every outbound state is redacted** (`engine/redact.ts`): other hands and the
draw pile become placeholder cards, opponent skill is stripped. The discard pile
is sent intact because it is public by the time it is there.

## Identity

`/session` returns an HMAC of the device id. That stops a client editing its own
id in flight; it does **not** prove the device is theirs. Real identity wants the
token minted when the name is claimed (uno-stats `/name`) — worth doing before
human matches are live, since by then a stolen id is a stolen ladder position.

## Local

```bash
npm install
npm run db:migrate:local                     # ratings + matches tables
npx wrangler dev --port 8801 --var AI_DELAY_MS:0
npm test                                     # plays a full match over the socket
```

`AI_DELAY_MS` exists so tests do not wait out the bot's thinking time; leave it
unset in production for the usual pause.

## Deploy

```bash
npm run db:migrate    # remote D1, additive
npx wrangler secret put SESSION_SECRET
npm run deploy
```
