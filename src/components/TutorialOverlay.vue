<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { Card } from '../engine/card'
import CardFace from './CardFace.vue'
import CardBack from './CardBack.vue'

const emit = defineEmits<{
  close: []
}>()

interface TutorialStep {
  title: string
  body: string
  discardCard?: Card
  cards?: Card[]
  drawStep?: boolean
  colorCircles?: boolean
  unoButton?: boolean
  tip?: string
}

const steps: TutorialStep[] = [
  {
    title: 'The Goal',
    body: 'Be the <strong>first player</strong> to play all the cards in your hand. You play against 3 computer opponents — whoever empties their hand first wins!',
    cards: [
      { color: 'red', value: 7 },
      { color: 'blue', value: 3 },
      { color: 'green', value: 9 },
    ],
    tip: 'Keep an eye on how many cards your opponents have.',
  },
  {
    title: 'Matching Cards',
    body: 'On your turn, play a card that matches the top card by <strong>color</strong> or <strong>value</strong>.',
    discardCard: { color: 'red', value: 5 },
    cards: [
      { color: 'red', value: 8 },
      { color: 'blue', value: 5 },
    ],
    tip: 'Red 8 matches by color, Blue 5 matches by value.',
  },
  {
    title: 'Drawing Cards',
    body: 'If you can\'t play any card, tap the <strong>draw pile</strong> to draw one. If the drawn card is playable, it appears with a <strong>star</strong> — you can play it right away or keep it.',
    drawStep: true,
    cards: [
      { color: 'blue', value: 2, drawn: true },
    ],
    tip: 'A star on a card means you just drew it.',
  },
  {
    title: 'Action Cards',
    body: '<strong>Skip</strong> — next player loses their turn.<br><strong>Reverse</strong> — changes the direction of play.<br><strong>Draw Two (+2)</strong> — next player draws 2 cards and loses their turn.',
    cards: [
      { color: 'blue', value: 'skip' },
      { color: 'green', value: 'reverse' },
      { color: 'red', value: 'draw_two' },
    ],
    tip: 'The arrow on a Reverse card shows the direction play will switch to in your hand, or the direction it changed to when it was played.',
  },
  {
    title: 'Wild Cards',
    body: '<strong>Wild</strong> — play it anytime and choose the next color.<br><strong>Wild Draw Four (+4)</strong> — play it anytime, choose the color, and the next player draws 4 cards and loses their turn.',
    cards: [
      { color: null, value: 'wild' },
      { color: null, value: 'wild_draw_four' },
    ],
    tip: 'Wild cards can be played on any card, regardless of color or value.',
  },
  {
    title: 'Choosing a Color',
    body: 'After playing a Wild card, you\'ll pick one of the four colors. The next player must match the color you choose. Or play a Wild card!',
    colorCircles: true,
    tip: 'Once played, a Wild card changes to show the chosen color.',
    cards: [
      { color: null, value: 'wild', chosenColor: 'green' },
      { color: null, value: 'wild_draw_four', chosenColor: 'red' },
    ],
  },
  {
    title: 'Calling UNO!',
    body: 'When you\'re down to <strong>one card</strong>, press the <strong>UNO</strong> button before playing your last card. If you forget, you\'ll draw <strong>2 penalty cards</strong> instead of winning!',
    unoButton: true,
    tip: 'Press UNO after playing your second-to-last card, before your final play.',
  },
  {
    title: 'You\'re Ready!',
    body: 'That\'s everything you need to know. Play cards by matching color or value, use action cards strategically, and don\'t forget to call UNO. <strong>Good luck!</strong>',
    cards: [
      { color: 'red', value: 0 },
      { color: 'blue', value: 'skip' },
      { color: null, value: 'wild' },
      { color: 'green', value: 'reverse' },
      { color: 'yellow', value: 7 },
    ],
  },
]

const currentStep = ref(0)
const transitionName = ref('tutorial-slide-left')

function nextStep() {
  if (currentStep.value < steps.length - 1) {
    transitionName.value = 'tutorial-slide-left'
    currentStep.value++
  } else {
    emit('close')
  }
}

function prevStep() {
  if (currentStep.value > 0) {
    transitionName.value = 'tutorial-slide-right'
    currentStep.value--
  }
}

function handleKeydown(e: globalThis.KeyboardEvent) {
  if (e.key === 'ArrowRight' || e.key === 'Enter') nextStep()
  else if (e.key === 'ArrowLeft') prevStep()
  else if (e.key === 'Escape') emit('close')
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <div class="modal-overlay" @click="emit('close')">
    <div class="tutorial" @click.stop>
      <div class="tutorial__header">
        <div class="tutorial__dots">
          <span
            v-for="(_, i) in steps"
            :key="i"
            :class="['tutorial__dot', i === currentStep && 'tutorial__dot--active', i < currentStep && 'tutorial__dot--done']"
          />
        </div>
        <button class="tutorial__close" @click="emit('close')">&times;</button>
      </div>

      <Transition :name="transitionName" mode="out-in">
        <div :key="currentStep" class="tutorial__body">
          <h2 class="tutorial__step-title">{{ steps[currentStep].title }}</h2>

          <div v-if="steps[currentStep].discardCard" class="tutorial__match-row">
            <div class="tutorial__card-group">
              <span class="tutorial__card-group-label">Top Card</span>
              <CardFace :card="steps[currentStep].discardCard!" :disabled="false" />
            </div>
            <span class="tutorial__match-arrow">&#x2190;</span>
            <div class="tutorial__card-group">
              <span class="tutorial__card-group-label">Your Hand</span>
              <div class="tutorial__cards">
                <CardFace
                  v-for="(card, i) in steps[currentStep].cards"
                  :key="i"
                  :card="card"
                  :disabled="false"
                />
              </div>
            </div>
          </div>

          <div v-else-if="steps[currentStep].drawStep" class="tutorial__match-row">
            <div class="tutorial__card-group">
              <span class="tutorial__card-group-label">Drawn Card</span>
              <CardFace :card="steps[currentStep].cards![0]" :disabled="false" />
            </div>
            <span class="tutorial__match-arrow">&#x2190;</span>
            <div class="tutorial__card-group">
              <span class="tutorial__card-group-label">Draw Pile</span>
              <CardBack />
            </div>
          </div>

          <div v-else-if="steps[currentStep].cards" class="tutorial__cards">
            <CardFace
              v-for="(card, i) in steps[currentStep].cards"
              :key="i"
              :card="card"
              :disabled="false"
            />
          </div>

          <div v-if="steps[currentStep].colorCircles" class="tutorial__color-circles">
            <span class="tutorial__color-circle tutorial__color-circle--red"></span>
            <span class="tutorial__color-circle tutorial__color-circle--blue"></span>
            <span class="tutorial__color-circle tutorial__color-circle--green"></span>
            <span class="tutorial__color-circle tutorial__color-circle--yellow"></span>
          </div>

          <div v-if="steps[currentStep].unoButton" class="tutorial__uno-demo">
            <button class="uno-btn uno-btn--demo">UNO</button>
          </div>

          <p class="tutorial__step-text" v-html="steps[currentStep].body"></p>

          <div v-if="steps[currentStep].tip" class="tutorial__tip">
            <strong>Tip:</strong> {{ steps[currentStep].tip }}
          </div>
        </div>
      </Transition>

      <div class="tutorial__footer">
        <button
          v-if="currentStep > 0"
          class="tutorial__btn tutorial__btn--prev"
          @click="prevStep"
        >
          Back
        </button>
        <span v-else />
        <button
          class="tutorial__btn tutorial__btn--next"
          @click="nextStep"
        >
          {{ currentStep === steps.length - 1 ? 'Let\'s Play!' : 'Next' }}
        </button>
      </div>
    </div>
  </div>
</template>
