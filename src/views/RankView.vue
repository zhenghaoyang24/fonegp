<script setup lang="ts">

import RankTypeAside from "@/components/RankTypeAside.vue";
import RankResultContent from "@/components/RankResultContent.vue";
</script>

<template>
  <div class="rank-view">
    <RankTypeAside/>
    <RankResultContent/>
  </div>
</template>

<style scoped>
.rank-view {
  display: flex; /* 启用flex布局 */
  width: 80%;
  margin: 0 auto;
  @media screen and (max-width: 770px) {
    width: 100%;
    padding: 6px 0;
  }
}
</style>
