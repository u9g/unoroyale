export type Color = 'red' | 'blue' | 'green' | 'yellow'

export type Value =
  | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  | 'skip'
  | 'reverse'
  | 'draw_two'
  | 'wild'
  | 'wild_draw_four'

export interface Card {
  color: Color | null
  value: Value
  chosenColor?: Color | null
  drawn?: boolean
  reverseTo?: 'clockwise' | 'counter_clockwise'
}

export function isWild(card: Card): boolean {
  return card.value === 'wild' || card.value === 'wild_draw_four'
}

export function isAction(card: Card): boolean {
  return card.value === 'skip' || card.value === 'reverse' || card.value === 'draw_two'
}

export function isNumber(card: Card): boolean {
  return typeof card.value === 'number'
}

export function displayColor(card: Card): Color | null {
  if (card.chosenColor != null) return card.chosenColor
  return card.color
}

export function displayValue(card: Card): string {
  if (typeof card.value === 'number') return String(card.value)
  switch (card.value) {
    case 'skip': return 'Skip'
    case 'reverse': return 'Rev'
    case 'draw_two': return '+2'
    case 'wild': return 'Wild'
    case 'wild_draw_four': return '+4'
  }
}

export function cardToString(card: Card): string {
  const color = displayColor(card)
  const colorStr = color ? color.charAt(0).toUpperCase() + color.slice(1) : ''
  return `${colorStr} ${displayValue(card)}`.trim()
}
