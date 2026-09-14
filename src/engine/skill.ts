// Difficulty is expressed as a single 0..1 knob; every lever below degrades a
// sharp policy rather than adding cleverness to a careless one.
export interface AiProfile {
  /** chance of ignoring the best play and picking a random legal card */
  blunder: number
  /** pick the colour the hand actually wants, rather than a random one */
  smartColor: boolean
  /** never burn a wild while a coloured play exists */
  holdWilds: boolean
  /** save attack cards until the next player is nearly out */
  aggressive: boolean
  /** chance of remembering to call ONE! on the second-to-last card */
  callsOne: number
  /** steer wild colours away from what opponents just played */
  readsOpponents: boolean
}

export const DEFAULT_SKILL = 0.6

export function profileForSkill(skill: number): AiProfile {
  const s = Math.max(0, Math.min(1, skill))
  return {
    blunder: 0.35 * (1 - s),
    smartColor: s >= 0.25,
    holdWilds: s >= 0.5,
    aggressive: s >= 0.65,
    callsOne: 0.6 + 0.4 * s,
    readsOpponents: s >= 0.8,
  }
}
