import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css'
import router from './services/router'

const app = createApp(App)

app.use(router)

app.mount('#app')


