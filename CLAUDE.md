# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Card Royale (formerly UNO Royale; renamed for App Store Guideline 4.1 compliance — the call-out is "ONE!", card backs show ♛) — a Vue 3 + TypeScript card-shedding game with 1–3 AI opponents, wrapped as an iOS app via Capacitor. Two modes: a heads-up ranked trophy ladder and a casual 2–4 player table. Fully offline-capable with bundled assets. Internal identifiers (sayUno, uno-btn, bundle id dev.u9g.unoroyale) intentionally keep the old name.

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

All game logic lives here as **pure, immutable functions** — every function returns a new state object, never mutates. Uses a Result pattern: `{ ok: true; state } | { ok: false; error }`. Modules: `game.ts` (state transitions), `gameState.ts` (GameState interface), `rules.ts` (playability), `card.ts` (card types via discriminated unions), `deck.ts` (deck ops), `ai.ts` (AI strategy and full AI turns), `skill.ts` (difficulty levers), `player.ts` (player utilities), `rng.ts` (injectable randomness), `selfPlay.ts` (headless AI-vs-AI matches).

Randomness is injected: every function that shuffles or rolls takes an `Rng` defaulting to `Math.random`, so `skill.test.ts` can replay thousands of seeded matches and assert that higher skill wins more.

### Ranked (`src/ranked.ts`)

Trophies, arenas, and the trophy→skill curve. The profile persists through Capacitor Preferences under `ranked_profile`; `version` exists so the profile can be migrated if trophies ever move server-side.

### UI Layer

- `App.vue` — root component, manages phases: lobby → playing → game_over
- `gameController.ts` — Composition API composable wrapping engine with Vue `ref()` reactivity
- `GameBoard.vue` — main game view containing AI hands, discard pile, player hand, color chooser
- Player actions flow: Vue component → gameController → engine pure functions → new state → Vue reactivity re-renders

### Data Flow

Player actions call gameController methods → engine computes new immutable state → Vue ref triggers reactivity → components re-render. localStorage persists player name and instant-CPU-mode preference.

## Screenshot Automation

`scripts/take-screenshots.mjs` uses Playwright to inject crafted game states and capture App Store screenshots at iPhone, iPad, and desktop resolutions. Screenshots auto-commit via the pre-commit hook.
