<script setup lang="ts">
import Navbar from "@/components/navbar/Navbar.vue";
import Footer from "@/components/footer/Footer.vue";
import { onBeforeMount, onMounted, ref } from "vue";
import FOLogo from "./components/common/FOLogo.vue";
import { dataStorage } from "@/stores/dataStore";
const { setCurrentRaceListAction, setCurrentSeasonYearAction } = dataStorage();
// 加载状态 true 正在加载
const loadingStatus = ref<boolean>(true);
onBeforeMount(async () => {
  loadingStatus.value = true;
  try {
    const [seasons, races] = await Promise.all([
      setCurrentSeasonYearAction(),
      setCurrentRaceListAction(),
    ]);
  } catch (error) {
    // 可选：处理网络错误或请求失败
    console.error("Failed to fetch championship data:", error);
  } finally {
    loadingStatus.value = false;
  }
});
</script>

<template>
  <header
    class="flex justify-center border-b border-line sticky top-0 p-6 z-9999 bg-dark max-md:p-3"
  >
    <div class="flex justify-between w-5xl max-md:w-full">
      <FOLogo />
      <Navbar />
    </div>
  </header>
  <main class="max-w-5xl mx-auto borrder-b border-line text-tp box-border p-4 max-md:p-2">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </main>
  <footer class="sticky bottom-0 border-t border-line z-9999 bg-dark">
    <Footer />
  </footer>
</template>
