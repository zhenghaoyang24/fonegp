import {ref, computed} from 'vue'
import {defineStore} from 'pinia'

export const useSettingStore = defineStore('setting', () => {

    const currentThemeStoreValue = ref<'light' | 'dark'>('light')

    // 获取主题
    function getThemeStore() {
        return currentThemeStoreValue.value
    }

    // 切换主题
    function changeThemeStore(theme: 'light' | 'dark') {
        document.documentElement.setAttribute('theme', theme)
        currentThemeStoreValue.value = theme
    }

    return {currentThemeStoreValue, getThemeStore, changeThemeStore}
}, {
    persist: [
        {
            pick: ['currentThemeStoreValue'],
            storage: localStorage
        }
    ]
})
