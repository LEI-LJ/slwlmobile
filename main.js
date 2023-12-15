import App from './App'
import '@/utils/utils.js'
// 导入pinia
import { createPinia } from 'pinia'
// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { persistedstate } from '@/store/persite.js'
import { createSSRApp } from 'vue'

export function createApp() {
  
  const pinia = createPinia()
  const app = createSSRApp(App)
  app.use(pinia)
  pinia.use(persistedstate)

  return {
    app,
  }
}
