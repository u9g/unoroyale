import { onMounted, onUnmounted } from 'vue'

// Peak linear acceleration (m/s², gravity excluded) that counts as a shake
const SHAKE_THRESHOLD = 20
const COOLDOWN_MS = 1500

type MotionPermission = typeof DeviceMotionEvent & { requestPermission?: () => Promise<'granted' | 'denied'> }

export function useShake(onShake: () => void) {
  let lastShake = 0

  function onMotion(e: DeviceMotionEvent) {
    const a = e.acceleration
    if (!a || a.x == null || a.y == null || a.z == null) return
    if (Math.hypot(a.x, a.y, a.z) < SHAKE_THRESHOLD) return
    const now = Date.now()
    if (now - lastShake < COOLDOWN_MS) return
    lastShake = now
    onShake()
  }

  // iOS only hands out motion events after requestPermission() from a user gesture
  async function requestOnFirstGesture() {
    const MotionEvent = DeviceMotionEvent as MotionPermission
    if (!MotionEvent.requestPermission) return
    try {
      // Must be invoked on the class: WebKit rejects a detached call
      await MotionEvent.requestPermission()
    } catch {
      // Denied or unavailable: shake-to-feedback simply stays off
    }
  }

  onMounted(() => {
    window.addEventListener('devicemotion', onMotion)
    window.addEventListener('pointerdown', requestOnFirstGesture, { once: true })
  })
  onUnmounted(() => {
    window.removeEventListener('devicemotion', onMotion)
    window.removeEventListener('pointerdown', requestOnFirstGesture)
  })
}
