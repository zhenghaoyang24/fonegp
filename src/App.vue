<script setup lang="ts">
// import { RouterView } from "vue-router";
import Navbar from "@/components/navbar/Navbar.vue";
// import { seasonDataStorage } from "@/stores/seasonStore.ts";
// const seasonData = seasonDataStorage();
// import { onBeforeMount, onMounted, ref } from "vue";
import Footer from "@/components/footer/Footer.vue";
// import { storeToRefs } from "pinia";
// import dateUtils from "@/utils/dateUtils.ts";
// // 获取 刷新时间
// const { lastFetchTime } = storeToRefs(seasonData);

// // 加载状态 true 正在加载
// const loadingStatus = ref<boolean>(true);
// onBeforeMount(() => {
//   if (dateUtils.checkHourBefore(new Date(lastFetchTime.value))) {
//     //如果是一小时前刷新，则重新获取
//     fetchSeasonBasicDate();
//   } else {
//     setTimeout(() => {
//       loadingStatus.value = false; // 显示数据加载
//     }, 800);
//   }
// });

// const fetchSeasonBasicDate = async () => {
//   loadingStatus.value = true;
//   try {
//     // 并行执行三个请求
//     const results = await Promise.all([
//       seasonData.refreshCurrentSeasonInfo(),
//       seasonData.refreshLastRoundInfo(),
//       seasonData.refreshNextRoundInfo(),
//     ]);
//     // 检查所有结果是否为 true
//     if (results.every((result) => result)) {
//       seasonData.refreshLastFetchTime(); //刷新时间
//       setTimeout(() => {
//         loadingStatus.value = false; // 显示数据加载
//       }, 800);
//     } else {
//       // 处理部分请求失败的情况
//       console.error("部分请求未成功");
//       loadingStatus.value = true; // 根据需求决定是否保持 loading
//     }
//   } catch (error) {
//     console.error("请求发生错误:", error);
//     loadingStatus.value = true; // 根据需求决定是否保持 loading
//   }
// };


import { onMounted, ref } from 'vue';
import { getCurrentSeasonInfoRequest,getAllSeasonsInfoRequest } from './api/seasonsApi';
import type { Response } from "./type/request";
import type { Season } from "./type/season";
import axios from "axios";

// 加载状态 true 正在加载
const loadingStatus = ref<boolean>(true);
onMounted(async () => {
  loadingStatus.value = true;
  const res = await getAllSeasonsInfoRequest()
  console.log(res);
  
  loadingStatus.value = false;
})
</script>

<template>
  <header class="flex items-center justify-center fixed p-4 z-9999 top-0 right-0 left-0 bg-dark">
    <Navbar />
  </header>
  <main class="pt-15 flex items-center justify-center text-primary loading" v-if="loadingStatus">
    {{ $t("tip.initLoading") }}</main>
  <main class="main" v-else>
    <RouterView />
  </main>
  <footer>
    <Footer />
  </footer>
</template>

<style scoped>
.loading {
  height: calc(100vh - 100px);
}

/* TODO: 添加tailwind */
.main {
  padding: 90px 7px 7px 7px;
  color: var(--text-p);
  margin: 0 auto;
  max-width: 1200px;
}
</style>
