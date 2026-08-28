<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  modelValue: number
  min: number
  max: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const ITEM_HEIGHT = 40
const ITEM_ANGLE = (22 * Math.PI) / 180
const RADIUS = ITEM_HEIGHT / (2 * Math.tan(ITEM_ANGLE / 2))
const CAMERA_DISTANCE = RADIUS * 3
// UIScrollView's normal deceleration rate, applied per millisecond
const DECELERATION = 0.998
const MIN_VELOCITY = 0.0002
const RUBBER_BAND = 0.55
const SNAP_STIFFNESS = 0.16
const MAX_DRAW_ANGLE = Math.PI / 2

const values = Array.from({ length: props.max - props.min + 1 }, (_, i) => props.min + i)
const last = values.length - 1
const canvas = ref<HTMLCanvasElement | null>(null)

// Drum position in item units; integer values sit exactly on the highlight
let position = props.modelValue - props.min
let velocity = 0
let frame = 0
let dragging = false
let lastY = 0
let lastTime = 0

let gl: WebGLRenderingContext | null = null
let positionBuffer: WebGLBuffer | null = null
let uvBuffer: WebGLBuffer | null = null
let fadeBuffer: WebGLBuffer | null = null
let resizeObserver: ResizeObserver | null = null

function nearestIndex(): number {
  return Math.max(0, Math.min(last, Math.round(position)))
}

function syncModel() {
  const value = values[nearestIndex()]
  if (value !== props.modelValue) emit('update:modelValue', value)
}

watch(() => props.modelValue, v => {
  if (v - props.min !== nearestIndex()) snapTo(v - props.min)
})

function rubberBand(x: number): number {
  if (x >= 0 && x <= last) return x
  const edge = x < 0 ? 0 : last
  const overshoot = Math.abs(x - edge)
  const dimension = last + 1
  const damped = (1 - 1 / ((overshoot * RUBBER_BAND) / dimension + 1)) * dimension
  return edge + Math.sign(x - edge) * damped
}

function stop() {
  cancelAnimationFrame(frame)
  frame = 0
}

function snapTo(target: number) {
  stop()
  const step = () => {
    const diff = target - position
    if (Math.abs(diff) < 0.0005) {
      position = target
      render()
      syncModel()
      return
    }
    position += diff * SNAP_STIFFNESS
    render()
    syncModel()
    frame = requestAnimationFrame(step)
  }
  frame = requestAnimationFrame(step)
}

function decelerate() {
  stop()
  let prev = performance.now()
  const step = (now: number) => {
    const dt = now - prev
    prev = now
    const outOfBounds = position < 0 || position > last
    if (Math.abs(velocity) < MIN_VELOCITY || outOfBounds) {
      snapTo(nearestIndex())
      return
    }
    position += velocity * dt
    velocity *= DECELERATION ** dt
    render()
    syncModel()
    frame = requestAnimationFrame(step)
  }
  frame = requestAnimationFrame(step)
}

function onPointerDown(e: PointerEvent) {
  stop()
  dragging = true
  velocity = 0
  lastY = e.clientY
  lastTime = e.timeStamp
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
}

function onPointerMove(e: PointerEvent) {
  if (!dragging) return
  const dy = e.clientY - lastY
  const dt = Math.max(1, e.timeStamp - lastTime)
  velocity = -dy / ITEM_HEIGHT / dt
  lastY = e.clientY
  lastTime = e.timeStamp
  position = rubberBand(position - dy / ITEM_HEIGHT)
  render()
  syncModel()
}

function onPointerUp() {
  if (!dragging) return
  dragging = false
  decelerate()
}

let wheelTimer: ReturnType<typeof setTimeout> | null = null
function onWheel(e: WheelEvent) {
  e.preventDefault()
  stop()
  position = rubberBand(position + e.deltaY / ITEM_HEIGHT)
  render()
  syncModel()
  if (wheelTimer) clearTimeout(wheelTimer)
  wheelTimer = setTimeout(() => snapTo(nearestIndex()), 80)
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return
  e.preventDefault()
  snapTo(Math.max(0, Math.min(last, nearestIndex() + (e.key === 'ArrowDown' ? 1 : -1))))
}

const VERTEX_SHADER = `
  attribute vec2 a_position;
  attribute vec2 a_uv;
  attribute float a_fade;
  varying vec2 v_uv;
  varying float v_fade;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_uv = a_uv;
    v_fade = a_fade;
  }
`

const FRAGMENT_SHADER = `
  precision mediump float;
  uniform sampler2D u_atlas;
  varying vec2 v_uv;
  varying float v_fade;
  void main() {
    gl_FragColor = texture2D(u_atlas, v_uv) * v_fade;
  }
`

function compile(ctx: WebGLRenderingContext, type: number, source: string): WebGLShader {
  const shader = ctx.createShader(type)!
  ctx.shaderSource(shader, source)
  ctx.compileShader(shader)
  return shader
}

function buildAtlas(): HTMLCanvasElement {
  const dpr = window.devicePixelRatio || 1
  const cellWidth = 64 * dpr
  const cellHeight = ITEM_HEIGHT * dpr
  const atlas = document.createElement('canvas')
  atlas.width = cellWidth
  atlas.height = cellHeight * values.length
  const ctx = atlas.getContext('2d')!
  ctx.fillStyle = '#fff'
  ctx.font = `700 ${21.6 * dpr}px system-ui, -apple-system, sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  values.forEach((value, i) => ctx.fillText(String(value), cellWidth / 2, cellHeight * (i + 0.5)))
  return atlas
}

function initGl() {
  const el = canvas.value!
  gl = el.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: true })
  if (!gl) return
  const program = gl.createProgram()!
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER))
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER))
  gl.linkProgram(program)
  gl.useProgram(program)

  const bind = (name: string, size: number): WebGLBuffer => {
    const buffer = gl!.createBuffer()!
    gl!.bindBuffer(gl!.ARRAY_BUFFER, buffer)
    const location = gl!.getAttribLocation(program, name)
    gl!.enableVertexAttribArray(location)
    gl!.vertexAttribPointer(location, size, gl!.FLOAT, false, 0, 0)
    return buffer
  }
  positionBuffer = bind('a_position', 2)
  uvBuffer = bind('a_uv', 2)
  fadeBuffer = bind('a_fade', 1)

  const texture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, buildAtlas())
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

  gl.enable(gl.BLEND)
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
}

function resize() {
  const el = canvas.value
  if (!el || !gl) return
  const dpr = window.devicePixelRatio || 1
  el.width = Math.round(el.clientWidth * dpr)
  el.height = Math.round(el.clientHeight * dpr)
  gl.viewport(0, 0, el.width, el.height)
  render()
}

function render() {
  const el = canvas.value
  if (!el || !gl) return
  const halfWidth = el.clientWidth / 2
  const halfHeight = el.clientHeight / 2
  const textHalfWidth = 32
  const selected = nearestIndex()

  const positions: number[] = []
  const uvs: number[] = []
  const fades: number[] = []

  // Project a point on the drum surface at angle theta into clip space; later values sit lower
  const project = (theta: number, x: number): [number, number] => {
    const y = -RADIUS * Math.sin(theta)
    const z = RADIUS * Math.cos(theta) - RADIUS
    const scale = CAMERA_DISTANCE / (CAMERA_DISTANCE - z)
    return [(x * scale) / halfWidth, (y * scale) / halfHeight]
  }

  values.forEach((_, i) => {
    const center = (i - position) * ITEM_ANGLE
    if (Math.abs(center) >= MAX_DRAW_ANGLE) return
    const brightness = (i === selected ? 1 : 0.45) * (1 - Math.abs(center) / MAX_DRAW_ANGLE)
    const [tlX, tlY] = project(center + ITEM_ANGLE / 2, -textHalfWidth)
    const [trX, trY] = project(center + ITEM_ANGLE / 2, textHalfWidth)
    const [blX, blY] = project(center - ITEM_ANGLE / 2, -textHalfWidth)
    const [brX, brY] = project(center - ITEM_ANGLE / 2, textHalfWidth)
    const v0 = i / values.length
    const v1 = (i + 1) / values.length
    positions.push(tlX, tlY, blX, blY, trX, trY, trX, trY, blX, blY, brX, brY)
    uvs.push(0, v1, 0, v0, 1, v1, 1, v1, 0, v0, 1, v0)
    for (let k = 0; k < 6; k++) fades.push(brightness)
  })

  gl.clearColor(0, 0, 0, 0)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.DYNAMIC_DRAW)
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvs), gl.DYNAMIC_DRAW)
  gl.bindBuffer(gl.ARRAY_BUFFER, fadeBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(fades), gl.DYNAMIC_DRAW)
  gl.drawArrays(gl.TRIANGLES, 0, positions.length / 2)
}

onMounted(() => {
  initGl()
  resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(canvas.value!)
  resize()
})

onUnmounted(() => {
  stop()
  resizeObserver?.disconnect()
})
</script>

<template>
  <div
    class="wheel"
    role="spinbutton"
    tabindex="0"
    :aria-valuenow="modelValue"
    :aria-valuemin="min"
    :aria-valuemax="max"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
    @wheel="onWheel"
    @keydown="onKeyDown"
  >
    <canvas ref="canvas" class="wheel__canvas" />
    <div class="wheel__highlight" />
  </div>
</template>
