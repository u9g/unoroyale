// Opponent names for local games; the server picks its own for online matches
import type { Rng } from './engine/rng'
import { defaultRng } from './engine/rng'
import namesCsv from './names.csv?raw'

const ALL_NAMES: string[] = namesCsv
  .trim()
  .split('\n')
  .slice(1)
  .flatMap(line => {
    const [, girl, boy] = line.split(',')
    return [girl?.trim(), boy?.trim()].filter((n): n is string => !!n)
  })

export function pickNames(exclude: string, count: number, rng: Rng = defaultRng): string[] {
  const available = ALL_NAMES.filter(n => n.toLowerCase() !== exclude.toLowerCase())
  const picked: string[] = []
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(rng() * available.length)
    picked.push(available[idx])
    available.splice(idx, 1)
  }
  return picked
}
