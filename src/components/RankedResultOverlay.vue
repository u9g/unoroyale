<script setup lang="ts">
import type { RankedResult } from '../ranked'
import { arenaFor } from '../ranked'

const props = defineProps<{
  result: RankedResult
  won: boolean
}>()

const emit = defineEmits<{
  playAgain: []
  mainMenu: []
}>()

const arena = arenaFor(props.result.profile.trophies)
</script>

<template>
  <div class="modal-overlay">
    <div class="ranked-result" :style="{ '--arena-accent': arena.accent }">
      <h2 class="ranked-result__title">{{ won ? 'Victory!' : 'Defeat' }}</h2>

      <p class="ranked-result__delta" :class="won ? 'ranked-result__delta--up' : 'ranked-result__delta--down'">
        {{ result.delta >= 0 ? '+' : '' }}{{ result.delta }} ♛
      </p>

      <p class="ranked-result__total">{{ result.profile.trophies }} trophies — {{ arena.name }}</p>

      <p v-if="result.promoted" class="ranked-result__promo">Promoted to {{ result.promoted.name }}!</p>
      <p v-else-if="result.delta === 0 && !won" class="ranked-result__promo">
        Arena floor held — no trophies lost.
      </p>

      <button class="btn-play-again" @click="emit('playAgain')">Next Match</button>
      <button class="ranked-result__menu" @click="emit('mainMenu')">Main Menu</button>
    </div>
  </div>
</template>
