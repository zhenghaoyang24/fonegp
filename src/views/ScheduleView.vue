<script setup lang="ts">

import {seasonDataStorage} from "@/stores/seasonStore.ts";
import {storeToRefs} from "pinia";
import RaceScheduleItem from "@/components/RaceScheduleItem.vue";
import {onMounted} from "vue";

const seasonData = seasonDataStorage();
const {currentSeasonInfoOfAllRaces} = storeToRefs(seasonData)
onMounted(()=>{
  console.log(currentSeasonInfoOfAllRaces.value)
})
</script>

<template>
  <div class="schedule-race-table">
    <div class="race-item-title">
      <span>日期</span>
      <span>大奖赛</span>
      <span>状态</span>
    </div>
    <div class="race-item-body">
      <div class="race-item-content" v-for="(raceItem ,index) in currentSeasonInfoOfAllRaces" :key="index">
        <RaceScheduleItem :race="raceItem" :collapse="false"/>
      </div>
    </div>

  </div>
</template>

<style scoped>
.schedule-race-table {
  width: 80%;
  margin: 0 auto;
  @media screen and (max-width: 770px) {
    width: 100%;
  }
}

.race-item-title {
  z-index: 999;
  padding: 10px 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background-color: var(--bg-color);
  > span {
    display: flex;
    justify-content: center;
  }
}
.race-item-body{
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}
.race-item-content {

  padding: 0 5px;
}
</style>
