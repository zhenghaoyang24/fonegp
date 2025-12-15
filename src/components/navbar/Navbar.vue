<script setup lang="ts">
import router from "@/router";
import LanguageSelect from "./LanguageSelect.vue";
</script>

<template>

  <nav class="navbar">
    <div class="nav-logo" @click="() => router.push('/race')">
      FoneGP
    </div>
    <div class="navbar-link">
      <RouterLink to="/race">{{ $t("navbar.home") }}</RouterLink>
      <RouterLink to="/schedule">{{ $t("navbar.schedule") }}</RouterLink>
      <RouterLink to="/result">{{ $t("navbar.result") }}</RouterLink>
      <RouterLink to="/rank">{{ $t("navbar.ranking") }}</RouterLink>
    </div>
    <div class="navbar-btn">
      <LanguageSelect />
    </div>
  </nav>

</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  margin: 0 auto;
  height: 70px;
  max-width: 500px;
  background-color: var(--card-bg-color);
  border: 1px solid var(--card-border-color);
  border-radius: var(--border-radius);
}

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
