<script setup lang="ts">
import {seasonDataStorage} from "@/stores/seasonStore.ts";
import {storeToRefs} from "pinia";
import {computed, onBeforeMount, onMounted, ref, watch} from "vue";
import type {RaceSchedule} from "@/interface/RaceScheduleArray.ts";
import RaceResultTypeDetail from "@/components/RaceResultTypeDetail.vue";

const seasonData = seasonDataStorage();
const {currentRacesScheduleDate} = storeToRefs(seasonData)
const props = defineProps({
  theRound: {
    type: Number,
    required: true
  },
  circuitId: {
    type: String,
    required: true
  }
})

// 本场比赛的赛程
const theRaceSchedule = ref<RaceSchedule>()
// 获取本场比赛的赛程与轮次
function getTheRaceSchedule() {
  theRaceSchedule.value = currentRacesScheduleDate.value.races.find(item => {
    return item.circuitId === props.circuitId
  })
}

// 监听 round 与 id 的变化
watch(() => [props.theRound, props.circuitId], ([newCount, newName]) => {
  getTheRaceSchedule()

}, {immediate: true})
onBeforeMount(() => {
  getTheRaceSchedule()
})

</script>

<template>
  <div class="race-result-panel-content">
    <div class="race-result-detail-item" v-for="(item , index) in theRaceSchedule?.scheduleDate" :key="index">
      <RaceResultTypeDetail :the-schedule="item.schedule" :the-type="item.type" :the-round="props.theRound"/>
    </div>
  </div>
</template>

<style scoped>
.race-result-panel-content {
  border: 1px solid var(--card-border-color);
  border-radius: var(--border-radius);
  overflow: hidden;
}
</style>
