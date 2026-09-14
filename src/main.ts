import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { loadDeviceId } from './deviceId'
import { initUpdater } from './updater'
import { startDebugBridge } from './debugBridge'

loadDeviceId()
  .then(deviceId => {
    startDebugBridge(deviceId)
    return initUpdater(deviceId)
  })
  .then(() => createApp(App).mount('#app'))
