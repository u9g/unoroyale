<script setup lang="ts">
import { computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import type { Color } from '../engine/card'
import type { GameState } from '../engine/gameState'
import { topCard, nextPlayerIndex } from '../engine/gameState'
import { playableIndices } from '../engine/rules'
import CardFace from './CardFace.vue'
import AiHand from './AiHand.vue'
import DiscardPile from './DiscardPile.vue'
import ColorChooser from './ColorChooser.vue'

// --- Direction Arrow Animation ---

let prevArrow: ArrowPositions | null = null
let currentArrow: ArrowPositions | null = null
let animId: number | null = null

interface ArrowPositions {
  sx: number; sy: number
  cpX: number; cpY: number
  ex: number; ey: number
}

function calcArrowPositions(): ArrowPositions | null {
  const el = document.getElementById('direction-arrow')
  if (!el) return null
  const from = parseInt(el.dataset.from!)
  const to = parseInt(el.dataset.to!)
  const table = el.closest('.game-table') as HTMLElement | null
  if (!table) return null

  const tableRect = table.getBoundingClientRect()
  const isMobile = window.innerWidth <= 640
  const gap = isMobile ? 20 : 35

  const getPlayerCards = (idx: number): HTMLElement | null => {
    if (idx === 0) return table.querySelector('.human-hand__cards')
    if (idx === 1) return table.querySelector('.game-table__left .ai-hand__cards')
    if (idx === 2) return table.querySelector('.game-table__top .ai-hand__cards')
    if (idx === 3) return table.querySelector('.game-table__right .ai-hand__cards')
    return null
  }

  interface EdgePoint {
    x: number; y: number
    _humanArc?: boolean; _arcRight?: boolean; _sameRow?: boolean
  }

  const getMobileEdgePoint = (idx: number, toward: number): EdgePoint | null => {
    const container = getPlayerCards(idx)
    if (!container) return null
    const hand = container.closest('.ai-hand') || container.closest('.human-hand')
    const el = (hand || container) as HTMLElement
    const r = el.getBoundingClientRect()

    const targetContainer = getPlayerCards(toward)
    if (!targetContainer) return null
    const targetHand = targetContainer.closest('.ai-hand') || targetContainer.closest('.human-hand')
    const targetEl = (targetHand || targetContainer) as HTMLElement
    const tr = targetEl.getBoundingClientRect()

    if (idx === 0) {
      const indicator = hand?.querySelector('.your-turn-indicator') as HTMLElement | null
      const rr = indicator ? indicator.getBoundingClientRect() : r
      const aiCx = tr.left - tableRect.left + tr.width / 2
      return { x: rr.left - tableRect.left + rr.width / 2, y: rr.top - tableRect.top - gap, _humanArc: true, _arcRight: aiCx > tableRect.width / 2 }
    }

    if (toward === 0) {
      const aiCx = r.left - tableRect.left + r.width / 2
      return { x: aiCx, y: r.bottom - tableRect.top + gap, _humanArc: true, _arcRight: aiCx > tableRect.width / 2 }
    }

    const overlapY = Math.min(r.bottom, tr.bottom) - Math.max(r.top, tr.top)
    const sameRow = overlapY > Math.min(r.height, tr.height) * 0.5

    if (sameRow) {
      return { x: r.left - tableRect.left + r.width / 2, y: r.bottom - tableRect.top + gap, _sameRow: true }
    } else {
      const targetIsBelow = tr.top > r.top
      return { x: r.left - tableRect.left + r.width / 2, y: targetIsBelow ? r.bottom - tableRect.top + gap : r.top - tableRect.top - gap }
    }
  }

  const getDesktopEdgePoint = (idx: number, toward: number): EdgePoint | null => {
    const container = getPlayerCards(idx)
    if (!container) return null
    const cards = container.querySelectorAll('.card')
    if (cards.length === 0) return null

    if (idx === 0) {
      const faceRight = toward === 3 || toward === 2
      const card = faceRight ? cards[cards.length - 1] : cards[0]
      const r = card.getBoundingClientRect()
      return { x: faceRight ? r.right - tableRect.left + gap : r.left - tableRect.left - gap, y: r.top - tableRect.top + r.height / 2 }
    } else if (idx === 1) {
      const hand = container.closest('.ai-hand')!
      const label = hand.querySelector('.ai-hand__label')
      const faceUp = toward === 2
      if (faceUp && label) { const lr = label.getBoundingClientRect(); return { x: lr.left - tableRect.left + lr.width / 2, y: lr.top - tableRect.top - gap } }
      const hr = hand.getBoundingClientRect()
      return { x: hr.left - tableRect.left + hr.width / 2, y: hr.bottom - tableRect.top + gap }
    } else if (idx === 2) {
      const faceRight = toward === 3 || toward === 0
      const card = faceRight ? cards[cards.length - 1] : cards[0]
      const r = card.getBoundingClientRect()
      return { x: faceRight ? r.right - tableRect.left + gap : r.left - tableRect.left - gap, y: r.top - tableRect.top + r.height / 2 }
    } else if (idx === 3) {
      const hand = container.closest('.ai-hand')!
      const label = hand.querySelector('.ai-hand__label')
      const faceUp = toward === 2
      if (faceUp && label) { const lr = label.getBoundingClientRect(); return { x: lr.left - tableRect.left + lr.width / 2, y: lr.top - tableRect.top - gap } }
      const hr = hand.getBoundingClientRect()
      return { x: hr.left - tableRect.left + hr.width / 2, y: hr.bottom - tableRect.top + gap }
    }
    return null
  }

  const getEdgePoint = isMobile ? getMobileEdgePoint : getDesktopEdgePoint
  const start = getEdgePoint(from, to)
  const end = getEdgePoint(to, from)
  if (!start || !end) return null

  let cpX: number, cpY: number
  const edgePad = isMobile ? 8 : 12
  if (start._humanArc || end._humanArc) {
    const arcRight = start._arcRight || end._arcRight
    cpX = arcRight ? tableRect.width - edgePad : edgePad
    const humanY = from === 0 ? start.y : end.y
    const midY = (start.y + end.y) / 2
    cpY = humanY * 0.85 + midY * 0.15
  } else if (start._sameRow) {
    const midX = (start.x + end.x) / 2
    const spread = Math.abs(end.x - start.x)
    cpX = midX
    cpY = start.y + spread * 0.5
  } else {
    const centerX = tableRect.width / 2
    const centerY = tableRect.height / 2
    const midX = (start.x + end.x) / 2
    const midY = (start.y + end.y) / 2
    const awayX = midX - centerX
    const awayY = midY - centerY
    const awayDist = Math.sqrt(awayX * awayX + awayY * awayY) || 1
    const curvature = isMobile ? 40 : 80
    cpX = midX + (awayX / awayDist) * curvature
    cpY = midY + (awayY / awayDist) * curvature
  }

  return { sx: start.x, sy: start.y, cpX, cpY, ex: end.x, ey: end.y }
}

function applyArrowPositions(p: ArrowPositions) {
  const line = document.getElementById('arrow-line')
  const head = document.getElementById('arrow-head')
  if (!line) return

  const isMobile = window.innerWidth <= 640
  const hl = isMobile ? 28 : 48
  const dx = p.ex - p.cpX
  const dy = p.ey - p.cpY
  const dist = Math.sqrt(dx * dx + dy * dy)
  const nx = dx / dist
  const ny = dy / dist
  const lineEndX = p.ex - nx * hl
  const lineEndY = p.ey - ny * hl

  line.setAttribute('d', `M ${p.sx} ${p.sy} Q ${p.cpX} ${p.cpY} ${lineEndX} ${lineEndY}`)

  if (head) {
    const hw = isMobile ? 14 : 24
    head.setAttribute('points',
      `${p.ex - nx * hl + ny * hw} ${p.ey - ny * hl - nx * hw}, ${p.ex} ${p.ey}, ${p.ex - nx * hl - ny * hw} ${p.ey - ny * hl + nx * hw}`
    )
  }
}

function lerpArrow(a: ArrowPositions, b: ArrowPositions, t: number): ArrowPositions {
  return {
    sx: a.sx + (b.sx - a.sx) * t,
    sy: a.sy + (b.sy - a.sy) * t,
    cpX: a.cpX + (b.cpX - a.cpX) * t,
    cpY: a.cpY + (b.cpY - a.cpY) * t,
    ex: a.ex + (b.ex - a.ex) * t,
    ey: a.ey + (b.ey - a.ey) * t,
  }
}

function updateArrow(animate: boolean) {
  if (animId) { cancelAnimationFrame(animId); animId = null }
  requestAnimationFrame(() => {
    const target = calcArrowPositions()
    if (!target) return

    if (!animate || !prevArrow) {
      applyArrowPositions(target)
      prevArrow = target
      return
    }

    const from = currentArrow || prevArrow
    const duration = 500
    const startTime = performance.now()

    const step = (now: number) => {
      const elapsed = now - startTime
      const raw = Math.min(elapsed / duration, 1)
      const t = raw < 0.5 ? 4 * raw * raw * raw : 1 - Math.pow(-2 * raw + 2, 3) / 2
      currentArrow = lerpArrow(from, target, t)
      applyArrowPositions(currentArrow)

      if (raw < 1) {
        animId = requestAnimationFrame(step)
      } else {
        prevArrow = target
        currentArrow = null
        animId = null
      }
    }
    animId = requestAnimationFrame(step)
  })
}

// --- Discard Fly Animation ---

let lastPlayedCardRect: DOMRect | null = null
let lastPlayedCardTime: number | null = null
let lastDrawTime: number | null = null
let prevDiscardKey: string | null = null

function discardKey(el: HTMLElement): string {
  return `${el.dataset.value || ''}${el.dataset.color || ''}`
}

function findDiscardSource(targetEl: HTMLElement): DOMRect | null {
  const table = targetEl.closest('.game-table')
  if (!table) return null

  const lastPlayer = parseInt(targetEl.dataset.lastPlayer || '-1', 10)

  if (lastPlayer === 0) {
    const age = Date.now() - (lastPlayedCardTime || 0)
    if (lastPlayedCardRect && age < 2000) {
      return lastPlayedCardRect
    }
    return null
  }

  if (lastPlayer < 1) return null

  let handEl: HTMLElement | null = null
  if (lastPlayer === 1) handEl = table.querySelector('.game-table__left .ai-hand__cards')
  else if (lastPlayer === 2) handEl = table.querySelector('.game-table__top .ai-hand__cards')
  else if (lastPlayer === 3) handEl = table.querySelector('.game-table__right .ai-hand__cards')

  if (!handEl) return null
  const cards = handEl.querySelectorAll('.card')
  if (cards.length === 0) return null
  return cards[cards.length - 1].getBoundingClientRect()
}

function flyCardToDiscard(fromRect: DOMRect, toRect: DOMRect, targetEl: HTMLElement) {
  const clone = targetEl.cloneNode(true) as HTMLElement
  clone.id = ''
  clone.style.cssText = `
    position: fixed; z-index: 50; pointer-events: none;
    left: ${fromRect.left}px; top: ${fromRect.top}px;
    width: ${fromRect.width}px; height: ${fromRect.height}px;
    transition: all 0.35s ease-in-out;
  `
  document.body.appendChild(clone)
  requestAnimationFrame(() => {
    clone.style.left = toRect.left + 'px'
    clone.style.top = toRect.top + 'px'
    clone.style.width = toRect.width + 'px'
    clone.style.height = toRect.height + 'px'
  })
  clone.addEventListener('transitionend', () => clone.remove())
  setTimeout(() => clone.remove(), 500)
}

function updateDiscardAnimation(animate: boolean) {
  const discardEl = document.getElementById('discard-top')
  if (!discardEl) {
    prevDiscardKey = null
    lastPlayedCardRect = null
    lastPlayedCardTime = null
    return
  }

  const nextKey = discardKey(discardEl)
  if (!animate || !prevDiscardKey) {
    prevDiscardKey = nextKey
    if (!animate) {
      lastPlayedCardRect = null
      lastPlayedCardTime = null
    }
    return
  }

  if (nextKey !== prevDiscardKey) {
    const fromRect = findDiscardSource(discardEl)
    if (fromRect) {
      flyCardToDiscard(fromRect, discardEl.getBoundingClientRect(), discardEl)
    }
  }

  prevDiscardKey = nextKey
  lastPlayedCardRect = null
  lastPlayedCardTime = null
}

// --- Draw Animation (card flies from draw pile to hand with 3D flip) ---

function animateOneDrawnCard(targetCard: HTMLElement, srcRect: DOMRect, staggerDelay: number) {
  const destRect = targetCard.getBoundingClientRect()

  targetCard.style.visibility = 'hidden'
  targetCard.style.opacity = '0'

  const flipper = document.createElement('div')
  flipper.style.cssText = `
    position: fixed; z-index: 1000; pointer-events: none;
    left: ${srcRect.left}px; top: ${srcRect.top}px;
    width: ${srcRect.width}px; height: ${srcRect.height}px;
    perspective: 800px;
    transition: left 0.4s ease-in-out, top 0.4s ease-in-out, width 0.4s ease-in-out, height 0.4s ease-in-out;
  `

  const inner = document.createElement('div')
  inner.style.cssText = `
    width: 100%; height: 100%; position: relative;
    transform-style: preserve-3d;
    transition: transform 0.35s ease-in-out;
  `

  const front = document.createElement('div')
  front.className = 'card card--back'
  front.innerHTML = '<span class="card__uno-text">UNO</span>'
  front.style.cssText = 'position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 10px;'

  const back = targetCard.cloneNode(true) as HTMLElement
  back.style.cssText = 'position: absolute; width: 100%; height: 100%; backface-visibility: hidden; transform: rotateY(180deg); border-radius: 10px;'

  inner.appendChild(front)
  inner.appendChild(back)
  flipper.appendChild(inner)
  document.body.appendChild(flipper)

  setTimeout(() => {
    requestAnimationFrame(() => {
      flipper.style.left = destRect.left + 'px'
      flipper.style.top = destRect.top + 'px'
      flipper.style.width = destRect.width + 'px'
      flipper.style.height = destRect.height + 'px'
    })

    setTimeout(() => {
      inner.style.transform = 'rotateY(180deg)'
    }, 400)

    setTimeout(() => {
      flipper.remove()
      targetCard.style.visibility = ''
      targetCard.style.opacity = ''
    }, 750)
  }, staggerDelay)
}

function updateDrawAnimation(animate: boolean, cardCount: number = 1) {
  const drawPile = document.querySelector('.draw-pile .card') as HTMLElement | null

  if (!animate || !drawPile || !lastDrawTime) return

  const age = Date.now() - (lastDrawTime || 0)
  if (age > 2000) {
    lastDrawTime = null
    return
  }

  const allCards = Array.from(document.querySelectorAll('#human-hand-cards [data-card-index]')) as HTMLElement[]
  const newCards = allCards.slice(-cardCount)
  if (newCards.length === 0) { lastDrawTime = null; return }

  const srcRect = drawPile.getBoundingClientRect()

  newCards.forEach((card, i) => {
    animateOneDrawnCard(card, srcRect, i * 200)
  })

  lastDrawTime = null
}

// --- Deal Animation ---

function animateDeal(onComplete?: () => void) {
  const drawPile = document.querySelector('.draw-pile .card') as HTMLElement | null
  if (!drawPile) { onComplete?.(); return }

  const srcRect = drawPile.getBoundingClientRect()

  const humanCards = Array.from(document.querySelectorAll('#human-hand-cards [data-card-index]')) as HTMLElement[]
  if (humanCards.length === 0) { onComplete?.(); return }

  humanCards.forEach(card => { card.style.visibility = 'hidden' })

  requestAnimationFrame(() => {
    humanCards.forEach((card, i) => {
      const destRect = card.getBoundingClientRect()
      const delay = i * 80

      const flipper = document.createElement('div')
      flipper.style.cssText = `
        position: fixed; z-index: 1000; pointer-events: none;
        left: ${srcRect.left}px; top: ${srcRect.top}px;
        width: ${srcRect.width}px; height: ${srcRect.height}px;
        perspective: 800px;
        transition: left 0.4s ease-in-out, top 0.4s ease-in-out, width 0.4s ease-in-out, height 0.4s ease-in-out;
        transition-delay: ${delay}ms;
      `

      const inner = document.createElement('div')
      inner.style.cssText = `
        width: 100%; height: 100%; position: relative;
        transform-style: preserve-3d;
        transition: transform 0.35s ease-in-out;
      `

      const front = document.createElement('div')
      front.className = 'card card--back'
      front.innerHTML = '<span class="card__uno-text">UNO</span>'
      front.style.cssText = 'position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 10px;'

      const back = card.cloneNode(true) as HTMLElement
      back.style.cssText = 'position: absolute; width: 100%; height: 100%; backface-visibility: hidden; transform: rotateY(180deg); border-radius: 10px;'

      inner.appendChild(front)
      inner.appendChild(back)
      flipper.appendChild(inner)
      document.body.appendChild(flipper)

      requestAnimationFrame(() => {
        flipper.style.left = destRect.left + 'px'
        flipper.style.top = destRect.top + 'px'
        flipper.style.width = destRect.width + 'px'
        flipper.style.height = destRect.height + 'px'
      })

      setTimeout(() => {
        inner.style.transform = 'rotateY(180deg)'
      }, 400 + delay)

      setTimeout(() => {
        flipper.remove()
        card.style.visibility = ''
      }, 750 + delay)
    })

    const totalTime = 750 + (humanCards.length - 1) * 80 + 50
    setTimeout(() => onComplete?.(), totalTime)
  })
}

// --- Capture helpers ---

function capturePlayedCard(cardEl: HTMLElement) {
  lastPlayedCardRect = cardEl.getBoundingClientRect()
  lastPlayedCardTime = Date.now()
}

function captureDrawPile() {
  lastDrawTime = Date.now()
}

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

const onResize = () => updateArrow(false)
onMounted(() => window.addEventListener('resize', onResize))
onUnmounted(() => window.removeEventListener('resize', onResize))

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
  if (!dealing && oldLen !== undefined && newLen! > oldLen) {
    const added = newLen! - oldLen
    // Ensure lastDrawTime is set so the animation plays even for
    // cards added by opponent effects (e.g. +2) rather than manual draws
    if (!lastDrawTime) lastDrawTime = Date.now()
    nextTick(() => updateDrawAnimation(true, added))
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
          <div class="card card--back card--large">
            <span class="card__uno-text">UNO</span>
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
