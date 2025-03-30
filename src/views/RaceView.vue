<script setup lang="ts">
import {seasonDataStorage} from "@/stores/data";
import { storeToRefs } from 'pinia'
import {ref} from "vue";

const seasonData = seasonDataStorage();
const {currentSeasonInfo= ref<any>(null),currentSeason = ref<Number>(0)} = storeToRefs (seasonData)


</script>

<template>
<main class="main">
  <div class="content">
    <div class="season-overview-content">
      <h2>{{currentSeason}}赛季</h2>
      <div class="round-info">
        <p>共 <span>{{currentSeasonInfo.total}}</span> 场比赛</p>
        <p>共 <span>{{currentSeasonInfo.total}}</span> 场比赛</p>
      </div>
    </div>
    <div class="round-last-next">

    </div>
  </div>
</main>
</template>
<style scoped>
.round-info{
  >p{
    margin: 20px 0;
    >span{
      font-size: 2em;
      color: var(--brand-color);
    }
  }
}
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
