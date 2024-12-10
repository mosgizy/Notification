import './assets/main.css'
import OneSignalVuePlugin from '@onesignal/onesignal-vue3'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App)
  .use(OneSignalVuePlugin, { appId: 'dcc453f9-d1b2-40cb-9dac-61efd146e486' })
  .mount('#app')
