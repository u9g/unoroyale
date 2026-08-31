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
  const isLandscapePhone = window.matchMedia('(orientation: landscape) and (max-height: 500px)').matches
  const isCompact = window.innerWidth <= 1100 && !isLandscapePhone
  const isPhone = window.innerWidth <= 640 || isLandscapePhone
  const gap = isPhone ? 20 : 35

  const getPlayerCards = (idx: number): HTMLElement | null => {
    if (idx === 0) return table.querySelector('.human-hand__cards')
    return table.querySelector(`[data-player="${idx}"] .ai-hand__cards`)
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

    const seat = seatOfPlayer(idx)
    const towardSeat = seatOfPlayer(toward)

    if (seat === 'bottom' || seat === 'top') {
      const faceRight = towardSeat === 'right' || (seat === 'bottom' ? towardSeat === 'top' : towardSeat === 'bottom')
      const card = faceRight ? cards[cards.length - 1] : cards[0]
      const r = card.getBoundingClientRect()
      return { x: faceRight ? r.right - tableRect.left + gap : r.left - tableRect.left - gap, y: r.top - tableRect.top + r.height / 2 }
    }

    const hand = container.closest('.ai-hand')!
    const label = hand.querySelector('.ai-hand__label')
    const faceUp = towardSeat === 'top'
    if (faceUp && label) { const lr = label.getBoundingClientRect(); return { x: lr.left - tableRect.left + lr.width / 2, y: lr.top - tableRect.top - gap } }
    const hr = hand.getBoundingClientRect()
    return { x: hr.left - tableRect.left + hr.width / 2, y: hr.bottom - tableRect.top + gap }
  }

  const getEdgePoint = isCompact ? getMobileEdgePoint : getDesktopEdgePoint
  const start = getEdgePoint(from, to)
  const end = getEdgePoint(to, from)
  if (!start || !end) return null

  let cpX: number, cpY: number
  const edgePad = isPhone ? 8 : 12
  if (start._humanArc || end._humanArc) {
    const arcRight = start._arcRight || end._arcRight
    cpX = arcRight ? tableRect.width - edgePad : edgePad
    // Arc centre sits level with the piles so the curve passes beside them, not across a corner
    const pile = table.querySelector('.draw-pile')?.getBoundingClientRect()
    cpY = pile ? pile.top - tableRect.top + pile.height / 2 : (start.y + end.y) / 2
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
    const curvature = isPhone ? 40 : 80
    cpX = midX + (awayX / awayDist) * curvature
    cpY = midY + (awayY / awayDist) * curvature
  }

  return { sx: start.x, sy: start.y, cpX, cpY, ex: end.x, ey: end.y }
}

function applyArrowPositions(p: ArrowPositions) {
  const line = document.getElementById('arrow-line')
  const head = document.getElementById('arrow-head')
  if (!line) return

  const isLandscapePhone = window.matchMedia('(orientation: landscape) and (max-height: 500px)').matches
  const isPhone = window.innerWidth <= 640 || isLandscapePhone
  const hl = isPhone ? 28 : 48
  const dx = p.ex - p.cpX
  const dy = p.ey - p.cpY
  const dist = Math.sqrt(dx * dx + dy * dy)
  const nx = dx / dist
  const ny = dy / dist
  const lineEndX = p.ex - nx * hl
  const lineEndY = p.ey - ny * hl

  line.setAttribute('d', `M ${p.sx} ${p.sy} Q ${p.cpX} ${p.cpY} ${lineEndX} ${lineEndY}`)

  if (head) {
    const hw = isPhone ? 14 : 24
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

  const handEl = table.querySelector(`[data-player="${lastPlayer}"] .ai-hand__cards`)
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
  front.innerHTML = '<span class="card__uno-text">♛</span>'
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
      front.innerHTML = '<span class="card__uno-text">♛</span>'
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
  menu: []
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

type Seat = 'top' | 'left' | 'right'
// AI player indices (1..n-1) by seat; 2 players faces you, 3 players flank you
const SEATS_BY_COUNT: Record<number, Partial<Record<Seat, number>>> = {
  2: { top: 1 },
  3: { left: 1, right: 2 },
  4: { left: 1, top: 2, right: 3 },
}
const seats = computed(() => SEATS_BY_COUNT[props.gameState.players.length] ?? SEATS_BY_COUNT[4])

function seatOfPlayer(idx: number): Seat | 'bottom' {
  if (idx === 0) return 'bottom'
  return (Object.keys(seats.value) as Seat[]).find(seat => seats.value[seat] === idx) ?? 'top'
}

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
let dropIndicator: HTMLElement | null = null

function getDropPosition(clientX: number, container: HTMLElement): { closest: Element | null; insertAfter: boolean } {
  const cards = Array.from(container.querySelectorAll('[data-card-index]'))
  let closest: Element | null = null
  let closestDist = Infinity
  let insertAfter = false

  for (const card of cards) {
    const rect = card.getBoundingClientRect()
    const midX = rect.left + rect.width / 2
    const dist = Math.abs(clientX - midX)
    if (dist < closestDist) {
      closestDist = dist
      closest = card
      insertAfter = clientX >= midX
    }
  }

  return { closest, insertAfter }
}

function showDropIndicator(container: HTMLElement, closest: Element, insertAfter: boolean) {
  if (!dropIndicator) {
    dropIndicator = document.createElement('div')
    dropIndicator.className = 'drop-indicator'
  }
  const containerRect = container.getBoundingClientRect()
  const cardRect = closest.getBoundingClientRect()
  dropIndicator.style.height = cardRect.height + 'px'
  dropIndicator.style.left = (insertAfter ? cardRect.right : cardRect.left) - containerRect.left + 'px'
  dropIndicator.style.top = cardRect.top - containerRect.top + 'px'
  if (!dropIndicator.parentElement) {
    container.appendChild(dropIndicator)
  }
}

function removeDropIndicator() {
  if (dropIndicator && dropIndicator.parentElement) {
    dropIndicator.remove()
  }
}

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
  removeDropIndicator()
}

function onDragOver(e: DragEvent) {
  e.preventDefault()
  if (e.dataTransfer) e.dataTransfer.dropEffect = 'move'
  if (dragIdx === null) return

  const container = (e.target as HTMLElement).closest('.human-hand__cards') as HTMLElement | null
  if (!container) return

  const { closest, insertAfter } = getDropPosition(e.clientX, container)
  if (closest) {
    showDropIndicator(container, closest, insertAfter)
  }
}

function onDrop(e: DragEvent) {
  e.preventDefault()
  removeDropIndicator()
  if (dragIdx === null) return

  const container = (e.target as HTMLElement).closest('.human-hand__cards') as HTMLElement | null
  if (!container) return

  const { closest, insertAfter } = getDropPosition(e.clientX, container)

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
    <h1 class="top-bar__title">Card Royale</h1>
    <div class="top-bar__status">{{ gameState.lastAction }}</div>
    <button class="top-bar__new-game" @click="emit('newGame')">New Game</button>
  </div>

  <div :class="['game-table', `game-table--${gameState.direction}`]">
    <!-- Direction arrow -->
    <svg v-if="gameState.phase !== 'game_over'" class="direction-arrow" id="direction-arrow" :data-direction="gameState.direction" :data-from="arrowFrom" :data-to="arrowTo">
      <defs>
        <marker id="arrowhead" markerWidth="32" markerHeight="28" refX="32" refY="14" orient="auto" markerUnits="userSpaceOnUse">
          <polygon points="0 0, 32 14, 0 28" fill="white" opacity="0.35" />
        </marker>
      </defs>
      <path id="arrow-line" fill="none" stroke="white" stroke-opacity="0.3" stroke-width="12" />
      <polygon id="arrow-head" fill="white" opacity="0.35" />
    </svg>

    <!-- AI North (top) -->
    <div class="game-table__top" :data-player="seats.top">
      <AiHand
        v-if="seats.top != null"
        :player="gameState.players[seats.top]"
        position="top"
        :is-current="gameState.currentPlayer === seats.top"
        :is-target="nextFromHuman === seats.top"
      />
    </div>

    <!-- AI West (left) -->
    <div class="game-table__left" :data-player="seats.left">
      <AiHand
        v-if="seats.left != null"
        :player="gameState.players[seats.left]"
        position="left"
        :is-current="gameState.currentPlayer === seats.left"
        :is-target="nextFromHuman === seats.left"
      />
    </div>

    <!-- Center: Draw & Discard piles -->
    <div class="center-area">
      <div class="center-area__piles">
        <div v-if="gameState.recentPlays.length > 0" class="recent-plays">
          <div class="recent-plays__label">Card Play History</div>
          <div v-for="([, card], i) in [...gameState.recentPlays].reverse()" :key="i" class="recent-play">
            <CardFace :card="card" :index="-1" :playable="false" :disabled="false" :draggable="false" style="--card-index: 0; --card-total: 1;" />
          </div>
        </div>

        <div
          id="draw-pile"
          :class="['draw-pile', canDraw && 'draw-pile--active']"
          @click="onDrawClick"
        >
          <div class="card card--back card--large">
            <span class="card__uno-text">♛</span>
          </div>
        </div>

        <div class="discard-area">
          <DiscardPile v-if="top" :card="top" :last-player="lastPlayerIndex" />
        </div>

      </div>
      <button v-if="gameState.phase !== 'game_over'" class="menu-btn" @click="emit('menu')">Menu</button>
    </div>

    <!-- AI East (right) -->
    <div class="game-table__right" :data-player="seats.right">
      <AiHand
        v-if="seats.right != null"
        :player="gameState.players[seats.right]"
        position="right"
        :is-current="gameState.currentPlayer === seats.right"
        :is-target="nextFromHuman === seats.right"
      />
    </div>

    <!-- Human hand (bottom) -->
    <div class="game-table__bottom">
      <div :class="['human-hand', isHumanTurn && 'human-hand--active']">
        <div v-if="isHumanTurn" class="your-turn-indicator">It's your turn!</div>
        <div class="human-hand__label">
          <span v-if="gameState.phase !== 'game_over'" class="human-hand__name">{{ human.name }}</span>
          <button v-if="showUnoBtn" class="uno-btn" @click="emit('sayUno')">ONE!</button>
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
            :direction="gameState.direction"
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
