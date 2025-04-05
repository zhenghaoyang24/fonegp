<script setup lang="ts">
const rankTypeTab = ['driverPointRank', 'teamPointRank']
</script>

<!-- 视口固定版 -->
<template>
  <div class="rank-type-aside-container">
    <div class="rank-type-tab">
      车手排名
    </div>
  </div>
</template>
<style scoped>

.rank-type-tab {
  display: block;

}

.rank-type-aside-container {
  box-sizing: border-box;
  width: 90px;
  position: fixed;
  background-color: var(--card-bg-color);
  border: 1px solid var(--card-border-color);
  padding: 10px;
  border-radius: var(--border-radius);
}
</style>
