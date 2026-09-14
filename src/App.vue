<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { Color } from './engine/card'
import { isWild } from './engine/card'
import { useGameController } from './gameController'
import type { Mode } from './gameController'
import { MIN_PLAYERS, MAX_PLAYERS } from './engine/game'
import SegmentedPicker from './components/SegmentedPicker.vue'
import RankedResultOverlay from './components/RankedResultOverlay.vue'
import { ROOMS, claimName, claimedName, profile, roomFor } from './ranked'
import GameBoard from './components/GameBoard.vue'
import GameOverOverlay from './components/GameOverOverlay.vue'
import TutorialOverlay from './components/TutorialOverlay.vue'
import FeedbackSheet from './components/FeedbackSheet.vue'
import { snoozeTiltDown, useTiltDown } from './tiltDown'
import { deviceId } from './deviceId'
import { bundleVersion } from './updater'
import rulesContent from './rules.md?raw'

const controller = useGameController()

// Only my own phone gets the build chip; ota-try.sh pins it to a bundle and this says which one took
const MY_DEVICE_ID = 'af44f784-965f-496f-b0eb-b86e6c810399'
const showBuildChip = deviceId === MY_DEVICE_ID

const playerNameInput = ref('')
const PLAYER_COUNT_OPTIONS = [MIN_PLAYERS, MAX_PLAYERS]
const savedPlayerCount = Number(localStorage.getItem('uno_player_count'))
const playerCountInput = ref(PLAYER_COUNT_OPTIONS.includes(savedPlayerCount) ? savedPlayerCount : MAX_PLAYERS)
const MODE_OPTIONS = ['Ranked', 'Casual']
const modeInput = ref(localStorage.getItem('uno_mode') === 'Casual' ? 'Casual' : 'Ranked')
const mode = computed((): Mode => (modeInput.value === 'Ranked' ? 'ranked' : 'casual'))
const room = computed(() => roomFor(profile.value.trophies))
const nextRoom = computed(() => ROOMS.find(r => r.min > profile.value.trophies) ?? null)
const roomProgress = computed(() => {
  const next = nextRoom.value
  if (!next) return 100
  const span = next.min - room.value.min
  return Math.round(((profile.value.trophies - room.value.min) / span) * 100)
})
const wonLastRanked = computed(() => controller.gameState.value?.finished[0] === 0)
const claimError = ref('')
const claiming = ref(false)
const startError = ref('')
const starting = ref(false)
const startLabel = computed(() => {
  if (mode.value === 'casual') return 'Start Game'
  if (claiming.value) return 'Claiming...'
  if (starting.value) return 'Finding match...'
  return claimedName.value ? 'Find Match' : 'Claim Name & Play'
})
const showMenu = ref(false)
const deviceIdCopied = ref(false)
async function copyDeviceId() {
  await navigator.clipboard.writeText(deviceId)
  deviceIdCopied.value = true
  setTimeout(() => (deviceIdCopied.value = false), 1500)
}
const showRules = ref(false)
const rulesExpanded = ref(false)
const choosingColor = ref(false)
const isNewGame = ref(false)
const showUnoPenalty = ref(false)
const showTutorial = ref(false)
const showFeedback = ref(false)
const feedbackFromTilt = ref(false)
useTiltDown(() => { showFeedback.value = true; feedbackFromTilt.value = true })
function closeFeedback() {
  if (feedbackFromTilt.value) snoozeTiltDown()
  showFeedback.value = false
  feedbackFromTilt.value = false
}
const gameKey = ref(0)
let pendingWildIndex: number | null = null

// Expose internals for screenshot tooling (dev only)
if (import.meta.env.DEV) {
  ;(window as any).__app = { controller, choosingColor, isNewGame, showTutorial }
}

onMounted(() => {
  const saved = localStorage.getItem('uno_player_name')
  if (saved) playerNameInput.value = saved
  // Trophies are the server's to state; this is a cache of its answer
  void controller.syncFromServer()
})

async function startGame() {
  const name = playerNameInput.value.trim() || 'Player'
  startError.value = ''

  // Ranked names are claimed once per install; a claim that cannot reach the
  // server is not fatal, it just retries the next time a match starts
  if (mode.value === 'ranked' && !claimedName.value) {
    claiming.value = true
    const outcome = await claimName(name)
    claiming.value = false
    if (outcome === 'taken') {
      claimError.value = `${name} is already taken — pick another name.`
      return
    }
    if (outcome === 'invalid') {
      claimError.value = 'Ranked names are 3-30 letters, numbers or underscores.'
      return
    }
  }

  claimError.value = ''
  localStorage.setItem('uno_player_name', name)
  localStorage.setItem('uno_player_count', String(playerCountInput.value))
  localStorage.setItem('uno_mode', modeInput.value)
  isNewGame.value = true
  gameKey.value++
  try {
    starting.value = true
    await controller.startGame(mode.value === 'ranked' ? claimedName.value || name : name, playerCountInput.value, mode.value)
  } catch {
    // Ranked is decided by the server, so there is no offline fallback for it
    startError.value = 'Ranked needs a connection. Casual works offline.'
  } finally {
    starting.value = false
  }
}

function handlePlayCard(index: number) {
  if (!controller.gameState.value) return
  const hand = controller.gameState.value.players[0].hand
  const card = hand[index]
  if (isWild(card)) {
    if (hand.length === 1) {
      const colors: Color[] = ['red', 'blue', 'green', 'yellow']
      controller.playCard(index, colors[Math.floor(Math.random() * colors.length)])
    } else {
      pendingWildIndex = index
      choosingColor.value = true
    }
  } else {
    controller.playCard(index)
  }
}

function handleChooseColor(color: Color) {
  if (pendingWildIndex != null) {
    controller.playCard(pendingWildIndex, color)
    pendingWildIndex = null
    choosingColor.value = false
  }
}

function cancelColor() {
  pendingWildIndex = null
  choosingColor.value = false
}

function quitToLobby() {
  showMenu.value = false
  choosingColor.value = false
  pendingWildIndex = null
  controller.quitToLobby()
}

function newGameRestart() {
  showMenu.value = false
  choosingColor.value = false
  pendingWildIndex = null
  isNewGame.value = true
  gameKey.value++
  controller.restartGame()
}

function onDealComplete() {
  isNewGame.value = false
}

function placements(): string[] {
  const gs = controller.gameState.value
  if (!gs) return []
  return gs.finished.map(i => gs.players[i].name)
}

// Watch for UNO penalty on the human player
watch(() => controller.gameState.value?.unoPenalty, (penalty) => {
  if (penalty) {
    showUnoPenalty.value = true
  }
})

// Simple markdown-to-HTML (covers headings, bold, tables, lists, paragraphs)
function renderMarkdown(md: string): string {
  let html = md
    // Tables
    .replace(/^\|(.+)\|$/gm, (match) => {
      const cells = match.split('|').filter(c => c.trim())
      if (cells.every(c => /^[\s-:]+$/.test(c))) return '<!--sep-->'
      return '<tr>' + cells.map(c => `<td>${c.trim()}</td>`).join('') + '</tr>'
    })
    // Headings
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Unordered list items
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    // Ordered list items
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')

  // Wrap consecutive <li> in <ul>
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>')
  // Wrap consecutive <tr> in <table>
  html = html.replace(/((?:<tr>.*<\/tr>\n?|<!--sep-->\n?)+)/g, (match) => {
    const rows = match.replace(/<!--sep-->\n?/g, '').trim()
    // First row becomes thead
    const first = rows.match(/<tr>.*?<\/tr>/)
    if (first) {
      const header = first[0].replace(/<td>/g, '<th>').replace(/<\/td>/g, '</th>')
      const body = rows.replace(first[0], '')
      return `<table><thead>${header}</thead><tbody>${body}</tbody></table>`
    }
    return `<table>${rows}</table>`
  })
  // Paragraphs for remaining lines
  html = html.replace(/^(?!<[hultop])(.+)$/gm, '<p>$1</p>')
  // Clean up empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, '')

  return html
}
</script>

<template>
  <div class="game-container">
    <!-- Lobby -->
    <template v-if="controller.phase.value === 'lobby'">
      <div class="lobby">
        <h1 class="lobby__title">Card Royale</h1>
        <a
          v-if="showBuildChip"
          class="build-chip"
          :href="`https://github.com/u9g/unoroyale/commit/${bundleVersion}`"
          target="_blank"
          rel="noreferrer"
        >OTA {{ bundleVersion }}</a>
        <form :class="['lobby__form', mode === 'ranked' && 'lobby__form--ranked']" @submit.prevent="startGame">
          <p v-if="mode === 'ranked' && claimedName" class="lobby__claimed">
            Playing as <strong>{{ claimedName }}</strong>
          </p>
          <input
            v-else
            v-model="playerNameInput"
            type="text"
            :placeholder="mode === 'ranked' ? 'Choose your ranked name' : 'Enter your name'"
            :maxlength="mode === 'ranked' ? 30 : undefined"
            class="lobby__input"
            required
            @input="claimError = ''; startError = ''"
          />
          <p v-if="claimError || startError" class="lobby__error">{{ claimError || startError }}</p>

          <SegmentedPicker v-model="modeInput" :options="MODE_OPTIONS" class="segmented--wide" />

          <div v-if="mode === 'ranked'" class="room" :style="{ '--room-accent': room.accent }">
            <div class="room__head">
              <span class="room__name">{{ room.name }}</span>
              <span class="room__trophies">{{ profile.trophies }} ♛</span>
            </div>
            <div class="room__track">
              <div class="room__fill" :style="{ width: roomProgress + '%' }" />
            </div>
            <span class="room__next">
              {{ nextRoom ? `${nextRoom.min - profile.trophies} ♛ to ${nextRoom.name}` : 'Top room reached' }}
            </span>
          </div>

          <label v-else class="lobby__players">
            <SegmentedPicker v-model="playerCountInput" :options="PLAYER_COUNT_OPTIONS" />
            <span>players at the table</span>
          </label>

          <button type="submit" class="lobby__btn" :disabled="claiming || starting">{{ startLabel }}</button>
        </form>
        <button type="button" class="lobby__tutorial-btn" @click="showTutorial = true">How to Play</button>
        <button type="button" class="lobby__tutorial-btn" @click="showRules = true">Game Info</button>
        <button type="button" class="lobby__tutorial-btn" @click="showFeedback = true">Give Feedback</button>
      </div>
    </template>

    <!-- Playing -->
    <template v-else-if="controller.phase.value === 'playing' && controller.gameState.value">
      <GameBoard
        :key="gameKey"
        :game-state="controller.gameState.value"
        :choosing-color="choosingColor"
        :is-new-game="isNewGame"
        @play-card="handlePlayCard"
        @draw-card="controller.drawCard"
        @say-uno="controller.sayUno"
        @new-game="newGameRestart"
        @choose-color="handleChooseColor"
        @cancel-color="cancelColor"
        @reorder-hand="controller.reorderHand"
        @deal-complete="onDealComplete"
        @menu="showMenu = !showMenu"
      />
    </template>

    <!-- Game Over -->
    <template v-else-if="controller.phase.value === 'game_over' && controller.gameState.value">
      <GameBoard
        :game-state="controller.gameState.value"
        :choosing-color="false"
        @play-card="() => {}"
        @draw-card="() => {}"
        @say-uno="() => {}"
        @new-game="newGameRestart"
        @choose-color="() => {}"
        @cancel-color="() => {}"
        @reorder-hand="() => {}"
        @deal-complete="() => {}"
        @menu="showMenu = !showMenu"
      />
      <RankedResultOverlay
        v-if="controller.mode.value === 'ranked' && controller.lastRanked.value"
        :result="controller.lastRanked.value"
        :won="wonLastRanked"
        @play-again="newGameRestart"
        @main-menu="quitToLobby"
      />
      <GameOverOverlay v-else :placements="placements()" @play-again="newGameRestart" />
    </template>

    <!-- Pause Menu -->
    <div v-if="showMenu && controller.phase.value !== 'lobby'" class="modal-overlay" @click="showMenu = false">
      <div class="pause-menu" @click.stop>
        <h2 class="pause-menu__title">Paused</h2>
        <button class="pause-menu__btn pause-menu__btn--resume" @click="showMenu = false">Resume</button>
        <button class="pause-menu__btn pause-menu__btn--tutorial" @click="showMenu = false; showTutorial = true">How to Play</button>
        <button class="pause-menu__btn pause-menu__btn--main-menu" @click="quitToLobby">Main Menu</button>
        <label class="pause-menu__toggle">
          <input type="checkbox" :checked="controller.instantCpu.value" @change="controller.setInstantCpu(($event.target as HTMLInputElement).checked)">
          <span class="toggle-check"></span>
          <span>Make computer players instant</span>
        </label>
        <button class="pause-menu__btn pause-menu__btn--feedback" @click="showMenu = false; showFeedback = true">Give Feedback</button>
        <button class="pause-menu__btn pause-menu__btn--new-game" @click="newGameRestart">New Game</button>
      </div>
    </div>

    <!-- Rules Modal -->
    <div v-if="showRules" class="modal-overlay" @click="showRules = false">
      <div :class="['rules-modal', rulesExpanded && 'rules-modal--expanded']" @click.stop>
        <div class="rules-modal__header">
          <h2>Game Info</h2>
          <div class="rules-modal__actions">
            <button class="rules-modal__expand" @click="rulesExpanded = !rulesExpanded">{{ rulesExpanded ? '−' : '+' }}</button>
            <button class="rules-modal__close" @click="showRules = false; rulesExpanded = false">&times;</button>
          </div>
        </div>
        <div class="rules-modal__body">
          <div v-html="renderMarkdown(rulesContent)"></div>
          <button type="button" class="rules-modal__device" @click="copyDeviceId">{{ deviceIdCopied ? 'Copied' : 'Copy Device ID' }}</button>
        </div>
      </div>
    </div>

    <!-- Tutorial -->
    <TutorialOverlay v-if="showTutorial" @close="showTutorial = false" />

    <!-- Feedback -->
    <FeedbackSheet v-if="showFeedback" @close="closeFeedback" />

    <!-- UNO Penalty Popup -->
    <div v-if="showUnoPenalty" class="uno-penalty-popup" @click="showUnoPenalty = false">
      <div class="uno-penalty-popup__card" @click.stop>
        <h3 class="uno-penalty-popup__title">You forgot to say ONE!</h3>
        <p class="uno-penalty-popup__text">When you play your second-to-last card, press the <strong>ONE</strong> button before playing your final card. If you don't, you'll draw 2 penalty cards instead of winning.</p>
        <button class="uno-penalty-popup__btn" @click="showUnoPenalty = false">Got it</button>
      </div>
    </div>
  </div>
</template>
