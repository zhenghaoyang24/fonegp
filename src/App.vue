<script setup lang="ts">

import Navbar from "@/components/navbar/Navbar.vue";
import Footer from "@/components/footer/Footer.vue";
import { onMounted, ref } from 'vue';
import router from "@/router";
import { getCurrentSeasonInfoRequest, getAllSeasonsInfoRequest } from './api/seasonsApi';
import { getRaceListByYear,getCurrentRaceList } from './api/raceApi';
import FOLogo from "./components/common/FOLogo.vue";

// 加载状态 true 正在加载
const loadingStatus = ref<boolean>(true);
onMounted(async () => {
  loadingStatus.value = true;
  const res = await getCurrentRaceList()
  console.log(res);
  setTimeout(() => {
    loadingStatus.value = false; // 显示数据加载
  }, 2000);
})
</script>

<template>
  <header class="flex justify-center border-b border-line sticky top-0 p-6 z-9999 bg-dark max-md:p-3">
    <div class="flex justify-between w-5xl max-md:w-full">
      <FOLogo />
      <Navbar />
    </div>
  </header>
  <main class="max-w-5xl mx-auto borrder-b border-line text-tp box-border p-4 max-md:p-2">
    <KeepAlive>
      <RouterView />
    </KeepAlive>
  </main>
  <footer class="sticky bottom-0 border-t border-line z-9999 bg-dark">
    <Footer />
  </footer>
</template>
