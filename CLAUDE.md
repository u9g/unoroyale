# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

UNO Royale — a Vue 3 + TypeScript UNO card game with 3 AI opponents, wrapped as an iOS app via Capacitor. Fully offline-capable with bundled assets.

## Commands

```bash
npm run dev              # Vite dev server
npm run build            # Type-check (vue-tsc) + production build
npm run lint             # ESLint
npm run lint:css         # Stylelint on src/**/*.css
npx vitest run           # Run all tests once
npx vitest run src/engine/game.test.ts  # Run a single test file
npx vitest watch         # Watch mode
npm run deploy           # Build + sync + install on connected iPhone
npm run cap:sync         # Build + sync to iOS Capacitor project
npm run cap:open         # Open iOS project in Xcode
```

## Architecture

**Two-layer design:** Pure TypeScript game engine (`src/engine/`) + Vue 3 UI layer (`src/components/` + `src/gameController.ts`).

### Engine (`src/engine/`)

All game logic lives here as **pure, immutable functions** — every function returns a new state object, never mutates. Uses a Result pattern: `{ ok: true; state } | { ok: false; error }`. Modules: `game.ts` (state transitions), `gameState.ts` (GameState interface), `rules.ts` (playability), `card.ts` (card types via discriminated unions), `deck.ts` (deck ops), `ai.ts` (AI strategy), `player.ts` (player utilities).

### UI Layer

- `App.vue` — root component, manages phases: lobby → playing → game_over
- `gameController.ts` — Composition API composable wrapping engine with Vue `ref()` reactivity
- `GameBoard.vue` — main game view containing AI hands, discard pile, player hand, color chooser
- Player actions flow: Vue component → gameController → engine pure functions → new state → Vue reactivity re-renders

### Data Flow

Player actions call gameController methods → engine computes new immutable state → Vue ref triggers reactivity → components re-render. localStorage persists player name and instant-CPU-mode preference.

## Screenshot Automation

`scripts/take-screenshots.mjs` uses Playwright to inject crafted game states and capture App Store screenshots at iPhone, iPad, and desktop resolutions. Screenshots auto-commit via the pre-commit hook.
