import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useSettingStore = defineStore(
  "setting",
  () => {
    const currentThemeStoreValue = ref<"light" | "dark">("light");

    // 获取主题
    function getThemeStore() {
      return currentThemeStoreValue.value;
    }

    // 切换主题
    function changeThemeStore(theme: "light" | "dark") {
      document.documentElement.setAttribute("theme", theme);
      currentThemeStoreValue.value = theme;
    }

    // 语言
    const currentLocaleStoreValue = ref<string>(
      import.meta.env.VITE_LOCALE || "zh-CN"
    );
    function changeLocaleStore(locale: string) {
      currentLocaleStoreValue.value = locale;
    }

    return {
      currentThemeStoreValue,
      getThemeStore,
      changeThemeStore,
      currentLocaleStoreValue,
      changeLocaleStore,
    };
  },
  {
    persist: [
      {
        pick: ["currentThemeStoreValue", "currentLocaleStoreValue"],
        storage: localStorage,
      },
    ],
  }
);
