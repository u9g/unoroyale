<script setup lang="ts">
import { ref } from 'vue'
import { STATS_URL } from '../stats'
import { deviceId } from '../deviceId'

// Google Play grants production access only after 12 testers stay opted in for 14 days,
// so signups are collected as feedback and invited to the closed test by email.
const SIGNED_UP_KEY = 'android_beta_signed_up'

const hidden = ref(localStorage.getItem(SIGNED_UP_KEY) === '1')
const showSheet = ref(false)
const email = ref('')
const state = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')

async function submit() {
  if (!email.value.trim() || state.value === 'sending') return
  if (!STATS_URL) {
    state.value = 'error'
    return
  }
  state.value = 'sending'
  try {
    const res = await fetch(`${STATS_URL}/feedback`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ message: 'Android beta signup', email: email.value.trim(), device_id: deviceId }),
    })
    if (res.ok) {
      state.value = 'sent'
      localStorage.setItem(SIGNED_UP_KEY, '1')
    } else {
      state.value = 'error'
    }
  } catch {
    state.value = 'error'
  }
}

function close() {
  showSheet.value = false
  if (state.value === 'sent') hidden.value = true
}
</script>

<template>
  <button v-if="!hidden" type="button" class="android-beta" @click="showSheet = true">
    <span class="android-beta__title">Android beta — testers wanted</span>
    <span class="android-beta__text">Play Card Royale on Android before anyone else</span>
  </button>

  <div v-if="showSheet" class="modal-overlay feedback-overlay" @click="close">
    <form class="feedback-sheet" @click.stop @submit.prevent="submit">
      <div class="feedback-sheet__handle" />
      <template v-if="state === 'sent'">
        <h2 class="feedback-sheet__title">You're on the list</h2>
        <p class="feedback-sheet__text">Watch for a Google Play invite. Opening the beta and keeping it installed is what gets Card Royale onto the store.</p>
        <button type="button" class="feedback-sheet__btn" @click="close">Done</button>
      </template>
      <template v-else>
        <h2 class="feedback-sheet__title">Test Card Royale on Android</h2>
        <p class="feedback-sheet__text">Google Play only lists the game once 12 testers have run the beta for 14 days. Leave the email on your Google account and you'll get an invite.</p>
        <input
          v-model="email"
          type="email"
          class="feedback-sheet__input"
          placeholder="Google account email"
          autocomplete="email"
          required
        />
        <p v-if="state === 'error'" class="feedback-sheet__text feedback-sheet__text--error">
          Couldn't send right now — check your connection and try again.
        </p>
        <button type="submit" class="feedback-sheet__btn" :disabled="state === 'sending' || !email.trim()">
          {{ state === 'sending' ? 'Sending…' : 'Count me in' }}
        </button>
      </template>
    </form>
  </div>
</template>
