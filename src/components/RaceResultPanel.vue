<script setup lang="ts">
import {seasonDataStorage} from "@/stores/seasonStore.ts";
import {storeToRefs} from "pinia";
import {onBeforeMount, onMounted, ref} from "vue";
const seasonData = seasonDataStorage();
const {currentSeasonInfoOfAllRaces} = storeToRefs(seasonData)
const props = defineProps({
  theRound: {
    type: Number,
    required: true
  }
})
// 比赛类型 时间日程 对象
interface RaceSchedule {
  date: string | null;
  time: string | null;
}
// 一轮比赛对象
interface TypeSchedule {
  race: RaceSchedule;
  qualy: RaceSchedule;
  fp1: RaceSchedule;
  fp2: RaceSchedule;
  fp3: RaceSchedule;
  sprintQualy: RaceSchedule;
  sprintRace: RaceSchedule;
}
// 断言固定 所有比赛类型
const raceType = ["fp1", "fp2", "fp3", "qualy", "race",  "sprintQualy", "sprintRace"] as const;
type RaceType = typeof raceType[number];
// 本场正式要进行的比赛日程 对象数组
const theRaceSchedule = ref<{ type: RaceType; schedule: RaceSchedule }[]>([]);

/**
 * 获取本场比赛的日程安排与比赛类型
 * @param schedule
 */
function fetchTheRaceSchedule(schedule: TypeSchedule) {
  // 清空现有数据
  theRaceSchedule.value = [];

  // 遍历所有 比赛类型 若本场该比赛类型（有日程时间） 则添加
  raceType.forEach(type => {
    const raceData = schedule[type];
    // 检查 date 是否有效
    if (raceData?.date !== null && raceData?.date !== undefined) {
      // 将有日程安排的比赛添加到 theRaceSchedule
      theRaceSchedule.value.push({
        type: type,
        schedule: {
          date: raceData.date,
          time: raceData.time
        }
      });
    }
  });
  // 按日期排序
  theRaceSchedule.value.sort((a, b) => {
    return new Date(`${a.schedule.date!}T${a.schedule.time}`).getTime() - new Date(`${b.schedule.date!}T${b.schedule.time}`).getTime();
  });
}
onBeforeMount(()=>{
  fetchTheRaceSchedule(currentSeasonInfoOfAllRaces.value[props.theRound-1].schedule)
})

</script>

<template>

</template>

<style scoped>

</style>
