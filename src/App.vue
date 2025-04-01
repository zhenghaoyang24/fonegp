<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import Navbar from "@/components/Navbar.vue";

import {seasonDataStorage} from "@/stores/seasonStore.ts";
const seasonData = seasonDataStorage();
import {onBeforeMount, onMounted, ref} from "vue";
import Footer from "@/components/Footer.vue";

// 加载状态 true 正在加载
const loadingStatus = ref<boolean>(true)
onBeforeMount( () => {
  fetchDate()
})

const fetchDate = async () => {
  loadingStatus.value = true;
  try {
    // 并行执行三个请求
    const results = await Promise.all([
      seasonData.refreshCurrentSeasonInfo(),
      seasonData.refreshLastRoundInfo(),
      seasonData.refreshNextRoundInfo(),
    ]);
    // 检查所有结果是否为 true
    if (results.every(result => result)) {
      setTimeout(()=>{
        loadingStatus.value = false;  // 显示数据加载
      },800)
    } else {
      // 处理部分请求失败的情况
      console.error('部分请求未成功');
      loadingStatus.value = true; // 根据需求决定是否保持 loading
    }
  } catch (error) {
    console.error('请求发生错误:', error);
    loadingStatus.value = true; // 根据需求决定是否保持 loading
  }
};

</script>

<template>
  <header class="header">
    <Navbar/>
  </header>
  <main class="no-data-view" v-if="loadingStatus">
    正在加载调校数据 ...
  </main>
  <main class="main" v-else>
    <RouterView/>
  </main>
  <Footer/>
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
  height: 67vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--brand-color);
}

</style>
