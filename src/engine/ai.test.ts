import { describe, it, expect } from 'vitest'
import type { Card } from './card'
import { chooseAction, chooseColor } from './ai'
import { newGame } from './game'
import { updatePlayer } from './gameState'

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

    expect(chooseAction(state, 1)).toEqual({ type: 'draw' })
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

    expect(chooseAction(state, 1)).toEqual({ type: 'play', cardIndex: 0, color: null })
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

    const action = chooseAction(state, 1)
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

    expect(chooseAction(state, 1)).toEqual({ type: 'play', cardIndex: 1, color: null })
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

    expect(chooseAction(state, 1)).toEqual({ type: 'play', cardIndex: 1, color: null })
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
