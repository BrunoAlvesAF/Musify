import { createApp } from 'vue'
import app from './App.vue'
import router from './router/index.js'

const App = createApp(app)  
App.use(router).mount('#app')           