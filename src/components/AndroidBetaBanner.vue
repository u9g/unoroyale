<script setup lang="ts">
import { ref } from 'vue'

// Google Play grants production access only after 12 testers stay opted in for 14 days.
// The closed test picks its testers from a Google Group, so joining the group is the whole signup.
const GROUP_URL = 'https://groups.google.com/g/card-royale-testers'
const SIGNED_UP_KEY = 'android_beta_signed_up'

const hidden = ref(localStorage.getItem(SIGNED_UP_KEY) === '1')
const showSheet = ref(false)

function joined() {
  localStorage.setItem(SIGNED_UP_KEY, '1')
  hidden.value = true
  showSheet.value = false
}
</script>

<template>
  <button v-if="!hidden" type="button" class="android-beta" @click="showSheet = true">
    <span class="android-beta__title">Android beta — testers wanted</span>
    <span class="android-beta__text">Play Card Royale on Android before anyone else</span>
  </button>

  <div v-if="showSheet" class="modal-overlay feedback-overlay" @click="showSheet = false">
    <div class="feedback-sheet" @click.stop>
      <div class="feedback-sheet__handle" />
      <h2 class="feedback-sheet__title">Test Card Royale on Android</h2>
      <p class="feedback-sheet__text">Google Play only lists the game once 12 testers have run the beta for 14 days. Join the testers group with your Google account and you'll get the install link as soon as the beta opens.</p>
      <a
        class="feedback-sheet__btn feedback-sheet__btn--link"
        :href="GROUP_URL"
        target="_blank"
        rel="noopener"
        @click="joined"
      >Join the testers group</a>
      <button type="button" class="feedback-sheet__dismiss" @click="showSheet = false">Not now</button>
    </div>
  </div>
</template>
