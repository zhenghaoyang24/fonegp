import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

/* 路由发生变化修改页面title */
router.beforeEach((to, _from, next) => {
    document.title = (to.meta as { title?: string }).title ?? 'Fonelify'
    next()
})

const app = createApp(App)
app.use(router)
app.use(createPinia().use(piniaPersist))
app.mount('#app')
