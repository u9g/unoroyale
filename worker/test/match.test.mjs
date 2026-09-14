// End-to-end: drives a real match over the WebSocket against `wrangler dev`,
// then checks the server wrote the rating and trophies itself.
import { WebSocket } from 'ws'
import { execFileSync } from 'node:child_process'
import assert from 'node:assert/strict'

const BASE = process.env.MATCH_URL ?? 'http://127.0.0.1:8801'
const DEVICE = `test-${process.pid}-${Date.now()}`

const post = async (path, body) =>
  (await fetch(BASE + path, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) })).json()

function d1(sql) {
  const out = execFileSync('npx', ['wrangler', 'd1', 'execute', 'uno-stats', '--local', '--json', '--command', sql], { encoding: 'utf8' })
  return JSON.parse(out.slice(out.indexOf('[')))[0].results
}

const playable = (card, top) => {
  const color = c => c.chosenColor ?? c.color
  return card.color === null || color(card) === color(top) || card.value === top.value
}

const { token } = await post('/session', { device_id: DEVICE })
const { match_id, rating, trophies } = await post('/match', { device_id: DEVICE, name: 'Jason', token })
assert.equal(rating, 1000, 'a new device starts at the default rating')
assert.equal(trophies, 0)

const ws = new WebSocket(`${BASE.replace('http', 'ws')}/match/${match_id}/ws?device_id=${DEVICE}&token=${token}`)
const done = new Promise((resolve, reject) => {
  let seenHiddenHand = false
  setTimeout(() => reject(new Error('timed out')), 60_000)

  ws.on('message', raw => {
    const msg = JSON.parse(raw)

    if (msg.t === 'state') {
      const { state } = msg
      const me = state.players[0]
      const them = state.players[1]

      // The payload must never carry the opponent's cards or the deck order
      assert.ok(them.hand.every(c => c.color === null && c.value === 'wild'), 'opponent hand is hidden')
      assert.equal(them.skill, undefined, 'opponent skill is hidden')
      assert.ok(state.drawPile.every(c => c.color === null && c.value === 'wild'), 'draw pile is hidden')
      if (them.hand.length > 0) seenHiddenHand = true

      if (state.phase !== 'playing' || state.currentPlayer !== 0) return

      // One message per state, or a stale move races the broadcast
      if (me.hand.length === 2 && !me.saidUno) return ws.send(JSON.stringify({ t: 'one' }))

      const top = state.discardPile[0]
      const idx = me.hand.findIndex(c => playable(c, top))
      if (idx >= 0) {
        const card = me.hand[idx]
        const color = card.color === null ? 'red' : null
        ws.send(JSON.stringify({ t: 'play', cardIndex: idx, color }))
      } else {
        ws.send(JSON.stringify({ t: 'draw' }))
      }
    }

    if (msg.t === 'result') {
      assert.ok(seenHiddenHand, 'saw at least one redacted opponent hand')
      resolve(msg)
    }
    if (msg.t === 'error') reject(new Error(`server rejected a move: ${msg.error}`))
  })
  ws.on('error', reject)
})

const result = await done
ws.close()

console.log('result:', result)
assert.equal(typeof result.won, 'boolean')
assert.equal(result.trophies, result.won ? 30 : 0, 'trophies settled by the server')
assert.equal(result.delta, result.won ? 30 : 0, 'a first loss is floored at zero')

const [row] = d1(`select * from ratings where device_id = '${DEVICE}'`)
assert.ok(row, 'the server wrote a rating row')
assert.equal(row.matches, 1)
assert.equal(row.trophies, result.trophies)
assert.equal(row.rating, result.rating)
assert.ok(result.won ? row.rating > 1000 : row.rating < 1000, 'rating moved the right way')

const [match] = d1(`select * from matches where device_id = '${DEVICE}'`)
assert.equal(match.opponent_kind, 'bot')
assert.equal(match.won, result.won ? 1 : 0)
assert.ok(match.turns > 0)

// A settled match must not pay out twice
const replay = new WebSocket(`${BASE.replace('http', 'ws')}/match/${match_id}/ws?device_id=${DEVICE}&token=${token}`)
await new Promise(r => replay.on('open', r))
replay.send(JSON.stringify({ t: 'draw' }))
await new Promise(r => setTimeout(r, 500))
replay.close()
const [after] = d1(`select * from ratings where device_id = '${DEVICE}'`)
assert.equal(after.matches, 1, 'replaying a settled match pays nothing')

// Another device cannot open this match
const stolenStatus = await new Promise(resolve => {
  const thief = new WebSocket(`${BASE.replace('http', 'ws')}/match/${match_id}/ws?device_id=someone-else&token=${token}`)
  thief.on('unexpected-response', (_req, res) => resolve(res.statusCode))
  thief.on('open', () => { thief.close(); resolve(101) })
  thief.on('error', () => resolve(0))
})
assert.equal(stolenStatus, 403, 'a match belongs to the device that created it')

console.log('\nOK — server-authoritative match, redaction, settlement and ownership all hold')
