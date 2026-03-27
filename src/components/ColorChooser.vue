<script setup lang="ts">
import type { Color } from '../engine/card'

defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  choose: [color: Color]
  cancel: []
}>()
</script>

<template>
  <div v-if="visible" class="modal-overlay" @click="emit('cancel')">
    <div class="color-chooser" @click.stop>
      <h3 class="color-chooser__title">Choose a color</h3>
      <div class="color-chooser__grid">
        <button class="color-btn color-btn--red" @click="emit('choose', 'red')"></button>
        <button class="color-btn color-btn--blue" @click="emit('choose', 'blue')"></button>
        <button class="color-btn color-btn--green" @click="emit('choose', 'green')"></button>
        <button class="color-btn color-btn--yellow" @click="emit('choose', 'yellow')"></button>
      </div>
    </div>
  </div>
</template>
