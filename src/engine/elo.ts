// Hidden matchmaking rating. Trophies stay the visible ladder; this is what
// decides who (or which bot) you face. See src/ranked.ts for trophies.

export const START_RATING = 1000

/** Chance `rating` beats `opponent`, on the standard 400-point logistic curve. */
export function expectedScore(rating: number, opponent: number): number {
  return 1 / (1 + 10 ** ((opponent - rating) / 400))
}

/**
 * K falls as a player's history grows: the first matches should move the rating
 * a long way, a settled player's should barely budge.
 */
export function kFactor(matchesPlayed: number): number {
  if (matchesPlayed < 10) return 64
  if (matchesPlayed < 30) return 32
  return 16
}

export function nextRating(
  rating: number,
  opponent: number,
  won: boolean,
  matchesPlayed: number
): number {
  const k = kFactor(matchesPlayed)
  const delta = k * ((won ? 1 : 0) - expectedScore(rating, opponent))
  return Math.round(rating + delta)
}

/** Bot strength for an unmatched player, on the 0..1 scale engine/skill.ts takes. */
export function skillForRating(rating: number): number {
  return Math.max(0.15, Math.min(1, 0.15 + ((rating - 800) / 900) * 0.85))
}
