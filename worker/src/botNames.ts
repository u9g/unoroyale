// Bot opponents get names from here rather than the app's CSV, so the engine
// carries no app assets into the Worker bundle
export const BOT_NAMES = [
  'Ada', 'Bruno', 'Cleo', 'Dario', 'Elsie', 'Fox', 'Greta', 'Hugo',
  'Imani', 'Jules', 'Kit', 'Lena', 'Milo', 'Nadia', 'Otto', 'Pia',
  'Quinn', 'Rosa', 'Sable', 'Theo', 'Uma', 'Vero', 'Wren', 'Zane',
]

export function botName(rng: () => number): string {
  return BOT_NAMES[Math.floor(rng() * BOT_NAMES.length)]
}
