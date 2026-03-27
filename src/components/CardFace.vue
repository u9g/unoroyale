<script setup lang="ts">
import type { Card, Color } from '../engine/card'
import type { Direction } from '../engine/gameState'
import { displayColor, displayValue, isWild } from '../engine/card'

const props = defineProps<{
  card: Card
  index?: number
  playable?: boolean
  disabled?: boolean
  draggable?: boolean
  direction?: Direction
}>()

const emit = defineEmits<{
  play: [index: number]
}>()

function colorClass(color: Color | null, wild: boolean): string {
  if (color === 'red') return 'card--red'
  if (color === 'blue') return 'card--blue'
  if (color === 'green') return 'card--green'
  if (color === 'yellow') return 'card--yellow'
  if (wild) return 'card--wild'
  return 'card--wild'
}

function reverseIconClockwise(): boolean {
  // If card was already played, use the stamped direction
  if (props.card.reverseTo) return props.card.reverseTo === 'clockwise'
  // Card in hand: will flip to opposite of current direction
  if (props.direction) return props.direction === 'counter_clockwise'
  // Fallback
  return false
}

function handleClick() {
  if (props.playable && props.index != null) {
    emit('play', props.index)
  }
}
</script>

<template>
  <div
    :class="[
      'card',
      colorClass(displayColor(card), isWild(card)),
      playable && 'card--playable',
      disabled && 'card--disabled',
    ]"
    :draggable="draggable ? 'true' : 'false'"
    :data-card-index="index"
    @click="handleClick"
  >
    <span class="card__corner card__corner--top">{{ displayValue(card) }}</span>
    <span v-if="card.value === 'reverse'" class="card__center card__center--reverse">
      {{ reverseIconClockwise() ? '↻' : '↺' }}
    </span>
    <span v-else class="card__center">{{ displayValue(card) }}</span>
    <span class="card__corner card__corner--bottom">{{ displayValue(card) }}</span>
    <div class="card__oval"></div>
    <span v-if="card.drawn" class="card__drawn-star">&#9733;</span>
  </div>
</template>
