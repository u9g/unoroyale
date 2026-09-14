import { describe, it, expect } from 'vitest'
import type { Card } from './card'
import { chooseAction, chooseColor } from './ai'
import { profileForSkill } from './skill'
import { newGame } from './game'
import { updatePlayer } from './gameState'

// Keeps the blunder roll from firing so the best-play assertions are deterministic
const noBlunder = () => 0.99

describe('chooseAction', () => {
  it('returns draw when no playable cards', () => {
    let state = newGame('Test')
    state = updatePlayer(state, 1, p => ({
      ...p,
      hand: [{ color: 'blue', value: 1 }],
    }))
    state = {
      ...state,
      discardPile: [{ color: 'red', value: 9 }],
      currentPlayer: 1,
    }

    expect(chooseAction(state, 1, noBlunder)).toEqual({ type: 'draw' })
  })

  it('returns play with index and null color for colored card', () => {
    let state = newGame('Test')
    state = updatePlayer(state, 1, p => ({
      ...p,
      hand: [{ color: 'red', value: 5 }],
    }))
    state = {
      ...state,
      discardPile: [{ color: 'red', value: 3 }],
      currentPlayer: 1,
    }

    expect(chooseAction(state, 1, noBlunder)).toEqual({ type: 'play', cardIndex: 0, color: null })
  })

  it('returns play with color for wild card', () => {
    let state = newGame('Test')
    state = updatePlayer(state, 1, p => ({
      ...p,
      hand: [{ color: null, value: 'wild' }],
    }))
    state = {
      ...state,
      discardPile: [{ color: 'red', value: 3 }],
      currentPlayer: 1,
    }

    const action = chooseAction(state, 1, noBlunder)
    expect(action.type).toBe('play')
    if (action.type === 'play') {
      expect(action.cardIndex).toBe(0)
      expect(['red', 'blue', 'green', 'yellow']).toContain(action.color)
    }
  })

  it('prefers action cards over number cards', () => {
    let state = newGame('Test')
    state = updatePlayer(state, 1, p => ({
      ...p,
      hand: [
        { color: 'red', value: 3 },
        { color: 'red', value: 'draw_two' },
      ],
    }))
    state = {
      ...state,
      discardPile: [{ color: 'red', value: 1 }],
      currentPlayer: 1,
    }

    expect(chooseAction(state, 1, noBlunder)).toEqual({ type: 'play', cardIndex: 1, color: null })
  })

  it('prefers colored cards over wilds', () => {
    let state = newGame('Test')
    state = updatePlayer(state, 1, p => ({
      ...p,
      hand: [
        { color: null, value: 'wild' },
        { color: 'red', value: 7 },
      ],
    }))
    state = {
      ...state,
      discardPile: [{ color: 'red', value: 1 }],
      currentPlayer: 1,
    }

    expect(chooseAction(state, 1, noBlunder)).toEqual({ type: 'play', cardIndex: 1, color: null })
  })
})

describe('skill levers', () => {
  function handState(hand: Card[], top: Card, skill: number, opponentHand = 5) {
    let state = newGame('Test', 2, { aiSkill: skill })
    state = updatePlayer(state, 1, p => ({ ...p, hand }))
    state = updatePlayer(state, 0, p => ({
      ...p,
      hand: Array.from({ length: opponentHand }, () => ({ color: 'blue', value: 1 }) as Card),
    }))
    return { ...state, discardPile: [top], currentPlayer: 1 }
  }

  it('plays attack cards for the tempo they buy heads-up', () => {
    const state = handState(
      [{ color: 'red', value: 9 }, { color: 'red', value: 'draw_two' }],
      { color: 'red', value: 1 },
      1
    )
    expect(chooseAction(state, 1, noBlunder)).toEqual({ type: 'play', cardIndex: 1, color: null })
  })

  it('treats a reverse as a skip heads-up', () => {
    const state = handState(
      [{ color: 'red', value: 9 }, { color: 'red', value: 'reverse' }],
      { color: 'red', value: 1 },
      1
    )
    expect(chooseAction(state, 1, noBlunder)).toEqual({ type: 'play', cardIndex: 1, color: null })
  })

  it('dumps the colour the hand is thin on', () => {
    const state = handState(
      [
        { color: 'red', value: 4 },
        { color: 'red', value: 5 },
        { color: 'red', value: 6 },
        { color: 'green', value: 4 },
      ],
      { color: 'yellow', value: 4 },
      1
    )
    expect(chooseAction(state, 1, noBlunder)).toEqual({ type: 'play', cardIndex: 3, color: null })
  })

  it('burns wilds early at low skill and holds them at high skill', () => {
    const hand: Card[] = [{ color: null, value: 'wild' }, { color: 'red', value: 9 }]
    const top: Card = { color: 'red', value: 1 }
    expect(chooseAction(handState(hand, top, 0.2), 1, noBlunder)).toMatchObject({ cardIndex: 0 })
    expect(chooseAction(handState(hand, top, 1), 1, noBlunder)).toMatchObject({ cardIndex: 1 })
  })

  it('holds a wild while a coloured play exists', () => {
    const state = handState(
      [{ color: null, value: 'wild' }, { color: 'red', value: 9 }],
      { color: 'red', value: 1 },
      1
    )
    expect(chooseAction(state, 1, noBlunder)).toEqual({ type: 'play', cardIndex: 1, color: null })
  })

  it('plays the only card it has even when that is a wild', () => {
    const state = handState([{ color: null, value: 'wild' }], { color: 'red', value: 1 }, 1)
    const action = chooseAction(state, 1, noBlunder)
    expect(action.type).toBe('play')
  })

  it('blunders often at low skill and never at full skill', () => {
    expect(profileForSkill(0).blunder).toBeGreaterThan(0.3)
    expect(profileForSkill(1).blunder).toBe(0)
    expect(profileForSkill(1).callsOne).toBe(1)
  })
})

describe('chooseColor', () => {
  it('picks the most common color in hand', () => {
    const hand: Card[] = [
      { color: 'blue', value: 1 },
      { color: 'blue', value: 3 },
      { color: 'blue', value: 5 },
      { color: 'red', value: 2 },
    ]
    expect(chooseColor(hand)).toBe('blue')
  })

  it('returns a valid color for all-wild hand', () => {
    const hand: Card[] = [{ color: null, value: 'wild' }]
    const color = chooseColor(hand)
    expect(['red', 'blue', 'green', 'yellow']).toContain(color)
  })
})
