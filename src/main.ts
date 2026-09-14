import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { loadDeviceId } from './deviceId'
import { loadProfile } from './ranked'
import { initUpdater } from './updater'

Promise.all([loadDeviceId(), loadProfile()])
  .then(([deviceId]) => initUpdater(deviceId))
  .then(() => createApp(App).mount('#app'))
