<script setup lang="ts">
import {seasonDataStorage} from "@/stores/data";
const seasonData = seasonDataStorage();
</script>

<template>
<main class="main">
  <div class="content">
    <div class="season-overview-content">
      <h2>{{seasonData.currentSeason}}赛季</h2>
      <div class="round-info">
        <p>本赛季共</p>
      </div>
    </div>
    <div class="round-last-next">

    </div>
  </div>
</main>
</template>
<style scoped>
.content{
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 20px;
}
.season-overview-content{
  padding: 20px;
  background-color: var(--card-bg-color);
  border: 1px solid var(--card-border-color);
  border-radius: var(--border-radius);
  >h2{
    padding: 0;
    margin: 0;

  }
}
</style>
