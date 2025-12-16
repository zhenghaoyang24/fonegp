import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persistedstate";
import { createI18nInstance } from "@/locales";
import App from "./App.vue";
import router from "./router";
import { useSettingStore } from "./stores/setting";

import "./assets/main.css";

const app = createApp(App);

/* 路由发生变化修改页面title */
router.beforeEach((to, _from, next) => {
  document.title = (to.meta as { title?: string }).title ?? "Fonelify";
  next();
});

const pinia = createPinia();
pinia.use(piniaPersist);
app.use(pinia);

// get current language and create i18n instance
const settingStore = useSettingStore();
const i18n = createI18nInstance(settingStore.currentLocaleStoreValue);
app.use(i18n);
app.use(router);
app.mount("#app");
