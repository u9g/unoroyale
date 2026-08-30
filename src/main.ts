import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { loadDeviceId } from './deviceId'

loadDeviceId().then(() => createApp(App).mount('#app'))
