<script setup lang="ts">
defineProps<{
  placements: string[]
}>()

const emit = defineEmits<{
  playAgain: []
}>()
</script>

<template>
  <div class="modal-overlay">
    <div class="game-over">
      <h2 class="game-over__title">{{ placements[0] }} wins!</h2>
      <ol class="game-over__placements">
        <li v-for="name in placements" :key="name">{{ name }}</li>
      </ol>
      <button class="btn-play-again" @click="emit('playAgain')">Play Again</button>
    </div>
  </div>
</template>
