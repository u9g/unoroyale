# UNO Royale - Game Rules

## Overview

UNO Royale is a 4-player card game: you against 3 AI opponents (CPU West, CPU North, CPU East). The goal is to be the first player to empty your hand.

## The Deck

The deck has 108 cards:

- **Number cards (0-9)** in four colors: Red, Blue, Green, Yellow
  - One 0 per color, two of each 1-9 per color (76 total)
- **Action cards** in four colors:
  - **Skip** (2 per color) - Skips the next player's turn
  - **Reverse** (2 per color) - Reverses the turn direction
  - **Draw Two (+2)** (2 per color) - Next player draws 2 cards, then takes their turn
- **Wild cards** (no color):
  - **Wild** (4 total) - Play on anything, choose the next color
  - **Wild Draw Four (+4)** (4 total) - Next player draws 4 cards, then takes their turn; you choose the next color

## Setup

1. Each player is dealt 7 cards
2. One card is flipped from the draw pile to start the discard pile
3. If the opening card is a **Wild Draw Four**, it is shuffled back and a new card is flipped
4. Opening card effects are applied immediately:
   - **Skip**: You (the first player) are skipped
   - **Reverse**: Direction flips from counter-clockwise to clockwise
   - **Draw Two**: You draw 2 extra cards (starting with 9)
   - **Wild**: A random color is chosen

## Turn Direction

- The default turn direction is **counter-clockwise**: You -> CPU East -> CPU North -> CPU West
- A **Reverse** card flips the direction to clockwise: You -> CPU West -> CPU North -> CPU East
- The current direction is shown by an arrow on the game board connecting the current player to the next

## Playing a Card

On your turn, you may play a card from your hand if it matches the top card of the discard pile by:

- **Color** - Same color as the top card (or the chosen color if the top card is a wild)
- **Value** - Same number or same action type (e.g., Skip on Skip)
- **Wild** - Wild and Wild Draw Four can be played on anything

Playable cards are highlighted on your turn. Click a playable card to play it. If you play a Wild or Wild Draw Four, you'll be prompted to choose a color.

## Drawing a Card

If you have no playable cards (or choose not to play), click the draw pile to draw one card:

- If the drawn card is playable, it stays in your hand for you to play (marked with a star)
- If the drawn card is not playable, your turn is automatically passed
- Cards drawn this turn are marked with a **star** so you can tell them apart from your dealt hand

## Card Effects

| Card | Effect |
|------|--------|
| **Skip** | The next player loses their turn |
| **Reverse** | Turn direction flips (clockwise <-> counter-clockwise) |
| **Draw Two (+2)** | Next player immediately receives 2 cards from the draw pile, then takes their normal turn |
| **Wild** | You choose the color that the next player must match |
| **Wild Draw Four (+4)** | Next player immediately receives 4 cards, you choose the color, then they take their normal turn |

Note: Draw penalties are dealt automatically. The receiving player does **not** lose their turn - they draw the cards and then play normally.

## Calling UNO

The UNO button is always visible during play. You must press it **before** playing your second-to-last card. If you play down to 0 cards without having called UNO, you draw 2 penalty cards instead of winning.

AI players call UNO automatically when they have 2 cards.

## Winning

The first player to play all their cards wins the game (provided they called UNO). A game over screen appears with the option to play again.

## Recent Plays

The last 4 cards played are shown above the draw and discard piles, along with the name of the player who played each one.

## Hand Management

You can **drag and drop** cards in your hand to rearrange them.

## Deck Exhaustion

If the draw pile runs out, all cards from the discard pile (except the top card) are shuffled to form a new draw pile. Any chosen colors on wild cards are cleared.

## No Stacking

Draw Two and Wild Draw Four cards **cannot** be stacked. When a +2 or +4 is played against you, you receive the cards immediately with no option to counter with your own +2 or +4.

## AI Behavior

The 3 AI opponents play with a simple strategy:

- They prioritize **Draw Two** (highest), then **Skip**, then **high number cards**, then **Reverse**
- They save **Wild** and **Wild Draw Four** cards for last (lowest priority)
- When choosing a color for wilds, they pick the color they hold the most of
- If they have no playable card, they draw and immediately play the drawn card if possible
- AI turns are delayed 0.8-1.5 seconds to feel more natural
