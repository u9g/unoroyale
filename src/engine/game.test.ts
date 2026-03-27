import { describe, it, expect } from 'vitest'
import type { Card } from './card'
import { displayColor } from './card'
import { newGame, playCard, drawCard, sayUno, pass } from './game'
import { topCard, updatePlayer } from './gameState'
import { handSize } from './player'

describe('newGame', () => {
  it('creates 4 players with correct types', () => {
    const state = newGame('Alice')
    expect(state.players.length).toBe(4)
    expect(state.players[0].name).toBe('Alice')
    expect(state.players[0].type).toBe('human')
    expect(state.players.slice(1).every(p => p.type === 'ai')).toBe(true)
  })

  it('gives AI players random names from the name list', () => {
    const state = newGame('Alice')
    const aiNames = state.players.slice(1).map(p => p.name)
    expect(aiNames.every(n => n !== 'Alice')).toBe(true)
    expect(new Set(aiNames).size).toBe(3)
    expect(aiNames.every(n => typeof n === 'string' && n.length > 0)).toBe(true)
  })

  it('deals 7 cards to each player, plus 2 extra if opening card is draw_two', () => {
    const state = newGame('Alice')
    const top = topCard(state)!

    for (const player of state.players) {
      const expected = top.value === 'draw_two' && player.id === 0 ? 9 : 7
      expect(handSize(player)).toBe(expected)
    }
  })

  it('has one card on discard pile', () => {
    const state = newGame('Alice')
    expect(state.discardPile.length).toBeGreaterThanOrEqual(1)
  })

  it('starting card is never wild_draw_four', () => {
    for (let i = 0; i < 50; i++) {
      const state = newGame('Alice')
      const top = topCard(state)!
      expect(top.value).not.toBe('wild_draw_four')
    }
  })

  it('draw pile has remaining cards (total = 108)', () => {
    const state = newGame('Alice')
    const total = state.drawPile.length + state.discardPile.length +
      state.players.reduce((sum, p) => sum + handSize(p), 0)
    expect(total).toBe(108)
  })

  it('phase is playing', () => {
    const state = newGame('Alice')
    expect(state.phase).toBe('playing')
  })

  it('direction starts counter-clockwise unless opening card is reverse', () => {
    const state = newGame('Alice')
    const top = topCard(state)!
    if (top.value === 'reverse') {
      expect(state.direction).toBe('clockwise')
    } else {
      expect(state.direction).toBe('counter_clockwise')
    }
  })
})

describe('playCard', () => {
  it('plays a valid card', () => {
    let state = newGame('Test')
    const top = topCard(state)!
    const card: Card = { color: displayColor(top) || 'red', value: 5 }
    state = updatePlayer(state, 0, p => ({ ...p, hand: [card, ...p.hand] }))
    state = { ...state, currentPlayer: 0 }

    const result = playCard(state, 0, 0)
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(topCard(result.state)!.value).toBe(5)
    }
  })

  it('records recent plays', () => {
    let state = newGame('Test')
    const top = topCard(state)!
    const card: Card = { color: displayColor(top) || 'red', value: 5 }
    state = updatePlayer(state, 0, p => ({ ...p, hand: [card, ...p.hand] }))
    state = { ...state, currentPlayer: 0 }

    const result = playCard(state, 0, 0)
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.state.recentPlays[0][0]).toBe('Test')
      expect(result.state.recentPlays[0][1].value).toBe(5)
    }
  })

  it('rejects play when not your turn', () => {
    let state = newGame('Test')
    state = { ...state, currentPlayer: 1 }
    const result = playCard(state, 0, 0)
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.error).toBe('not_your_turn')
  })

  it('rejects wild without chosen color', () => {
    let state = newGame('Test')
    const wild: Card = { color: null, value: 'wild' }
    state = updatePlayer(state, 0, p => ({ ...p, hand: [wild, ...p.hand] }))
    state = { ...state, currentPlayer: 0 }

    const result = playCard(state, 0, 0)
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.error).toBe('must_choose_color')
  })

  it('accepts wild with chosen color', () => {
    let state = newGame('Test')
    const wild: Card = { color: null, value: 'wild' }
    state = updatePlayer(state, 0, p => ({ ...p, hand: [wild, ...p.hand] }))
    state = { ...state, currentPlayer: 0 }

    const result = playCard(state, 0, 0, 'blue')
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(topCard(result.state)!.chosenColor).toBe('blue')
    }
  })

  it('skip advances past next player', () => {
    let state = newGame('Test')
    const skip: Card = { color: 'red', value: 'skip' }
    state = {
      ...state,
      discardPile: [{ color: 'red', value: 1 }],
      currentPlayer: 0,
    }
    state = updatePlayer(state, 0, p => ({ ...p, hand: [skip, ...p.hand] }))

    const result = playCard(state, 0, 0)
    expect(result.ok).toBe(true)
    if (result.ok) expect(result.state.currentPlayer).toBe(2)
  })

  it('reverse flips direction', () => {
    let state = newGame('Test')
    const rev: Card = { color: 'red', value: 'reverse' }
    state = {
      ...state,
      discardPile: [{ color: 'red', value: 1 }],
      currentPlayer: 0,
      direction: 'counter_clockwise',
    }
    state = updatePlayer(state, 0, p => ({ ...p, hand: [rev, ...p.hand] }))

    const result = playCard(state, 0, 0)
    expect(result.ok).toBe(true)
    if (result.ok) expect(result.state.direction).toBe('clockwise')
  })

  it('draw_two auto-deals 2 cards to next player', () => {
    let state = newGame('Test')
    const d2: Card = { color: 'red', value: 'draw_two' }
    state = {
      ...state,
      discardPile: [{ color: 'red', value: 1 }],
      currentPlayer: 0,
      direction: 'clockwise',
    }
    state = updatePlayer(state, 0, p => ({ ...p, hand: [d2, ...p.hand] }))
    const before = handSize(state.players[1])

    const result = playCard(state, 0, 0)
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(handSize(result.state.players[1])).toBe(before + 2)
    }
  })

  it('game over when hand is empty', () => {
    let state = newGame('Test')
    const card: Card = { color: 'red', value: 5 }
    state = {
      ...state,
      discardPile: [{ color: 'red', value: 1 }],
      currentPlayer: 0,
    }
    state = updatePlayer(state, 0, p => ({ ...p, hand: [card], saidUno: true }))

    const result = playCard(state, 0, 0)
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.state.phase).toBe('game_over')
      expect(result.state.winner).toBe(0)
    }
  })
})

describe('drawCard', () => {
  it('draws a card and adds to hand', () => {
    let state = newGame('Test')
    state = { ...state, currentPlayer: 0 }
    const initialSize = handSize(state.players[0])

    const result = drawCard(state, 0)
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.drawnCard).toBeDefined()
      expect(handSize(result.state.players[0])).toBe(initialSize + 1)
    }
  })

  it('drawn cards are marked with drawn: true', () => {
    let state = newGame('Test')
    state = { ...state, currentPlayer: 0 }

    const result = drawCard(state, 0)
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.drawnCard.drawn).toBe(true)
      const last = result.state.players[0].hand[result.state.players[0].hand.length - 1]
      expect(last.drawn).toBe(true)
    }
  })

  it('dealt cards are not marked as drawn', () => {
    const state = newGame('Test')
    const player = state.players[0]
    const nonDrawn = player.hand.filter(c => !c.drawn)
    expect(nonDrawn.length).toBeGreaterThanOrEqual(7)
  })

  it('drawn flags are cleared when turn advances', () => {
    let state = newGame('Test')
    state = { ...state, currentPlayer: 0 }

    const drawResult = drawCard(state, 0)
    expect(drawResult.ok).toBe(true)
    if (!drawResult.ok) return

    expect(drawResult.state.players[0].hand.some(c => c.drawn)).toBe(true)

    const passResult = pass(drawResult.state, 0)
    expect(passResult.ok).toBe(true)
    if (passResult.ok) {
      expect(passResult.state.players[0].hand.some(c => c.drawn)).toBe(false)
    }
  })

  it('rejects draw when not your turn', () => {
    let state = newGame('Test')
    state = { ...state, currentPlayer: 1 }
    const result = drawCard(state, 0)
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.error).toBe('not_your_turn')
  })
})

describe('sayUno', () => {
  it('sets saidUno flag', () => {
    const state = newGame('Test')
    const result = sayUno(state, 0)
    expect(result.ok).toBe(true)
    if (result.ok) expect(result.state.players[0].saidUno).toBe(true)
  })

  it('succeeds regardless of hand size', () => {
    const state = newGame('Test')
    const result = sayUno(state, 0)
    expect(result.ok).toBe(true)
  })
})

describe('UNO penalty', () => {
  it('penalizes player who wins without calling UNO', () => {
    let state = newGame('Test')
    const card: Card = { color: 'red', value: 5 }
    state = {
      ...state,
      discardPile: [{ color: 'red', value: 1 }],
      currentPlayer: 0,
    }
    state = updatePlayer(state, 0, p => ({ ...p, hand: [card], saidUno: false }))

    const result = playCard(state, 0, 0)
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.state.phase).toBe('playing')
      expect(handSize(result.state.players[0])).toBe(2)
      expect(result.state.unoPenalty).toBe(true)
    }
  })

  it('allows win when UNO was called', () => {
    let state = newGame('Test')
    const card: Card = { color: 'red', value: 5 }
    state = {
      ...state,
      discardPile: [{ color: 'red', value: 1 }],
      currentPlayer: 0,
    }
    state = updatePlayer(state, 0, p => ({ ...p, hand: [card], saidUno: true }))

    const result = playCard(state, 0, 0)
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.state.phase).toBe('game_over')
      expect(result.state.winner).toBe(0)
    }
  })
})

describe('pass', () => {
  it('advances turn', () => {
    let state = newGame('Test')
    state = { ...state, currentPlayer: 0 }
    const result = pass(state, 0)
    expect(result.ok).toBe(true)
    if (result.ok) expect(result.state.currentPlayer).not.toBe(0)
  })

  it('rejects when not your turn', () => {
    let state = newGame('Test')
    state = { ...state, currentPlayer: 1 }
    const result = pass(state, 0)
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.error).toBe('not_your_turn')
  })
})
