<script setup lang="ts">
defineProps<{
  winnerName: string
}>()

const emit = defineEmits<{
  playAgain: []
}>()
</script>

<template>
  <div class="modal-overlay">
    <div class="game-over">
      <h2 class="game-over__title">{{ winnerName }} wins!</h2>
      <button class="btn-play-again" @click="emit('playAgain')">Play Again</button>
    </div>
  </div>
</template>
