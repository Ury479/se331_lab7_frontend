import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { inject } from '@vercel/analytics'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'
import 'nprogress/nprogress.css'
// AxiosClient 会在首次导入时自动设置拦截器，无需额外导入

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Initialize auth state from localStorage
const authStore = useAuthStore()
authStore.initialize()

inject()

app.mount('#app')
