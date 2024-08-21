import { createApp, } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './ruter/router'
import { createPinia } from 'pinia'
const eventBus = createApp({});

const app = createApp(App)
app.config.globalProperties.$bus = eventBus
app.use(createPinia())
app.use(router as any)
app.use(ElementPlus)
app.mount('#app')

export default eventBus