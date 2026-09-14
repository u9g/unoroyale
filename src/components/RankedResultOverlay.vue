<script setup lang="ts">
import { computed } from 'vue'
import type { RankedResult } from '../ranked'
import { ROOMS, cardVars, roomFor } from '../ranked'

const props = defineProps<{
  result: RankedResult
  won: boolean
}>()

const emit = defineEmits<{
  playAgain: []
  mainMenu: []
}>()

// A promotion shows off the room just reached, which is the reward for winning it
const room = computed(() => props.result.promoted ?? roomFor(props.result.profile.trophies))
const nextRoom = computed(() => ROOMS.find(r => r.min > props.result.profile.trophies) ?? null)
const style = computed(() => cardVars(room.value))
</script>

<template>
  <div class="modal-overlay">
    <div class="result">
      <div class="result__frame" :style="style">
        <div class="result__card">
          <span class="result__motif" />
          <span class="result__oval" />
          <span v-if="room.card.sheen" class="result__sheen" />
          <span class="result__corner result__corner--tl">&#9819;</span>
          <span class="result__corner result__corner--br">&#9819;</span>

          <span class="result__crown">&#9819;</span>
          <h2 class="result__title">{{ won ? 'Victory' : 'Defeat' }}</h2>
          <p class="result__delta" :class="won ? 'result__delta--up' : 'result__delta--down'">
            {{ result.delta >= 0 ? '+' : '' }}{{ result.delta }} &#9819;
          </p>
          <span class="result__room">{{ room.name }}</span>
          <span class="result__total">{{ result.profile.trophies }} trophies</span>
        </div>
      </div>

      <p v-if="result.promoted" class="result__note result__note--promo" :style="style">
        Promoted to {{ result.promoted.name }}!
      </p>
      <p v-else-if="result.floored" class="result__note" :style="style">
        {{ room.name }} floor held you at {{ result.profile.trophies }} &#9819;.
      </p>
      <p v-else-if="nextRoom" class="result__note" :style="style">
        {{ nextRoom.min - result.profile.trophies }} &#9819; to {{ nextRoom.name }}
      </p>

      <button class="result__btn" @click="emit('playAgain')">Next Match</button>
      <button class="result__menu" @click="emit('mainMenu')">Main Menu</button>
    </div>
  </div>
</template>
