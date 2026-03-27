<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { Color } from './engine/card'
import { isWild } from './engine/card'
import { useGameController } from './gameController'
import GameBoard from './components/GameBoard.vue'
import GameOverOverlay from './components/GameOverOverlay.vue'
import TutorialOverlay from './components/TutorialOverlay.vue'
import rulesContent from './rules.md?raw'

const controller = useGameController()

const playerNameInput = ref('')
const showMenu = ref(false)
const showRules = ref(false)
const rulesExpanded = ref(false)
const choosingColor = ref(false)
const isNewGame = ref(false)
const showUnoPenalty = ref(false)
const showTutorial = ref(false)
const gameKey = ref(0)
let pendingWildIndex: number | null = null

// Expose internals for screenshot tooling (dev only)
if (import.meta.env.DEV) {
  ;(window as any).__app = { controller, choosingColor, isNewGame, showTutorial }
}

onMounted(() => {
  const saved = localStorage.getItem('uno_player_name')
  if (saved) playerNameInput.value = saved
})

function startGame() {
  const name = playerNameInput.value.trim() || 'Player'
  localStorage.setItem('uno_player_name', name)
  isNewGame.value = true
  gameKey.value++
  controller.startGame(name)
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

function winnerName(): string {
  const gs = controller.gameState.value
  if (!gs || gs.winner == null) return ''
  return gs.players[gs.winner].name
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
        <h1 class="lobby__title">UNO Royale</h1>
        <form class="lobby__form" @submit.prevent="startGame">
          <input
            v-model="playerNameInput"
            type="text"
            placeholder="Enter your name"
            class="lobby__input"
            required
          />
          <button type="submit" class="lobby__btn">Start Game</button>
        </form>
        <button type="button" class="lobby__tutorial-btn" @click="showTutorial = true">How to Play</button>
        <button type="button" class="lobby__tutorial-btn" @click="showRules = true">Game Info</button>
        <a class="lobby__tutorial-btn" href="mailto:uno@u9g.dev?subject=I%20have%20advice">Give Feedback</a>
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
      <GameOverOverlay :winner-name="winnerName()" @play-again="newGameRestart" />
    </template>

    <!-- Pause Menu -->
    <div v-if="showMenu && controller.phase.value !== 'lobby'" class="modal-overlay" @click="showMenu = false">
      <div class="pause-menu" @click.stop>
        <h2 class="pause-menu__title">Paused</h2>
        <button class="pause-menu__btn pause-menu__btn--resume" @click="showMenu = false">Resume</button>
        <button class="pause-menu__btn pause-menu__btn--tutorial" @click="showMenu = false; showTutorial = true">How to Play</button>
        <button class="pause-menu__btn pause-menu__btn--rules" @click="showMenu = false; showRules = true">Game Info</button>
        <label class="pause-menu__toggle">
          <input type="checkbox" :checked="controller.instantCpu.value" @change="controller.setInstantCpu(($event.target as HTMLInputElement).checked)">
          <span class="toggle-check"></span>
          <span>Make computer players instant</span>
        </label>
        <a class="pause-menu__btn pause-menu__btn--feedback" href="mailto:uno@u9g.dev?subject=I%20have%20advice">Give Feedback</a>
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
        <div class="rules-modal__body" v-html="renderMarkdown(rulesContent)"></div>
      </div>
    </div>

    <!-- Tutorial -->
    <TutorialOverlay v-if="showTutorial" @close="showTutorial = false" />

    <!-- UNO Penalty Popup -->
    <div v-if="showUnoPenalty" class="uno-penalty-popup" @click="showUnoPenalty = false">
      <div class="uno-penalty-popup__card" @click.stop>
        <h3 class="uno-penalty-popup__title">You forgot to say UNO!</h3>
        <p class="uno-penalty-popup__text">When you play your second-to-last card, press the <strong>UNO</strong> button before playing your final card. If you don't, you'll draw 2 penalty cards instead of winning.</p>
        <button class="uno-penalty-popup__btn" @click="showUnoPenalty = false">Got it</button>
      </div>
    </div>
  </div>
</template>
