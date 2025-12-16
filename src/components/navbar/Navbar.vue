<script setup lang="ts">
import router from "@/router";
import FOSelect from "@/components/common/FOSelect.vue";
import { Langs } from "@/locales";
import { useI18n } from "vue-i18n";
const { locale } = useI18n();

// 切换语言
function changeLang(newLang: string) {
  console.log("Change language to:", newLang);
  locale.value = newLang;
}
</script>

<template>
  <nav
    class="flex items-center justify-between p-2 box-border bg-dark rounded-lg w-200 h-20 common-border common-shadow">
    <div class="flex items-center">
      <div class="nav-logo" @click="() => router.push('/race')">FoneGP</div>
      <div class="navbar-link">
        <RouterLink to="/race">{{ $t("navbar.home") }}</RouterLink>
        <RouterLink to="/schedule">{{ $t("navbar.schedule") }}</RouterLink>
        <RouterLink to="/result">{{ $t("navbar.result") }}</RouterLink>
        <RouterLink to="/rank">{{ $t("navbar.ranking") }}</RouterLink>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <FOSelect :showBorder="false" :show-text="false" type="icon" :show-icon="true" icon="mdi:language" :size="20" :value="$i18n.locale" :options="Langs"
        @onChangeLang="changeLang" />
    </div>
  </nav>
</template>

<style scoped>

.nav-logo {
  cursor: pointer;
  user-select: none;
  text-align: center;
  color: var(--brand-color);
  font-weight: 900;
  font-size: 1.2em;
  margin: 0 10px;
}

.navbar-link {
  display: flex;

  >a {
    color: var(--text-s);
    padding: 0;
    margin: 0 7px;

    &:hover {
      color: var(--text-p);
    }
  }
}
</style>
