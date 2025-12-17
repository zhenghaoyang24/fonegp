<script setup lang="ts">
import FOSelect from "@/components/common/FOSelect.vue";
import { Langs } from "@/locales";
import { useI18n } from "vue-i18n";
import FOIcon from "../common/FOIcon.vue";
import { ref } from "vue";
import MobileMenu from "./MobileMenu.vue";
const { locale } = useI18n();

// 切换语言
function changeLang(newLang: string) {
  console.log("Change language to:", newLang);
  locale.value = newLang;
}

// 移动端下，菜单控制
const menuOpen = ref(false);
function menuHandle(v: boolean) {
  console.log("Menu open state changed to:", v);

  menuOpen.value = v
}
</script>

<template>
  <nav class="flex items-center justify-between gap-3">
    <MobileMenu v-if="menuOpen" @close="menuHandle(false)" />
    <div class="flex items-center gap-2 [&>a]:text-tm max-md:hidden">
      <RouterLink to="/home">{{ $t("navbar.home") }}</RouterLink>
      <RouterLink to="/schedule">{{ $t("navbar.schedule") }}</RouterLink>
      <RouterLink to="/result">{{ $t("navbar.result") }}</RouterLink>
      <RouterLink to="/ranking">{{ $t("navbar.ranking") }}</RouterLink>
    </div>
    <div class="md:hidden cursor-pointer" @click="menuHandle(true)" @mousedown.prevent>
      <FOIcon icon="mdi:menu" :size="26" color="var(--color-tp)" />
    </div>
    <div class="flex items-center gap-1 pl-1 border-l border-line">
      <FOSelect :showBorder="false" :show-text="false" type="icon" :show-icon="true" icon="mdi:language" :size="20"
        :value="$i18n.locale" :options="Langs" @onChangeLang="changeLang" />
      <a href="https://github.com/zhenghaoyang24/fonegp" target="_blank">
        <FOIcon icon="mdi:github" :size="20" color="var(--color-tp)" />
      </a>
    </div>
  </nav>
</template>

<style scoped>
.navbar-link {
  display: flex;

  >a {
    color: var(--text-s);
    padding: 0;
    /* margin: 0 7px; */

    &:hover {
      color: var(--text-p);
    }
  }
}
</style>
