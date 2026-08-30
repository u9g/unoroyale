import { onMounted, onUnmounted } from 'vue'

// Tilt is the angle between the screen and the ground: ~90° held upright, ~0° lying flat
const UPRIGHT_DEG = 50
const FLAT_DEG = 38
const HOLD_UPRIGHT_MS = 150
const DROP_WITHIN_MS = 2000
const COOLDOWN_MS = 2000
const SNOOZE_KEY = 'uno_tilt_snooze_until'
const SNOOZE_MS = 1000 * 60 * 60 * 24 * 61 // 2 months

export function snoozeTiltDown() {
  localStorage.setItem(SNOOZE_KEY, String(Date.now() + SNOOZE_MS))
}

type MotionPermission = typeof DeviceMotionEvent & { requestPermission?: () => Promise<'granted' | 'denied'> }

export function useTiltDown(onTiltDown: () => void) {
  let uprightSince: number | null = null
  let armedAt: number | null = null
  let lastTrigger = 0

  function onMotion(e: DeviceMotionEvent) {
    const g = e.accelerationIncludingGravity
    if (!g || g.y == null || g.z == null) return
    const tilt = (Math.atan2(Math.abs(g.y), Math.abs(g.z)) * 180) / Math.PI
    const now = Date.now()

    if (tilt > UPRIGHT_DEG) {
      uprightSince ??= now
      if (now - uprightSince >= HOLD_UPRIGHT_MS) armedAt = now
      return
    }
    uprightSince = null

    if (tilt < FLAT_DEG && armedAt != null) {
      const armed = armedAt
      armedAt = null
      if (now - armed <= DROP_WITHIN_MS && now - lastTrigger >= COOLDOWN_MS) {
        lastTrigger = now
        if (now < Number(localStorage.getItem(SNOOZE_KEY))) return
        onTiltDown()
      }
    }
  }

  // iOS only hands out motion events after requestPermission() from a user gesture,
  // and WebKit only counts a completed tap (click), not pointerdown
  async function requestOnFirstGesture() {
    const MotionEvent = DeviceMotionEvent as MotionPermission
    if (!MotionEvent.requestPermission) return
    try {
      // Must be invoked on the class: WebKit rejects a detached call
      await MotionEvent.requestPermission()
    } catch {
      // Denied or unavailable: the gesture simply stays off
    }
  }

  onMounted(() => {
    window.addEventListener('devicemotion', onMotion)
    window.addEventListener('click', requestOnFirstGesture, { once: true })
  })
  onUnmounted(() => {
    window.removeEventListener('devicemotion', onMotion)
    window.removeEventListener('click', requestOnFirstGesture)
  })
}
