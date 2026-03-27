<script setup lang="ts">
import { computed, watch, nextTick, onMounted } from 'vue'
import type { Color } from '../engine/card'
import type { GameState } from '../engine/gameState'
import { topCard, nextPlayerIndex } from '../engine/gameState'
import { playableIndices } from '../engine/rules'
import { updateArrow, updateDiscardAnimation, updateDrawAnimation, capturePlayedCard, captureDrawPile, animateDeal } from '../animations'
import CardFace from './CardFace.vue'
import AiHand from './AiHand.vue'
import DiscardPile from './DiscardPile.vue'
import ColorChooser from './ColorChooser.vue'

const props = defineProps<{
  gameState: GameState
  choosingColor: boolean
  isNewGame?: boolean
}>()

const emit = defineEmits<{
  playCard: [index: number, color?: Color | null]
  drawCard: []
  sayUno: []
  newGame: []
  chooseColor: [color: Color]
  cancelColor: []
  reorderHand: [from: number, to: number]
  dealComplete: []
}>()

const human = computed(() => props.gameState.players[0])
const top = computed(() => topCard(props.gameState))
const isHumanTurn = computed(() => props.gameState.currentPlayer === 0 && props.gameState.phase === 'playing')
const playableIdxs = computed(() =>
  isHumanTurn.value && top.value ? playableIndices(human.value.hand, top.value) : []
)
const canDraw = computed(() => isHumanTurn.value)
const showUnoBtn = computed(() => props.gameState.phase === 'playing')
const nextFromHuman = computed(() =>
  nextPlayerIndex({ ...props.gameState, currentPlayer: 0 })
)
const arrowFrom = computed(() => props.gameState.currentPlayer)
const arrowTo = computed(() => nextPlayerIndex(props.gameState))

const aiWest = computed(() => props.gameState.players[1])
const aiNorth = computed(() => props.gameState.players[2])
const aiEast = computed(() => props.gameState.players[3])

const lastPlayerIndex = computed(() => {
  const rp = props.gameState.recentPlays
  if (rp.length === 0) return -1
  const name = rp[0][0]
  return props.gameState.players.findIndex(p => p.name === name)
})

let dealing = false

// Run deal animation on mount if this is a new game
onMounted(() => {
  if (props.isNewGame) {
    dealing = true
    nextTick(() => {
      animateDeal(() => {
        dealing = false
        emit('dealComplete')
        updateArrow(false)
      })
    })
  } else {
    nextTick(() => {
      updateArrow(false)
      updateDiscardAnimation(false)
    })
  }
})

// Watch for state changes to animate arrow + discard
watch(() => [props.gameState.currentPlayer, props.gameState.direction], () => {
  if (!dealing) {
    nextTick(() => updateArrow(true))
  }
})

watch(() => props.gameState.discardPile[0], () => {
  if (!dealing) {
    nextTick(() => updateDiscardAnimation(true))
  }
})

watch(() => props.gameState.players[0]?.hand.length, (newLen, oldLen) => {
  if (!dealing && oldLen !== undefined && newLen > oldLen) {
    nextTick(() => updateDrawAnimation(true))
  }
})

function onPlayCard(index: number) {
  // Capture card position for fly animation
  const cardEl = document.querySelector(`#human-hand-cards [data-card-index="${index}"]`) as HTMLElement | null
  if (cardEl) capturePlayedCard(cardEl)
  emit('playCard', index)
}

function onDrawClick() {
  if (!canDraw.value) return
  captureDrawPile()
  emit('drawCard')
}

// Drag & drop state
let dragIdx: number | null = null

function onDragStart(e: DragEvent) {
  const target = (e.target as HTMLElement).closest('[data-card-index]') as HTMLElement | null
  if (!target) return
  dragIdx = parseInt(target.dataset.cardIndex!)
  target.classList.add('card--dragging')
  if (e.dataTransfer) e.dataTransfer.effectAllowed = 'move'
}

function onDragEnd(e: DragEvent) {
  const target = (e.target as HTMLElement).closest('[data-card-index]') as HTMLElement | null
  if (target) target.classList.remove('card--dragging')
  dragIdx = null
}

function onDragOver(e: DragEvent) {
  e.preventDefault()
  if (e.dataTransfer) e.dataTransfer.dropEffect = 'move'
}

function onDrop(e: DragEvent) {
  e.preventDefault()
  if (dragIdx === null) return

  const container = (e.target as HTMLElement).closest('.human-hand__cards')
  if (!container) return

  const cards = Array.from(container.querySelectorAll('[data-card-index]'))
  let closest: Element | null = null
  let closestDist = Infinity
  let insertAfter = false

  for (const card of cards) {
    const rect = card.getBoundingClientRect()
    const midX = rect.left + rect.width / 2
    const dist = Math.abs(e.clientX - midX)
    if (dist < closestDist) {
      closestDist = dist
      closest = card
      insertAfter = e.clientX >= midX
    }
  }

  if (closest) {
    let dropIdx = parseInt((closest as HTMLElement).dataset.cardIndex!)
    if (insertAfter) dropIdx += 1
    if (dragIdx < dropIdx) dropIdx -= 1
    if (dragIdx !== dropIdx) {
      emit('reorderHand', dragIdx, dropIdx)
    }
  }
  dragIdx = null
}
</script>

<template>
  <div class="top-bar">
    <h1 class="top-bar__title">UNO Royale</h1>
    <div class="top-bar__status">{{ gameState.lastAction }}</div>
    <button class="top-bar__new-game" @click="emit('newGame')">New Game</button>
  </div>

  <div :class="['game-table', `game-table--${gameState.direction}`]">
    <!-- Direction arrow -->
    <svg class="direction-arrow" id="direction-arrow" :data-direction="gameState.direction" :data-from="arrowFrom" :data-to="arrowTo">
      <defs>
        <marker id="arrowhead" markerWidth="32" markerHeight="28" refX="32" refY="14" orient="auto" markerUnits="userSpaceOnUse">
          <polygon points="0 0, 32 14, 0 28" fill="white" opacity="0.35" />
        </marker>
      </defs>
      <path id="arrow-line" fill="none" stroke="white" stroke-opacity="0.3" stroke-width="12" />
      <polygon id="arrow-head" fill="white" opacity="0.35" />
    </svg>

    <!-- AI North (top) -->
    <div class="game-table__top">
      <AiHand
        :player="aiNorth"
        position="top"
        :is-current="gameState.currentPlayer === 2"
        :is-target="nextFromHuman === 2"
      />
    </div>

    <!-- AI West (left) -->
    <div class="game-table__left">
      <AiHand
        :player="aiWest"
        position="left"
        :is-current="gameState.currentPlayer === 1"
        :is-target="nextFromHuman === 1"
      />
    </div>

    <!-- Center: Draw & Discard piles -->
    <div class="center-area">
      <div class="center-area__piles">
        <div v-if="gameState.recentPlays.length > 0" class="recent-plays">
          <div v-for="([name, card], i) in [...gameState.recentPlays].reverse()" :key="i" class="recent-play">
            <span class="recent-play__name">{{ name }}</span>
            <CardFace :card="card" :index="-1" :playable="false" :disabled="false" :draggable="false" style="--card-index: 0; --card-total: 1;" />
          </div>
        </div>

        <div
          id="draw-pile"
          :class="['draw-pile', canDraw && 'draw-pile--active']"
          @click="onDrawClick"
        >
          <div class="draw-pile__cards">
            <div class="draw-pile__deck card card--back card--large"><span class="card__uno-text">UNO</span></div>
            <div class="card card--back card--large card-fan__card"><span class="card__uno-text">UNO</span></div>
            <div class="card card--back card--large card-fan__card"><span class="card__uno-text">UNO</span></div>
            <div class="card card--back card--large card-fan__card"><span class="card__uno-text">UNO</span></div>
          </div>
          <span class="draw-pile__label">Draw</span>
        </div>

        <div class="discard-area">
          <DiscardPile v-if="top" :card="top" :last-player="lastPlayerIndex" />
        </div>
      </div>
    </div>

    <!-- AI East (right) -->
    <div class="game-table__right">
      <AiHand
        :player="aiEast"
        position="right"
        :is-current="gameState.currentPlayer === 3"
        :is-target="nextFromHuman === 3"
      />
    </div>

    <!-- Human hand (bottom) -->
    <div class="game-table__bottom">
      <div :class="['human-hand', isHumanTurn && 'human-hand--active']">
        <div v-if="isHumanTurn" class="your-turn-indicator">It's your turn!</div>
        <div class="human-hand__label">
          <span class="human-hand__name">{{ human.name }}</span>
          <button v-if="showUnoBtn" class="uno-btn" @click="emit('sayUno')">UNO!</button>
        </div>
        <div
          id="human-hand-cards"
          class="human-hand__cards"
          @dragstart="onDragStart"
          @dragend="onDragEnd"
          @dragover="onDragOver"
          @drop="onDrop"
        >
          <CardFace
            v-for="(card, idx) in human.hand"
            :key="idx"
            :card="card"
            :index="idx"
            :playable="playableIdxs.includes(idx)"
            :draggable="true"
            :style="`--card-index: ${idx}; --card-total: ${human.hand.length};`"
            @play="onPlayCard"
          />
        </div>
      </div>
    </div>
  </div>

  <ColorChooser
    :visible="choosingColor"
    @choose="(color) => emit('chooseColor', color)"
    @cancel="emit('cancelColor')"
  />
</template>
