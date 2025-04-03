import { createI18n } from 'vue-i18n'
import zh from './locales/zh'
import en from './locales/en'

const i18n = createI18n({
    legacy: false,
    locale: 'zh', // 默认显示语言
    messages: {
        'ch': zh,
        'en': en
    }
})
export default i18n
