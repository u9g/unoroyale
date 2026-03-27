import type { Card, Color } from './card'
import { isWild, cardToString } from './card'
import * as Deck from './deck'
import type { Player } from './player'
import { handSize, removeCardAt, addCards } from './player'
import type { GameState } from './gameState'
import { topCard, updatePlayer, nextPlayerIndex, recordPlay, advanceTurn } from './gameState'
import { playable } from './rules'
import namesCsv from '../names.csv?raw'

const HAND_SIZE = 7

const ALL_NAMES: string[] = namesCsv
  .trim()
  .split('\n')
  .slice(1)
  .flatMap(line => {
    const [, girl, boy] = line.split(',')
    return [girl?.trim(), boy?.trim()].filter((n): n is string => !!n)
  })

function pickRandomNames(exclude: string, count: number): string[] {
  const available = ALL_NAMES.filter(n => n.toLowerCase() !== exclude.toLowerCase())
  const picked: string[] = []
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * available.length)
    picked.push(available[idx])
    available.splice(idx, 1)
  }
  return picked
}

export function newGame(playerName: string): GameState {
  let deck = Deck.shuffle(Deck.newDeck())

  const aiNames = pickRandomNames(playerName, 3)
  const players: Player[] = [
    { id: 0, name: playerName, type: 'human', hand: [], saidUno: false },
    { id: 1, name: aiNames[0], type: 'ai', hand: [], saidUno: false },
    { id: 2, name: aiNames[1], type: 'ai', hand: [], saidUno: false },
    { id: 3, name: aiNames[2], type: 'ai', hand: [], saidUno: false },
  ]

  // Deal hands
  const dealtPlayers: Player[] = []
  for (const player of players) {
    const [hand, remaining] = Deck.draw(deck, HAND_SIZE)
    dealtPlayers.push({ ...player, hand })
    deck = remaining
  }

  // Draw starting card (no Wild Draw Four allowed)
  const [firstCard, remainingDeck] = drawStartingCard(deck)
  deck = remainingDeck

  const state: GameState = {
    players: dealtPlayers,
    drawPile: deck,
    discardPile: [firstCard],
    currentPlayer: 0,
    direction: 'counter_clockwise',
    phase: 'playing',
    winner: null,
    lastAction: `Game started! ${cardToString(firstCard)} on the pile.`,
    unoPenalty: false,
    recentPlays: [],
  }

  return applyOpeningCard(state, firstCard)
}

export function playCard(
  state: GameState,
  playerIndex: number,
  cardIndex: number,
  chosenColor?: Color | null
): { ok: true; state: GameState } | { ok: false; error: string } {
  const player = state.players[playerIndex]
  const card = player.hand[cardIndex]
  const top = topCard(state)

  if (state.phase !== 'playing') return { ok: false, error: 'wrong_phase' }
  if (state.currentPlayer !== playerIndex) return { ok: false, error: 'not_your_turn' }
  if (!card) return { ok: false, error: 'invalid_card' }
  if (!playable(card, top!)) return { ok: false, error: 'not_playable' }
  if (isWild(card) && !chosenColor) return { ok: false, error: 'must_choose_color' }

  return doPlayCard(state, playerIndex, cardIndex, card, chosenColor ?? null)
}

export function drawCard(
  state: GameState,
  playerIndex: number
): { ok: true; state: GameState; drawnCard: Card } | { ok: false; error: string } {
  if (state.phase !== 'playing') return { ok: false, error: 'wrong_phase' }
  if (state.currentPlayer !== playerIndex) return { ok: false, error: 'not_your_turn' }
  return doDrawCard(state, playerIndex)
}

export function sayUno(
  state: GameState,
  playerIndex: number
): { ok: true; state: GameState } {
  const player = state.players[playerIndex]
  const updated = updatePlayer(state, playerIndex, p => ({ ...p, saidUno: true }))
  return { ok: true, state: { ...updated, lastAction: `${player.name} called UNO!` } }
}

export function pass(
  state: GameState,
  playerIndex: number
): { ok: true; state: GameState } | { ok: false; error: string } {
  if (state.currentPlayer === playerIndex) {
    return { ok: true, state: advanceTurn(state) }
  }
  return { ok: false, error: 'not_your_turn' }
}

// --- Private ---

function drawStartingCard(deck: Card[]): [Card, Card[]] {
  const [[card], rest] = Deck.draw(deck, 1)
  if (card.value === 'wild_draw_four') {
    return drawStartingCard(Deck.shuffle([...rest, card]))
  }
  return [card, rest]
}

function applyOpeningCard(state: GameState, card: Card): GameState {
  const currentName = state.players[state.currentPlayer].name

  switch (card.value) {
    case 'skip':
      return advanceTurn({
        ...state,
        lastAction: `${cardToString(card)} - ${currentName} is skipped!`,
      })

    case 'reverse':
      return advanceTurn({
        ...state,
        direction: 'clockwise',
        lastAction: `${cardToString(card)} - Reversed! Playing clockwise.`,
      })

    case 'draw_two': {
      const [cards, drawPile] = drawCards(state.drawPile, state.discardPile, 2)
      const targetIdx = state.currentPlayer
      let s = { ...state, drawPile }
      s = updatePlayer(s, targetIdx, p => addCards(p, cards))
      return { ...s, lastAction: `${cardToString(card)} - ${currentName} drew 2!` }
    }

    case 'wild': {
      const colors: Color[] = ['red', 'blue', 'green', 'yellow']
      const color = colors[Math.floor(Math.random() * colors.length)]
      const updatedCard: Card = { ...card, chosenColor: color }
      return { ...state, discardPile: [updatedCard], lastAction: `Wild opened - color is ${color}!` }
    }

    default:
      return state
  }
}

function doPlayCard(
  state: GameState,
  playerIndex: number,
  cardIndex: number,
  card: Card,
  chosenColor: Color | null
): { ok: true; state: GameState } {
  const playedCard: Card = isWild(card)
    ? { ...card, chosenColor }
    : card

  const player = state.players[playerIndex]
  const [, updatedPlayer] = removeCardAt(player, cardIndex)

  let s: GameState = {
    ...state,
    discardPile: [playedCard, ...state.discardPile],
  }
  s = updatePlayer(s, playerIndex, () => updatedPlayer)
  s = recordPlay(s, player.name, playedCard)

  // Check win — but if player didn't call UNO, penalize instead
  const currentHand = handSize(s.players[playerIndex])

  s = { ...s, unoPenalty: false }

  if (currentHand === 0) {
    if (!player.saidUno) {
      // Penalty: draw 2, no win
      s = unoPenalty(s, playerIndex)
      const penaltyAction = s.lastAction
      s = applyCardEffect(s, playedCard, playerIndex)
      s = { ...s, unoPenalty: playerIndex === 0, lastAction: `${penaltyAction} ${s.lastAction}` }
      return { ok: true, state: s }
    } else {
      return {
        ok: true,
        state: { ...s, phase: 'game_over', winner: playerIndex, lastAction: `${player.name} wins!` },
      }
    }
  } else {
    // Reset saidUno after playing
    s = updatePlayer(s, playerIndex, p => ({ ...p, saidUno: false }))
    s = applyCardEffect(s, playedCard, playerIndex)
    return { ok: true, state: s }
  }
}

function applyCardEffect(state: GameState, card: Card, playerIndex: number): GameState {
  const player = state.players[playerIndex]

  switch (card.value) {
    case 'skip': {
      const next = nextPlayerIndex(state)
      const skipped = state.players[next]
      return advanceTurn(
        advanceTurn({
          ...state,
          lastAction: `${player.name} played ${cardToString(card)} - ${skipped.name} is skipped!`,
        })
      )
    }

    case 'reverse': {
      const newDir = state.direction === 'clockwise' ? 'counter_clockwise' : 'clockwise'
      return advanceTurn({
        ...state,
        direction: newDir,
        lastAction: `${player.name} played ${cardToString(card)} - Reversed!`,
      })
    }

    case 'draw_two': {
      const next = nextPlayerIndex(state)
      const target = state.players[next]
      const [cards, drawPile] = drawCards(state.drawPile, state.discardPile, 2)
      let s = { ...state, drawPile }
      s = updatePlayer(s, next, p => addCards(p, cards))
      return advanceTurn({
        ...s,
        lastAction: `${player.name} played ${cardToString(card)} - ${target.name} drew 2!`,
      })
    }

    case 'wild': {
      const color = card.chosenColor
      return advanceTurn({
        ...state,
        lastAction: `${player.name} played Wild - chose ${color}!`,
      })
    }

    case 'wild_draw_four': {
      const next = nextPlayerIndex(state)
      const target = state.players[next]
      const color = card.chosenColor
      const [cards, drawPile] = drawCards(state.drawPile, state.discardPile, 4)
      let s = { ...state, drawPile }
      s = updatePlayer(s, next, p => addCards(p, cards))
      return advanceTurn({
        ...s,
        lastAction: `${player.name} played Wild +4 - ${target.name} drew 4! Color is ${color}!`,
      })
    }

    default:
      return advanceTurn({
        ...state,
        lastAction: `${player.name} played ${cardToString(card)}.`,
      })
  }
}

function doDrawCard(
  state: GameState,
  playerIndex: number
): { ok: true; state: GameState; drawnCard: Card } {
  const [cards, drawPile] = drawCards(state.drawPile, state.discardPile, 1)
  const drawn = cards[0]
  const player = state.players[playerIndex]

  let s: GameState = { ...state, drawPile }
  s = updatePlayer(s, playerIndex, p => addCards(p, [drawn]))
  s = { ...s, lastAction: `${player.name} drew a card.` }

  return { ok: true, state: s, drawnCard: drawn }
}

function drawCards(drawPile: Card[], discardPile: Card[], count: number): [Card[], Card[]] {
  if (drawPile.length >= count) {
    const [cards, remaining] = Deck.draw(drawPile, count)
    return [cards.map(c => ({ ...c, drawn: true })), remaining]
  }

  // Recycle discard pile (keep top card)
  const [, ...rest] = discardPile
  const recycled = Deck.reshuffleDiscard(rest)
  const newPile = [...drawPile, ...recycled]
  const [cards, remaining] = Deck.draw(newPile, Math.min(count, newPile.length))
  return [cards.map(c => ({ ...c, drawn: true })), remaining]
}

function unoPenalty(state: GameState, playerIndex: number): GameState {
  const player = state.players[playerIndex]
  const [penaltyCards, drawPile] = drawCards(state.drawPile, state.discardPile, 2)

  let s: GameState = { ...state, drawPile }
  s = updatePlayer(s, playerIndex, p => addCards(p, penaltyCards))
  return { ...s, lastAction: `${player.name} forgot to call UNO! Drew 2 penalty cards.` }
}
