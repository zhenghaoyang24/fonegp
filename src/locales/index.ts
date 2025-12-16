import { createI18n } from "vue-i18n";
import enUS from "./langs/en-US";
import zhCN from "./langs/zh-CN";
const messages = { "en-US": enUS, "zh-CN": zhCN };

export const Langs: { value: string; label: string }[] = [
  {
    value: "en-US",
    label: "English",
  },
  {
    value: "zh-CN",
    label: "简体中文",
  },
];

function getLocale(lang?: string) {
  const langs = import.meta.env.VITE_LOCALE;
  if (!lang) return langs;
  if (lang in messages) {
    return lang;
  }
  return langs;
}

// create i18n instance
export function createI18nInstance(lang?: string) {
  return createI18n({
    locale: getLocale(lang),
    legacy: false,
    messages,
  });
}
