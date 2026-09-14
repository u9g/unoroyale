import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { loadDeviceId } from './deviceId'
import { loadClaimedName, loadProfile } from './ranked'
import { initUpdater } from './updater'

Promise.all([loadDeviceId(), loadProfile(), loadClaimedName()])
  .then(([deviceId]) => initUpdater(deviceId))
  .then(() => createApp(App).mount('#app'))
