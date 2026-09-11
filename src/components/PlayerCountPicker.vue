<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: number
  min: number
  max: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const values = computed(() => Array.from({ length: props.max - props.min + 1 }, (_, i) => props.min + i))
const selectedIndex = computed(() => props.modelValue - props.min)

function onKeyDown(e: KeyboardEvent) {
  const step = e.key === 'ArrowRight' || e.key === 'ArrowUp' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowDown' ? -1 : 0
  if (!step) return
  e.preventDefault()
  emit('update:modelValue', Math.max(props.min, Math.min(props.max, props.modelValue + step)))
}
</script>

<template>
  <div
    class="segmented"
    role="radiogroup"
    :style="{ '--count': values.length, '--selected': selectedIndex }"
    @keydown="onKeyDown"
  >
    <span class="segmented__thumb" aria-hidden="true" />
    <button
      v-for="value in values"
      :key="value"
      type="button"
      role="radio"
      class="segmented__option"
      :class="{ 'segmented__option--selected': value === modelValue }"
      :aria-checked="value === modelValue"
      :tabindex="value === modelValue ? 0 : -1"
      @click="emit('update:modelValue', value)"
    >
      {{ value }}
    </button>
  </div>
</template>
