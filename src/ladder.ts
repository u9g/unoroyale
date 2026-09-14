// Pure ladder data and maths — no Vue, no Capacitor, no fetch. The match server
// imports this too, so trophies are computed identically on both sides.
const WIN_TROPHIES = 30
const LOSS_TROPHIES = -30

export interface RankedProfile {
  trophies: number
  best: number
  wins: number
  losses: number
  /** Bumped if the shape changes, and when trophies move server-side */
  version: 1
}

/** The look of a room's result card; applied as CSS custom properties. */
export interface RoomCard {
  face: string
  frame: string
  motif: string
  motifAlpha: string
  oval: string
  ink: string
  fg: string
  /** Win/loss deltas, overridden where the face is too light for the defaults */
  good?: string
  bad?: string
  /** A light sweep across the face, saved for the last room */
  sheen?: boolean
}

export interface Room {
  name: string
  /** Trophies needed to reach the room, and the floor a loss cannot drop you below */
  min: number
  accent: string
  card: RoomCard
}

export const ROOMS: Room[] = [
  {
    name: 'The Parlour', min: 0, accent: '#8fbf7a',
    card: {
      face: 'linear-gradient(160deg, #1d6b38, #0f3d20)',
      frame: '#fff',
      motif: 'repeating-linear-gradient(45deg, rgb(255 255 255 / 50%) 0 1px, transparent 1px 9px)',
      motifAlpha: '0.10',
      oval: 'rgb(255 255 255 / 16%)',
      ink: '#f2e9c9',
      fg: '#fff',
    },
  },
  {
    name: 'Velvet Room', min: 300, accent: '#b06ac4',
    card: {
      face: 'radial-gradient(ellipse at 50% 28%, #7a3a92 0%, #4b1f5e 55%, #2c0f3a 100%)',
      frame: 'linear-gradient(160deg, #f3e6f7, #c9a6d6)',
      motif: 'radial-gradient(circle at 50% 50%, rgb(255 255 255 / 55%) 1px, transparent 1.6px) 0 0 / 14px 14px',
      motifAlpha: '0.18',
      oval: 'rgb(255 255 255 / 20%)',
      ink: '#e9c6f5',
      fg: '#fff',
    },
  },
  {
    name: 'Gilded Hall', min: 600, accent: '#e0b44a',
    card: {
      face: 'linear-gradient(160deg, #1b1710, #0b0906)',
      frame: 'linear-gradient(140deg, #f6e3a1 0%, #e0b44a 30%, #8a6a20 55%, #e0b44a 80%, #f6e3a1 100%)',
      motif: 'repeating-conic-gradient(from 45deg, rgb(224 180 74 / 60%) 0deg 4deg, transparent 4deg 12deg)',
      motifAlpha: '0.12',
      oval: 'rgb(224 180 74 / 35%)',
      ink: '#e0b44a',
      fg: '#f6eddc',
    },
  },
  {
    name: 'Crown Court', min: 900, accent: '#5aa9e6',
    card: {
      face: 'linear-gradient(160deg, #1e3f7a, #0c1c3e)',
      frame: 'linear-gradient(160deg, #fff, #b9c6d8)',
      motif: 'repeating-linear-gradient(60deg, rgb(255 255 255 / 50%) 0 2px, transparent 2px 14px)',
      motifAlpha: '0.14',
      oval: 'rgb(255 255 255 / 22%)',
      ink: '#cfe0ff',
      fg: '#fff',
    },
  },
  {
    name: 'Royal Vault', min: 1200, accent: '#e2744a',
    card: {
      face: 'linear-gradient(160deg, #4a1220, #1a0a10)',
      frame: 'linear-gradient(140deg, #cfd6dd 0%, #7d8894 40%, #40484f 60%, #a9b3bd 100%)',
      motif: 'repeating-radial-gradient(circle at 50% 50%, rgb(226 116 74 / 70%) 0 1px, transparent 1px 10px)',
      motifAlpha: '0.20',
      oval: 'rgb(226 116 74 / 30%)',
      ink: '#e2744a',
      fg: '#f7e9e4',
    },
  },
  {
    name: "Sovereign's Table", min: 1500, accent: '#f2f0e6',
    card: {
      face: 'linear-gradient(160deg, #fdfbf3, #e7dfc9)',
      frame: 'linear-gradient(140deg, #fff6cf 0%, #e0b44a 35%, #9a7524 55%, #e0b44a 75%, #fff6cf 100%)',
      motif: 'repeating-conic-gradient(from 0deg, rgb(154 117 36 / 70%) 0deg 2deg, transparent 2deg 9deg)',
      motifAlpha: '0.16',
      oval: 'rgb(154 117 36 / 35%)',
      ink: '#9a7524',
      fg: '#241d0c',
      good: '#1f7a34',
      bad: '#b3261e',
      sheen: true,
    },
  },
]

export const emptyProfile = (): RankedProfile => ({
  trophies: 0,
  best: 0,
  wins: 0,
  losses: 0,
  version: 1,
})

export function roomFor(trophies: number): Room {
  return ROOMS.reduce((best, room) => (trophies >= room.min ? room : best), ROOMS[0])
}

/** The room's card tokens, ready to spread onto an element's style. */
export function cardVars(room: Room): Record<string, string> {
  return {
    '--card-face': room.card.face,
    '--card-frame': room.card.frame,
    '--card-motif': room.card.motif,
    '--card-motif-alpha': room.card.motifAlpha,
    '--card-oval': room.card.oval,
    '--card-ink': room.card.ink,
    '--card-fg': room.card.fg,
    '--card-good': room.card.good ?? '#7ddc8a',
    '--card-bad': room.card.bad ?? '#e58a8a',
  }
}

/** Opponent strength rises with the ladder; see engine/skill.ts for what it changes. */
export function skillForTrophies(trophies: number): number {
  return Math.max(0.15, Math.min(1, 0.15 + (trophies / 1500) * 0.85))
}

export interface RankedResult {
  profile: RankedProfile
  delta: number
  promoted: Room | null
  /** The loss was cushioned by the room floor */
  floored: boolean
}

export function applyResult(current: RankedProfile, won: boolean): RankedResult {
  const floor = roomFor(current.trophies).min
  const raw = current.trophies + (won ? WIN_TROPHIES : LOSS_TROPHIES)
  const trophies = Math.max(floor, raw)
  const before = roomFor(current.trophies)
  const after = roomFor(trophies)

  return {
    profile: {
      ...current,
      trophies,
      best: Math.max(current.best, trophies),
      wins: current.wins + (won ? 1 : 0),
      losses: current.losses + (won ? 0 : 1),
    },
    delta: trophies - current.trophies,
    promoted: after.min > before.min ? after : null,
    floored: raw < trophies,
  }
}
