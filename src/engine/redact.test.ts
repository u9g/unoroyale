import { describe, it, expect } from 'vitest'
import { newGame } from './game'
import { redactFor, HIDDEN_CARD } from './redact'
import { seededRng } from './rng'

describe('redactFor', () => {
  const state = newGame('Jason', 2, { rng: seededRng(5), aiSkill: 0.8, aiNames: ['Rival'] })

  it('leaves the viewer their own hand', () => {
    expect(redactFor(state, 0).players[0].hand).toEqual(state.players[0].hand)
  })

  it('replaces every other hand with hidden cards, keeping the count', () => {
    const hidden = redactFor(state, 0).players[1]
    expect(hidden.hand).toHaveLength(state.players[1].hand.length)
    expect(hidden.hand.every(c => c === HIDDEN_CARD)).toBe(true)
  })

  it('hides the draw pile order so the next cards cannot be read off the wire', () => {
    const redacted = redactFor(state, 0)
    expect(redacted.drawPile).toHaveLength(state.drawPile.length)
    expect(redacted.drawPile.every(c => c === HIDDEN_CARD)).toBe(true)
    // The real deck has variety; the payload must not
    expect(new Set(state.drawPile.map(c => `${c.color}:${c.value}`)).size).toBeGreaterThan(1)
    expect(new Set(redacted.drawPile.map(c => `${c.color}:${c.value}`)).size).toBe(1)
  })

  it('keeps the discard pile, which is public by the time it is there', () => {
    expect(redactFor(state, 0).discardPile).toEqual(state.discardPile)
  })

  it('hides the opponent skill so difficulty cannot be read off the wire', () => {
    expect(redactFor(state, 0).players[1].skill).toBeUndefined()
    expect(state.players[1].skill).toBe(0.8)
  })

  it('redacts from the other seat too', () => {
    const fromSeat1 = redactFor(state, 1)
    expect(fromSeat1.players[1].hand).toEqual(state.players[1].hand)
    expect(fromSeat1.players[0].hand.every(c => c === HIDDEN_CARD)).toBe(true)
  })

  it('keeps opponent hand sizes, which the table shows', () => {
    expect(redactFor(state, 0).players[1].hand).toHaveLength(state.players[1].hand.length)
  })
})
