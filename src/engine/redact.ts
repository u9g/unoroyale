import type { Card } from './card'
import type { GameState } from './gameState'

/**
 * A stand-in for a card the viewer is not allowed to see. Hands are still sent
 * as arrays so counts survive, and the UI only ever draws backs for opponents.
 */
export const HIDDEN_CARD: Card = { color: null, value: 'wild' }

/**
 * Strips everything the viewer is not entitled to see: other hands, the order
 * of the draw pile, and opponent skill. The server sends this, never the raw
 * state — anything in the payload is readable by whoever holds the socket.
 * The discard pile stays intact because every card in it was played face up.
 */
export function redactFor(state: GameState, seat: number): GameState {
  return {
    ...state,
    // Sizes are public, values are not
    drawPile: state.drawPile.map(() => HIDDEN_CARD),
    players: state.players.map((player, i) =>
      i === seat ? player : { ...player, hand: player.hand.map(() => HIDDEN_CARD), skill: undefined }
    ),
  }
}
