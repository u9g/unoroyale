#!/usr/bin/env node
// Run JS on the phone pinned to a debug bundle: scripts/dbg.mjs '<js>' (or pipe it on stdin).
// Needs `git config unoroyale.deviceId` and `git config unoroyale.debugKey`.
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const WS_URL = 'wss://uno-stats.aibotted849.workers.dev/debug/ws';
const TIMEOUT_MS = 30_000;

const cfg = (key) => execSync(`git config ${key}`, { encoding: 'utf8' }).trim();
const code = process.argv[2] ?? readFileSync(0, 'utf8');
const query = new URLSearchParams({
  role: 'cli',
  device_id: cfg('unoroyale.deviceId'),
  key: cfg('unoroyale.debugKey'),
});

const ws = new WebSocket(`${WS_URL}?${query}`);
const timer = setTimeout(() => {
  console.error(`no answer in ${TIMEOUT_MS / 1000}s — is the app open on the pinned bundle?`);
  process.exit(1);
}, TIMEOUT_MS);

ws.onopen = () => ws.send(JSON.stringify({ id: 1, code }));
ws.onmessage = (event) => {
  clearTimeout(timer);
  console.log(JSON.parse(event.data).result);
  ws.close();
};
ws.onerror = (err) => {
  console.error(`relay error: ${err.message ?? err.type}`);
  process.exit(1);
};
