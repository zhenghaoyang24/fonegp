// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import {myCustomDarkTheme} from "@/config/theme"
// Vuetify default font
import '@fontsource/roboto/100.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@fontsource/roboto/900.css'
// create vuetify instance
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi', // This is already the default value - only for display purposes
  },
  theme: {
    defaultTheme: 'dark',
    themes: {
      myCustomDarkTheme
    },
  }
})


// import "./assets/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persistedstate";
import {createI18nInstance} from "@/locales";
import App from "./App.vue";
import router from "./router";
import { useSettingStore } from "./stores/setting";

const app = createApp(App);

/* 路由发生变化修改页面title */
router.beforeEach((to, _from, next) => {
  document.title = (to.meta as { title?: string }).title ?? "Fonelify";
  next();
});


const pinia = createPinia();
pinia.use(piniaPersist)
app.use(pinia);

// get current language and create i18n instance
const settingStore = useSettingStore();
const i18n = createI18nInstance(settingStore.currentLocaleStoreValue);
app.use(i18n);
app.use(vuetify);
app.use(router);
app.mount("#app");
