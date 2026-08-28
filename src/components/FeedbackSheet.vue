<script setup lang="ts">
import { ref } from 'vue'
import { STATS_URL } from '../stats'

const emit = defineEmits<{ close: [] }>()

const message = ref('')
const email = ref('')
const state = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')

async function submit() {
  if (!message.value.trim() || state.value === 'sending') return
  if (!STATS_URL) {
    state.value = 'error'
    return
  }
  state.value = 'sending'
  try {
    const res = await fetch(`${STATS_URL}/feedback`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ message: message.value.trim(), email: email.value.trim() || undefined }),
    })
    state.value = res.ok ? 'sent' : 'error'
  } catch {
    state.value = 'error'
  }
}
</script>

<template>
  <div class="modal-overlay feedback-overlay" @click="emit('close')">
    <Transition name="feedback-slide" appear>
      <form class="feedback-sheet" @click.stop @submit.prevent="submit">
        <div class="feedback-sheet__handle" />
        <template v-if="state === 'sent'">
          <h2 class="feedback-sheet__title">Thanks!</h2>
          <p class="feedback-sheet__text">Your feedback is on its way.</p>
          <button type="button" class="feedback-sheet__btn" @click="emit('close')">Done</button>
        </template>
        <template v-else>
          <h2 class="feedback-sheet__title">Give Feedback</h2>
          <textarea
            v-model="message"
            class="feedback-sheet__input feedback-sheet__textarea"
            placeholder="What would make the game better?"
            rows="4"
            maxlength="5000"
            required
          />
          <input
            v-model="email"
            type="email"
            class="feedback-sheet__input"
            placeholder="Email (optional, if you'd like a reply)"
            autocomplete="email"
          />
          <p v-if="state === 'error'" class="feedback-sheet__text feedback-sheet__text--error">
            Couldn't send right now — check your connection and try again.
          </p>
          <button type="submit" class="feedback-sheet__btn" :disabled="state === 'sending' || !message.trim()">
            {{ state === 'sending' ? 'Sending…' : 'Send' }}
          </button>
        </template>
      </form>
    </Transition>
  </div>
</template>
