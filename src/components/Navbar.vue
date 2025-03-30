<script setup lang="ts">

</script>

<template>
  <nav class="navbar">
    <div class="nav-logo">
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
  left: 0;
  right: 0;
  position: fixed;
  display: flex;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  margin: 10px auto;
  height: 70px;
  max-width: 500px;
  background-color: var(--card-bg-color);
  border: 1px solid var(--card-border-color);
  border-radius: var(--border-radius);
}

.nav-logo {
  width: 50px;
  height: 50px;
  background-image: url("@/assets/logo.svg");
  background-size: cover;
  background-repeat: no-repeat;
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
