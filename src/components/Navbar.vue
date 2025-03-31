<script setup lang="ts">

import router from "@/router";
</script>

<template>

  <nav class="navbar">
    <div class="nav-logo" @click="()=> router.push('/race')">
      Fonelify
    </div>
    <div class="navbar-link">
      <RouterLink to="/race">比赛</RouterLink>
      <RouterLink to="/schedule">赛程</RouterLink>
      <RouterLink to="/rank">排行</RouterLink>
    </div>
    <div class="navbar-btn">

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
/*  background-image: url("@/assets/logo.svg");
  background-size: cover;
  background-repeat: no-repeat;*/
}

.navbar-link {
  display: flex;

  > a {
    color: var(--text-s);
    padding: 0;
    margin: 0 7px;

    &:hover {
      color: var(--text-p);
    }
  }
}


</style>
