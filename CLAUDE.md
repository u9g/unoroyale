# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Card Royale (formerly UNO Royale; renamed for App Store Guideline 4.1 compliance — the call-out is "ONE!", card backs show ♛) — a Vue 3 + TypeScript card-shedding game with 1–3 AI opponents, wrapped as an iOS app via Capacitor. Fully offline-capable with bundled assets. Internal identifiers (sayUno, uno-btn, bundle id dev.u9g.unoroyale) intentionally keep the old name.

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

## Trying a Branch on One Phone

`npm run ota:try` pushes HEAD to the `ota-try` branch, waits for CI to publish its bundle, and pins the device in `git config unoroyale.deviceId` to it in uno-stats. `npm run ota:try -- off` unpins and the phone follows `main` again. The lobby shows an `OTA <sha>` chip on that device, linked to the commit, so you can confirm which bundle actually took.

## Remote Debugging

A pinned phone can be driven from the CLI with no cable. uno-stats exposes `/debug/ws`, a `DebugRelay` durable object that pipes messages between the phone and a CLI socket authenticated with `DEBUG_KEY`.

The client lives on the `debug-bridge` branch and **never merges to main**: it evals arbitrary JS off the socket, which is a guideline 2.5.2 risk in an App Store build. Kept as a branch, it only ever reaches the one pinned phone.

```bash
cd ~/code/unoroyale-debug && git rebase origin/main && npm run ota:try
node scripts/dbg.mjs 'return document.title'   # after opening the app
```

The app must be in the foreground — iOS suspends the webview on background, killing the socket, and the client reconnects 3s after any close.

Two things measured this way that are easy to misread as app bugs: iOS Low Power Mode pins the webview to a hard 30Hz the web layer cannot opt out of, and `animateDeal` transitions `left`/`top`/`width`/`height`, so the deal costs layout and paint on every frame.
