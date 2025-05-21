<script setup lang="ts">
import {ref} from "vue";

const rankStatusTab = ref<number>(1)

// 切换排名类型
function changeTab(type:number){
  if (type !== rankStatusTab.value) {
    rankStatusTab.value= type
  }
}

</script>

<!-- 视口固定版 -->
<template>
  <div class="rank-type-aside-container">
    <div class="rank-type-tab" :class="rankStatusTab === 1? 'rank-type-tab-active':''" @click="changeTab(1)">
      车手
    </div>
    <div class="rank-type-tab" :class="rankStatusTab === 2? 'rank-type-tab-active':''" @click="changeTab(2)">
      车队
    </div>
  </div>
</template>
<style scoped>

.rank-type-tab {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px;
  border-radius: 6px;
}

.rank-type-tab-active{
  background-color: var(--brand-color);
}

.rank-type-aside-container {
  user-select: none;
  box-sizing: border-box;
  width: 90px;
  position: fixed;
  background-color: var(--card-bg-color);
  border: 1px solid var(--card-border-color);
  padding: 6px;
  border-radius: var(--border-radius);
}
</style>
