<script setup lang="ts">
import type { Player } from '../engine/player'
import { handSize } from '../engine/player'

const props = defineProps<{
  player: Player
  position: 'top' | 'left' | 'right'
  isCurrent: boolean
  isTarget: boolean
}>()

const count = () => handSize(props.player)
const displayCount = () => Math.min(count(), 10)
</script>

<template>
  <div :class="['ai-hand', `ai-hand--${position}`, isCurrent && 'ai-hand--active', isTarget && 'ai-hand--target']">
    <div class="ai-hand__label">
      <span class="ai-hand__name">{{ player.name }}</span>
      <span class="ai-hand__count">{{ count() }} cards</span>
      <span v-if="isTarget" class="ai-hand__target-badge">your target</span>
    </div>
    <div :class="['ai-hand__cards', `ai-hand__cards--${position}`]">
      <div
        v-for="i in displayCount()"
        :key="i"
        :class="['card', 'card--back', 'card--small', `ai-card--${position}`]"
        :style="`--card-index: ${i - 1}; --card-total: ${displayCount()};`"
      >
        <span class="card__uno-text card__uno-text--small">UNO</span>
      </div>
    </div>
  </div>
</template>
