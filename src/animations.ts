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

export function updateDrawAnimation(animate: boolean) {
  const targetCard = document.querySelector('#human-hand-cards [data-card-index]:last-child') as HTMLElement | null
  const fromRect = (window as any)._lastDrawPileRect as DOMRect | null
  const age = Date.now() - ((window as any)._lastDrawTime || 0)

  if (!animate || !fromRect || !targetCard || age > 2000) {
    if (!animate || age > 2000 || !targetCard) {
      ;(window as any)._lastDrawPileRect = null
      ;(window as any)._lastDrawTime = null
    }
    return
  }

  const destRect = targetCard.getBoundingClientRect()
  targetCard.style.visibility = 'hidden'
  targetCard.style.opacity = '0'

  const flipper = document.createElement('div')
  flipper.style.cssText = `
    position: fixed; z-index: 50; pointer-events: none;
    left: ${fromRect.left}px; top: ${fromRect.top}px;
    width: ${fromRect.width}px; height: ${fromRect.height}px;
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

  // Replenish fan
  const fanCard = document.querySelector('#draw-pile .card-fan__card:last-child') as HTMLElement | null
  const deckCard = document.querySelector('#draw-pile .draw-pile__deck') as HTMLElement | null
  if (fanCard && deckCard) {
    fanCard.remove()
    setTimeout(() => replenishFan(deckCard, null), 250)
  }

  ;(window as any)._lastDrawPileRect = null
  ;(window as any)._lastDrawTime = null
}

// --- Deal Animation ---

function flyClone(fromRect: DOMRect, toRect: DOMRect, className: string, innerHTML: string, duration: number, zIndex: number): HTMLElement {
  const clone = document.createElement('div')
  clone.className = className
  clone.innerHTML = innerHTML
  clone.style.cssText = `
    position: fixed; z-index: ${zIndex}; pointer-events: none;
    left: ${toRect.left}px; top: ${toRect.top}px;
    width: ${toRect.width}px; height: ${toRect.height}px;
  `
  document.body.appendChild(clone)

  const anim = clone.animate([
    { left: fromRect.left + 'px', top: fromRect.top + 'px', width: fromRect.width + 'px', height: fromRect.height + 'px' },
    { left: toRect.left + 'px', top: toRect.top + 'px', width: toRect.width + 'px', height: toRect.height + 'px' },
  ], { duration, easing: 'cubic-bezier(0.25, 1, 0.5, 1)', fill: 'forwards' })

  ;(clone as any)._anim = anim
  return clone
}

function wait(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, ms))
}

function replenishFan(deckCard: HTMLElement, fanCardEl: HTMLElement | null) {
  const container = fanCardEl ? fanCardEl.parentElement : deckCard.parentElement
  if (!container) return

  const easing = 'cubic-bezier(0.25, 1, 0.5, 1)'
  const slideDuration = 300

  const siblings = Array.from(container.querySelectorAll('.card-fan__card')).filter(c => c !== fanCardEl) as HTMLElement[]
  const beforeRects = siblings.map(c => c.getBoundingClientRect())

  if (fanCardEl) fanCardEl.remove()

  const newCard = document.createElement('div')
  newCard.className = 'card card--back card--large card-fan__card'
  newCard.innerHTML = '<span class="card__uno-text">UNO</span>'

  const firstFan = container.querySelector('.card-fan__card')
  if (firstFan) {
    container.insertBefore(newCard, firstFan)
  } else {
    container.appendChild(newCard)
  }

  const afterRects = siblings.map(c => c.getBoundingClientRect())
  const newCardRect = newCard.getBoundingClientRect()
  const deckRect = deckCard.getBoundingClientRect()

  siblings.forEach((c, i) => {
    const dx = beforeRects[i].left - afterRects[i].left
    if (Math.abs(dx) > 0.5) {
      c.animate([
        { transform: `translateX(${dx}px)` },
        { transform: 'translateX(0)' },
      ], { duration: slideDuration, easing })
    }
  })

  const newDx = deckRect.left - newCardRect.left
  newCard.animate([
    { transform: `translateX(${newDx}px)` },
    { transform: 'translateX(0)' },
  ], { duration: slideDuration, easing })
}

export function animateDeal(onComplete?: () => void) {
  _animateDeal().then(() => onComplete?.())
}

async function _animateDeal() {
  const deckCard = document.querySelector('#draw-pile .draw-pile__deck') as HTMLElement | null
  if (!deckCard) return

  const table = document.querySelector('.game-table') as HTMLElement | null
  if (!table) return

  const fanCards = Array.from(document.querySelectorAll('#draw-pile .card-fan__card')) as HTMLElement[]
  const backClass = 'card card--back card--large'
  const backUno = '<span class="card__uno-text">UNO</span>'
  const cardsContainer = deckCard.parentElement!

  const targets: { el: HTMLElement; player: number }[] = []
  const aiSlots = [
    { selector: '.game-table__left .ai-hand__cards .card', player: 1 },
    { selector: '.game-table__top .ai-hand__cards .card', player: 2 },
    { selector: '.game-table__right .ai-hand__cards .card', player: 3 },
  ]

  for (const slot of aiSlots) {
    const cards = table.querySelectorAll(slot.selector)
    cards.forEach(c => targets.push({ el: c as HTMLElement, player: slot.player }))
  }

  const humanCards = table.querySelectorAll('#human-hand-cards [data-card-index]')
  humanCards.forEach(c => targets.push({ el: c as HTMLElement, player: 0 }))

  const discardEl = document.getElementById('discard-top')
  if (targets.length === 0) return

  // Clockwise dealing order
  const perPlayer: { el: HTMLElement; player: number }[][] = [[], [], [], []]
  targets.forEach(t => perPlayer[t.player].push(t))
  const dealt: { el: HTMLElement; player: number }[] = []
  const maxCards = Math.max(...perPlayer.map(p => p.length))
  for (let i = 0; i < maxCards; i++) {
    for (const p of [0, 1, 2, 3]) {
      if (i < perPlayer[p].length) dealt.push(perPlayer[p][i])
    }
  }

  // Hide all targets and fan
  dealt.forEach(t => { t.el.style.visibility = 'hidden'; t.el.style.opacity = '0' })
  fanCards.forEach(fc => { fc.style.visibility = 'hidden'; fc.style.opacity = '0' })
  if (discardEl) { discardEl.style.visibility = 'hidden'; discardEl.style.opacity = '0' }

  const flyDuration = 250
  const dealDelay = 120

  // Phase 1: Populate fan from deck
  for (let i = 0; i < fanCards.length; i++) {
    const fc = fanCards[i]
    const clone = flyClone(deckCard.getBoundingClientRect(), fc.getBoundingClientRect(), backClass, backUno, flyDuration, 50 + i)
    ;(clone as any)._anim.finished.then(() => {
      clone.remove()
      fc.style.visibility = ''
      fc.style.opacity = ''
    })
    if (i < fanCards.length - 1) await wait(80)
  }
  await wait(flyDuration + 30)

  // Phase 2: Deal cards one at a time from fan
  for (let i = 0; i < dealt.length; i++) {
    const t = dealt[i]
    const fc = cardsContainer.querySelector('.card-fan__card:last-child') as HTMLElement | null
    if (!fc) break

    const fanRect = fc.getBoundingClientRect()
    fc.style.visibility = 'hidden'
    const clone = flyClone(fanRect, t.el.getBoundingClientRect(), backClass, backUno, flyDuration, 60 + i)
    ;(clone as any)._anim.finished.then(() => {
      clone.remove()
      t.el.style.visibility = ''
      t.el.style.opacity = ''
    })

    await wait(dealDelay / 2)
    replenishFan(deckCard, fc)
    await wait(dealDelay / 2)
  }

  await wait(50)

  // Phase 3: Deal discard from fan
  if (discardEl) {
    const fc = cardsContainer.querySelector('.card-fan__card:last-child') as HTMLElement | null
    if (fc) {
      const fanRect = fc.getBoundingClientRect()
      fc.style.visibility = 'hidden'
      const clone = flyClone(fanRect, discardEl.getBoundingClientRect(), backClass, backUno, flyDuration, 90)
      ;(clone as any)._anim.finished.then(() => {
        clone.remove()
        discardEl.style.visibility = ''
        discardEl.style.opacity = ''
      })
      replenishFan(deckCard, fc)
      await wait(flyDuration + 100)
    }
  }
}

// --- Capture helpers (called from click handlers) ---

export function capturePlayedCard(cardEl: HTMLElement) {
  ;(window as any)._lastPlayedCardRect = cardEl.getBoundingClientRect()
  ;(window as any)._lastPlayedCardTime = Date.now()
}

export function captureDrawPile() {
  const fanCard = document.querySelector('#draw-pile .card-fan__card:last-child') as HTMLElement | null
  if (fanCard) {
    ;(window as any)._lastDrawPileRect = fanCard.getBoundingClientRect()
    ;(window as any)._lastDrawTime = Date.now()
  }
}
