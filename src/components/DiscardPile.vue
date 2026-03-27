<script setup lang="ts">
import type { Card, Color } from '../engine/card'
import { displayColor, displayValue, isWild } from '../engine/card'

const props = defineProps<{
  card: Card
}>()

function colorClass(color: Color | null, wild: boolean): string {
  if (color === 'red') return 'card--red'
  if (color === 'blue') return 'card--blue'
  if (color === 'green') return 'card--green'
  if (color === 'yellow') return 'card--yellow'
  if (wild) return 'card--wild'
  return 'card--wild'
}
</script>

<template>
  <div :class="['card', 'card--large', colorClass(displayColor(card), isWild(card))]">
    <span class="card__corner card__corner--top">{{ displayValue(card) }}</span>
    <span class="card__center card__center--large">{{ displayValue(card) }}</span>
    <span class="card__corner card__corner--bottom">{{ displayValue(card) }}</span>
    <div class="card__oval"></div>
  </div>
</template>
