<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import Navbar from "@/components/Navbar.vue";

import {seasonDataStorage} from "@/stores/seasonStore.ts";
import {onBeforeMount, onMounted, ref} from "vue";

const seasonData = seasonDataStorage();
// 加载状态 true 正在加载
const loadingStatus = ref<boolean>(true)
onMounted(() => {
  fetchDate()
})

const fetchDate = () => {
  loadingStatus.value = true
  if (seasonData.refreshCurrentSeasonInfo() && seasonData.refreshLastRoundInfo() && seasonData.refreshNextRoundInfo()) {
    setTimeout(() => {
      loadingStatus.value = false
    }, 1000)
  } else {
    loadingStatus.value = true
  }
}
</script>

<template>
  <header class="header">
    <Navbar/>
  </header>
  <main class="main no-data-view" v-if="loadingStatus">
    正在加载数据 ....
  </main>
  <main class="main" v-else>
    <RouterView/>
  </main>
</template>

<style scoped>
.header {
  z-index: 9999;
  position: fixed;
  right: 0;
  left: 0;
  padding: 7px;
  background-color: var(--bg-color);
}
.no-data-view{
  height: 70vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--brand-color);
}

</style>
