<template>
  <div>
    <select
      class="language-select"
      name="language"
      :value="settingStore.currentLocaleStoreValue"
      @change="changeLanguage"
    >
      <option value="en-US">English</option>
      <option value="zh-CN">中文</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { useSettingStore } from "@/stores/setting";
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
const settingStore = useSettingStore();
function changeLanguage(e: Event) {
  const selectedValue = (e.target as HTMLSelectElement).value;
  settingStore.changeLocaleStore(selectedValue);
  locale.value = selectedValue;
}

onMounted(() => {
  locale.value = settingStore.currentLocaleStoreValue;
});
</script>

<style scoped>
.language-select {
  text-align: center;
  padding: 4px;
  border: 1px solid var(--border-color-inverted);
  color: var(--text-p);
  border-radius: 4px;
  background: none;
  appearance: none; /* 移除默认箭头 */
  -webkit-appearance: none; /* 针对 Safari */
  -moz-appearance: none; /* 针对 Firefox */
  cursor: pointer;
  &:active,
  &:focus {
    outline: none;
  }
}
.language-select > option {
    cursor: pointer;
  background-color: var(--card-bg-color);

  &:hover {
    background-color: var(--brand-color)!important;
  }
}
.language-select > option:hover {
  background-color: var(--brand-color)!important;
}
</style>
