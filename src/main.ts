import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { loadDeviceId } from './deviceId'
import { initUpdater } from './updater'

loadDeviceId()
  .then(initUpdater)
  .then(() => createApp(App).mount('#app'))
