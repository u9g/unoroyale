# Card Royale - Game Rules

## Overview

Card Royale is a 2- to 4-player card game: you against 1–3 AI opponents with random names, seated across from you (2 players), to your left and right (3 players), or at West, North, and East (4 players). The goal is to be the first player to empty your hand.

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
  - **Wild +4** (4 total) - Next player draws 4 cards, then takes their turn; you choose the next color

## Setup

1. Each player is dealt 7 cards
2. One card is flipped from the draw pile to start the discard pile
3. If the opening card is a **Wild +4**, it is shuffled back and a new card is flipped
4. Opening card effects are applied immediately:
   - **Skip**: You (the first player) are skipped
   - **Reverse**: Direction flips from counter-clockwise to clockwise
   - **Draw Two**: You draw 2 extra cards (starting with 9)
   - **Wild**: A random color is chosen

## Turn Direction

- The default turn direction is **counter-clockwise**: You -> East -> North -> West
- A **Reverse** card flips the direction to clockwise: You -> West -> North -> East
- The current direction is shown by an arrow on the game board connecting the current player to the next

## Playing a Card

On your turn, you may play a card from your hand if it matches the top card of the discard pile by:

- **Color** - Same color as the top card (or the chosen color if the top card is a wild)
- **Value** - Same number or same action type (e.g., Skip on Skip)
- **Wild** - Wild and Wild +4 can be played on anything

Playable cards are highlighted on your turn. Click a playable card to play it. If you play a Wild or Wild +4, you'll be prompted to choose a color.

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
| **Wild +4** | Next player immediately receives 4 cards, you choose the color, then they take their normal turn |

Note: Draw penalties are dealt automatically. The receiving player does **not** lose their turn - they draw the cards and then play normally.

## Ranked Mode

Ranked is a one-on-one ladder through six rooms, played on the server — it needs
a connection, and your trophies are held there rather than on your phone. Casual
works offline, always. Every match is you against a single opponent, and every result moves your trophy count:

- **Win: +30 trophies. Loss: -30 trophies.**
- Trophies can never fall below the floor of the room you have reached, so a losing streak cannot demote you out of a room.
- Quitting or restarting a ranked match in progress counts as a loss.
- The more trophies you hold, the sharper your opponents play — see AI Behavior below.

| Room | Trophies |
|-------|----------|
| The Parlour | 0 |
| Velvet Room | 300 |
| Gilded Hall | 600 |
| Crown Court | 900 |
| Royal Vault | 1200 |
| Sovereign's Table | 1500 |

Your **ranked name** is chosen once, the first time you play a ranked match, and is bound to your install. Ranked names are 3-30 letters, numbers or underscores, and are unique — a name another player already holds is refused while you pick another. There is no rename: it is the name real opponents will see. If the name cannot be registered — no connection, say — the match still starts and the name is claimed the next time you play.

Casual mode is unranked, leaves your trophies alone, uses whatever name you type, and is where 3- and 4-player tables live.

## Calling ONE

The ONE button is always visible during play. You must press it **before** playing your second-to-last card. If you play down to 0 cards without having called ONE, you draw 2 penalty cards instead of winning.

AI players call ONE when they have 2 cards — though weaker opponents forget, and take the penalty for it.

## Winning

The first player to play all their cards wins the game (provided they called ONE). If you win with a Wild or Wild +4, the color chooser is skipped automatically. A game over screen appears with the option to play again.

## Recent Plays

The Card Play History above the draw and discard piles shows the last 4 cards played.

## Hand Management

You can **drag and drop** cards in your hand to rearrange them.

## Deck Exhaustion

If the draw pile runs out, all cards from the discard pile (except the top card) are shuffled to form a new draw pile. Any chosen colors on wild cards are cleared.

## No Stacking

Draw Two and Wild +4 cards **cannot** be stacked. When a +2 or +4 is played against you, you receive the cards immediately with no option to counter with your own +2 or +4.

## AI Behavior

Every opponent has a skill rating. Casual games use a middling one; in Ranked it rises with your trophy count, so the ladder gets harder as you climb.

A **sharp** opponent:

- Plays **Draw Two**, **Skip** and (heads-up) **Reverse** on sight, for the extra turn they buy
- Dumps cards from the colors it holds least of, keeping the rest of its hand chainable
- Holds **Wild** and **Wild +4** until it is stuck, or until you are one card from going out
- Picks the color it holds the most of, steering away from colors you have just played
- Never forgets to call ONE

A **careless** opponent plays a random legal card roughly a third of the time, burns wilds the moment it can, picks colors at random, and often forgets to call ONE.

AI turns are delayed 0.8-1.5 seconds to feel more natural.
