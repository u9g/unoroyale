<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: number
  options: number[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const selectedIndex = computed(() => props.options.indexOf(props.modelValue))

function onKeyDown(e: KeyboardEvent) {
  const step = e.key === 'ArrowRight' || e.key === 'ArrowUp' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowDown' ? -1 : 0
  if (!step) return
  e.preventDefault()
  const next = props.options[Math.max(0, Math.min(props.options.length - 1, selectedIndex.value + step))]
  emit('update:modelValue', next)
}
</script>

<template>
  <div
    class="segmented"
    role="radiogroup"
    :style="{ '--count': options.length, '--selected': selectedIndex }"
    @keydown="onKeyDown"
  >
    <span class="segmented__thumb" aria-hidden="true" />
    <button
      v-for="value in options"
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
