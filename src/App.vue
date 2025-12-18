<script setup lang="ts">
// import { RouterView } from "vue-router";
// import Navbar from "@/components/navbar/Navbar.vue";
// import { seasonDataStorage } from "@/stores/seasonStore.ts";
// const seasonData = seasonDataStorage();
// import { onBeforeMount, onMounted, ref } from "vue";
// import Footer from "@/components/footer/Footer.vue";
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

import Navbar from "@/components/navbar/Navbar.vue";
import Footer from "@/components/footer/Footer.vue";
import { onMounted, ref } from 'vue';
import router from "@/router";
import { getCurrentSeasonInfoRequest, getAllSeasonsInfoRequest } from './api/seasonsApi';
import FOLogo from "./components/common/FOLogo.vue";

// 加载状态 true 正在加载
const loadingStatus = ref<boolean>(true);
onMounted(async () => {
  loadingStatus.value = true;
  const res = await getCurrentSeasonInfoRequest()
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
    <KeepAlive><RouterView /> </KeepAlive>
    
  </main>
  <footer>
    <Footer />
  </footer>
</template>
