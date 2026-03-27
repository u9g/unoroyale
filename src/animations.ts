// Direction arrow and card animations (ported from web/js/animations.js)

// --- Direction Arrow ---

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
  if (start._humanArc || end._humanArc) {
    const arcRight = start._arcRight || end._arcRight
    const piles = table.querySelector('.center-area__piles')
    const pr = piles ? piles.getBoundingClientRect() : null
    const midY = (start.y + end.y) / 2
    cpX = pr ? (arcRight ? pr.right - tableRect.left + gap + 30 : pr.left - tableRect.left - gap - 30) : (arcRight ? tableRect.width - 20 : 20)
    cpY = midY
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

function lerp(a: ArrowPositions, b: ArrowPositions, t: number): ArrowPositions {
  return {
    sx: a.sx + (b.sx - a.sx) * t,
    sy: a.sy + (b.sy - a.sy) * t,
    cpX: a.cpX + (b.cpX - a.cpX) * t,
    cpY: a.cpY + (b.cpY - a.cpY) * t,
    ex: a.ex + (b.ex - a.ex) * t,
    ey: a.ey + (b.ey - a.ey) * t,
  }
}

export function updateArrow(animate: boolean) {
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
      currentArrow = lerp(from, target, t)
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

export function resetArrow() {
  prevArrow = null
  currentArrow = null
  if (animId) { cancelAnimationFrame(animId); animId = null }
}

// --- Discard Fly Animation ---

let prevDiscardKey: string | null = null

function discardKey(el: HTMLElement): string {
  return `${el.dataset.value || ''}${el.dataset.color || ''}`
}

function findDiscardSource(targetEl: HTMLElement): DOMRect | null {
  const table = targetEl.closest('.game-table')
  if (!table) return null

  const lastPlayer = parseInt(targetEl.dataset.lastPlayer || '-1', 10)

  if (lastPlayer === 0) {
    const age = Date.now() - ((window as any)._lastPlayedCardTime || 0)
    if ((window as any)._lastPlayedCardRect && age < 2000) {
      return (window as any)._lastPlayedCardRect
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

export function flyCardToDiscard(fromRect: DOMRect, toRect: DOMRect, targetEl: HTMLElement) {
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

export function updateDiscardAnimation(animate: boolean) {
  const discardEl = document.getElementById('discard-top')
  if (!discardEl) {
    prevDiscardKey = null
    ;(window as any)._lastPlayedCardRect = null
    ;(window as any)._lastPlayedCardTime = null
    return
  }

  const nextKey = discardKey(discardEl)
  if (!animate || !prevDiscardKey) {
    prevDiscardKey = nextKey
    if (!animate) {
      ;(window as any)._lastPlayedCardRect = null
      ;(window as any)._lastPlayedCardTime = null
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
  ;(window as any)._lastPlayedCardRect = null
  ;(window as any)._lastPlayedCardTime = null
}

// --- Draw Animation (card flies from draw pile to hand with 3D flip) ---
// Desktop version: source is the single draw pile card, no fan

export function updateDrawAnimation(animate: boolean) {
  const targetCard = document.querySelector('#human-hand-cards [data-card-index]:last-child') as HTMLElement | null
  const drawPile = document.querySelector('.draw-pile .card') as HTMLElement | null

  if (!animate || !targetCard || !drawPile || !(window as any)._lastDrawTime) return

  const age = Date.now() - ((window as any)._lastDrawTime || 0)
  if (age > 2000) {
    ;(window as any)._lastDrawTime = null
    return
  }

  const srcRect = drawPile.getBoundingClientRect()
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

  ;(window as any)._lastDrawTime = null
}

// --- Deal Animation ---
// Desktop version: cards fly from draw pile card to each hand with staggered 3D flip

export function animateDeal(onComplete?: () => void) {
  const drawPile = document.querySelector('.draw-pile .card') as HTMLElement | null
  if (!drawPile) { onComplete?.(); return }

  const srcRect = drawPile.getBoundingClientRect()

  // Collect all card targets: human hand cards
  const humanCards = Array.from(document.querySelectorAll('#human-hand-cards [data-card-index]')) as HTMLElement[]
  if (humanCards.length === 0) { onComplete?.(); return }

  // Hide all cards
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

    // Complete after last card finishes
    const totalTime = 750 + (humanCards.length - 1) * 80 + 50
    setTimeout(() => onComplete?.(), totalTime)
  })
}

// --- Capture helpers (called from click handlers) ---

export function capturePlayedCard(cardEl: HTMLElement) {
  ;(window as any)._lastPlayedCardRect = cardEl.getBoundingClientRect()
  ;(window as any)._lastPlayedCardTime = Date.now()
}

export function captureDrawPile() {
  ;(window as any)._lastDrawTime = Date.now()
}
