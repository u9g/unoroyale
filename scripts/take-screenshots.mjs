#!/usr/bin/env node

/**
 * App Store Screenshot Generator
 *
 * Launches the Vite dev server, opens the webapp in Playwright at each
 * required App Store device size, injects crafted game states for various
 * scenarios, and saves pixel-perfect screenshots.
 *
 * Usage:  node scripts/take-screenshots.mjs
 *         npm run screenshots
 */

import { chromium } from 'playwright';
import { createServer } from 'vite';
import { mkdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUTPUT = path.join(ROOT, 'screenshots');

const PORT = 5178;
const URL = `http://localhost:${PORT}`;
const PLAYER_NAME = 'Jason';

// ---------------------------------------------------------------------------
// Screenshot sizes (CSS pixels + deviceScaleFactor)
// Output pixel dimensions = width * dpr  x  height * dpr
// ---------------------------------------------------------------------------
const DEVICES = [
  { name: 'iPhone',           w: 414,  h: 896,  dpr: 3, mobile: true  }, // 1242x2688  (iPhone XS Max / 6.5")
  { name: 'iPhone-Landscape', w: 896,  h: 414,  dpr: 3, mobile: true  }, // 2688x1242  (iPhone XS Max / 6.5" landscape)
  { name: 'iPad',             w: 1032, h: 1376, dpr: 2, mobile: false }, // 2064x2752  (iPad Pro 13")
  { name: 'iPad-Landscape',   w: 1376, h: 1032, dpr: 2, mobile: false }, // 2752x2064  (iPad Pro 13" landscape)
  { name: 'Desktop',          w: 1440, h: 900,  dpr: 2, mobile: false }, // 2880x1800  (MacBook-style)
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Create N dummy cards (face-down for AI hands — values don't matter). */
function dummyCards(n) {
  const colors = ['red', 'blue', 'green', 'yellow'];
  return Array.from({ length: n }, (_, i) => ({
    color: colors[i % 4],
    value: i % 10,
  }));
}

/** A large draw pile so the table looks full. */
function drawPile() {
  return dummyCards(60);
}

/** Disable all CSS transitions & animations for clean screenshots. */
async function disableAnimations(page) {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        transition: none !important;
        animation: none !important;
        animation-duration: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
        animation-delay: 0s !important;
      }
    `,
  });
}

/** Load the app once and disable animations. Call once per page. */
async function loadApp(page) {
  await page.goto(URL);
  await page.waitForSelector('.lobby__input');
  await disableAnimations(page);
}

/** Inject a crafted GameState on an already-loaded page. */
async function injectState(page, state, opts = {}) {
  await page.evaluate(({ state, choosingColor, gameOver }) => {
    const app = window.__app;
    if (!app) throw new Error('window.__app not found — is the dev server running?');

    app.isNewGame.value = false;
    app.choosingColor.value = !!choosingColor;
    app.controller.gameState.value = state;
    app.controller.phase.value = gameOver ? 'game_over' : 'playing';
  }, {
    state,
    choosingColor: opts.choosingColor || false,
    gameOver: opts.gameOver || false,
  });

  await page.waitForFunction(({ gameOver, choosingColor, topValue, topColor }) => {
    const app = window.__app;
    if (!app) return false;

    const targetPhase = gameOver ? 'game_over' : 'playing';
    if (app.controller.phase.value !== targetPhase) return false;
    if (!!app.choosingColor.value !== choosingColor) return false;
    if (document.querySelectorAll('.game-table').length !== 1) return false;

    if (gameOver) {
      return document.querySelectorAll('.game-over').length === 1;
    }

    const discard = document.getElementById('discard-top');
    return !!discard &&
      discard.dataset.value === topValue &&
      discard.dataset.color === topColor;
  }, {
    gameOver: opts.gameOver || false,
    choosingColor: !!opts.choosingColor,
    topValue: String(state.discardPile[0]?.value ?? ''),
    topColor: state.discardPile[0]?.chosenColor ?? state.discardPile[0]?.color ?? '',
  }, { timeout: 10000 });

  await page.evaluate(() => new Promise(resolve =>
    requestAnimationFrame(() => requestAnimationFrame(resolve))
  ));
}

// ---------------------------------------------------------------------------
// Scenarios
// ---------------------------------------------------------------------------

const SCENARIOS = [
  {
    name: '01-gameplay',
    state: {
      players: [
        {
          id: 0, name: PLAYER_NAME, type: 'human',
          hand: [
            { color: 'red',    value: 7 },
            { color: 'blue',   value: 3 },
            { color: 'green',  value: 'skip' },
            { color: 'yellow', value: 5 },
            { color: 'red',    value: 'draw_two' },
            { color: 'blue',   value: 9 },
            { color: null,     value: 'wild' },
          ],
          saidUno: false,
        },
        { id: 1, name: 'Sofia',  type: 'ai', hand: dummyCards(5), saidUno: false },
        { id: 2, name: 'Marcus', type: 'ai', hand: dummyCards(3), saidUno: false },
        { id: 3, name: 'Luna',   type: 'ai', hand: dummyCards(8), saidUno: false },
      ],
      drawPile: drawPile(),
      discardPile: [{ color: 'red', value: 4 }],
      currentPlayer: 0,
      direction: 'clockwise',
      phase: 'playing',
      winner: null,
      lastAction: 'Sofia played Red 4',
      recentPlays: [
        ['Sofia',      { color: 'red',  value: 4 }],
        ['Marcus',     { color: 'red',  value: 'reverse', reverseTo: 'clockwise' }],
        ['Luna',       { color: 'blue', value: 'reverse', reverseTo: 'counter_clockwise' }],
        [PLAYER_NAME,  { color: 'blue', value: 6 }],
      ],
    },
  },
  {
    name: '02-color-chooser',
    opts: { choosingColor: true },
    state: {
      players: [
        {
          id: 0, name: PLAYER_NAME, type: 'human',
          hand: [
            { color: 'yellow', value: 2 },
            { color: 'green',  value: 7 },
            { color: 'red',    value: 'skip' },
            { color: 'blue',   value: 1 },
            { color: null,     value: 'wild_draw_four' },
          ],
          saidUno: false,
        },
        { id: 1, name: 'Sofia',  type: 'ai', hand: dummyCards(6), saidUno: false },
        { id: 2, name: 'Marcus', type: 'ai', hand: dummyCards(4), saidUno: false },
        { id: 3, name: 'Luna',   type: 'ai', hand: dummyCards(7), saidUno: false },
      ],
      drawPile: drawPile(),
      discardPile: [{ color: 'green', value: 8 }],
      currentPlayer: 0,
      direction: 'counter_clockwise',
      phase: 'playing',
      winner: null,
      lastAction: 'Marcus played Green 8',
      recentPlays: [
        ['Marcus', { color: 'green', value: 8 }],
        ['Sofia',  { color: 'green', value: 3 }],
      ],
    },
  },
  {
    name: '03-victory',
    opts: { gameOver: true },
    state: {
      players: [
        {
          id: 0, name: PLAYER_NAME, type: 'human',
          hand: [],
          saidUno: true,
        },
        { id: 1, name: 'Sofia',  type: 'ai', hand: dummyCards(4), saidUno: false },
        { id: 2, name: 'Marcus', type: 'ai', hand: dummyCards(7), saidUno: false },
        { id: 3, name: 'Luna',   type: 'ai', hand: dummyCards(2), saidUno: false },
      ],
      drawPile: drawPile(),
      discardPile: [{ color: 'blue', value: 3 }],
      currentPlayer: 0,
      direction: 'clockwise',
      phase: 'game_over',
      winner: 0,
      lastAction: `${PLAYER_NAME} wins!`,
      recentPlays: [
        [PLAYER_NAME, { color: 'blue', value: 3 }],
        ['Luna',      { color: 'blue', value: 7 }],
        ['Marcus',    { color: 'green', value: 7 }],
      ],
    },
  },
];

// ---------------------------------------------------------------------------
// Tutorial steps
// ---------------------------------------------------------------------------

const TUTORIAL_STEPS = [
  { name: '04-tutorial-1-the-goal',         step: 0 },
  { name: '05-tutorial-2-matching-cards',    step: 1 },
  { name: '06-tutorial-3-drawing-cards',     step: 2 },
  { name: '07-tutorial-4-action-cards',      step: 3 },
  { name: '08-tutorial-5-wild-cards',        step: 4 },
  { name: '09-tutorial-6-choosing-a-color',  step: 5 },
  { name: '10-tutorial-7-calling-uno',       step: 6 },
  { name: '11-tutorial-8-youre-ready',       step: 7 },
];

/** Open tutorial and advance to the given step index. */
async function openTutorialStep(page, stepIndex) {
  // Open tutorial
  await page.evaluate(() => {
    const app = window.__app;
    if (!app) throw new Error('window.__app not found');
    app.showTutorial.value = true;
  });

  await page.waitForSelector('.tutorial');

  // Click Next to reach the desired step
  for (let i = 0; i < stepIndex; i++) {
    await page.click('.tutorial__btn--next');
  }

  // Wait for transition to settle
  await page.evaluate(() => new Promise(resolve =>
    requestAnimationFrame(() => requestAnimationFrame(resolve))
  ));
}

/** Close tutorial so page is clean for next screenshot. */
async function closeTutorial(page) {
  await page.evaluate(() => {
    const app = window.__app;
    if (app) app.showTutorial.value = false;
  });
  await page.waitForSelector('.tutorial', { state: 'detached', timeout: 3000 }).catch(() => {});
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const server = await createServer({
    root: ROOT,
    server: { port: PORT, strictPort: true },
    logLevel: 'silent',
  });
  await server.listen();

  const browser = await chromium.launch();

  try {
    // One context per device; use a fresh page per scenario to avoid stale DOM carrying between shots.
    await Promise.all(DEVICES.map(async (device) => {
      const dir = path.join(OUTPUT, device.name);
      await mkdir(dir, { recursive: true });

      const context = await browser.newContext({
        viewport: { width: device.w, height: device.h },
        deviceScaleFactor: device.dpr,
        isMobile: device.mobile,
        hasTouch: true,
      });

      // Homescreen screenshot
      {
        const page = await context.newPage();
        try {
          await loadApp(page);
          await disableAnimations(page);
          await page.fill('.lobby__input', PLAYER_NAME);
          await page.screenshot({ path: path.join(dir, '00-homescreen.jpg'), type: 'jpeg', quality: 90 });
          console.log(`  ${device.name}/00-homescreen.jpg`);
        } catch (err) {
          console.error(`  ERROR ${device.name}/00-homescreen: ${err.message}`);
        } finally {
          await page.close();
        }
      }

      for (const scenario of SCENARIOS) {
        const page = await context.newPage();
        try {
          await loadApp(page);
          await injectState(page, scenario.state, scenario.opts);
          await page.screenshot({ path: path.join(dir, `${scenario.name}.jpg`), type: 'jpeg', quality: 90 });
          console.log(`  ${device.name}/${scenario.name}.jpg`);
        } catch (err) {
          console.error(`  ERROR ${device.name}/${scenario.name}: ${err.message}`);
        } finally {
          await page.close();
        }
      }

      // Tutorial screenshots — reuse a single page, navigate steps
      {
        const page = await context.newPage();
        try {
          await loadApp(page);
          await disableAnimations(page);
          for (const tutStep of TUTORIAL_STEPS) {
            await openTutorialStep(page, tutStep.step);
            await page.screenshot({ path: path.join(dir, `${tutStep.name}.jpg`), type: 'jpeg', quality: 90 });
            console.log(`  ${device.name}/${tutStep.name}.jpg`);
            await closeTutorial(page);
          }
        } catch (err) {
          console.error(`  ERROR ${device.name}/tutorial: ${err.message}`);
        } finally {
          await page.close();
        }
      }

      await context.close();
    }));

    // Google Play feature graphic (1024x500 PNG)
    {
      const context = await browser.newContext({
        viewport: { width: 1024, height: 500 },
        deviceScaleFactor: 1,
        isMobile: false,
        hasTouch: false,
      });
      const page = await context.newPage();
      try {
        await loadApp(page);
        await disableAnimations(page);
        await injectState(page, SCENARIOS[0].state, SCENARIOS[0].opts);
        await page.screenshot({ path: path.join(OUTPUT, 'feature-graphic.png'), type: 'png' });
        console.log('  feature-graphic.png');
      } catch (err) {
        console.error(`  ERROR feature-graphic: ${err.message}`);
      } finally {
        await page.close();
        await context.close();
      }
    }
  } finally {
    await browser.close();
    await server.close();
  }

  console.log(`Done! Screenshots saved to ${OUTPUT}/`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
