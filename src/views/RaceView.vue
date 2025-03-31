<script setup lang="ts">
import infoCnFormatUtil from "@/utils/infoCnFormatUtil.ts";
import {seasonDataStorage} from "@/stores/seasonStore.ts";

const seasonData = seasonDataStorage();
import {storeToRefs} from 'pinia'
import {computed, onBeforeMount, onMounted, ref} from "vue";
import dateUtils from "@/utils/dateUtils.ts";
import RaceScheduleItem from "@/components/RaceScheduleItem.vue";
import RaceStatusCom from "@/components/RaceStatusCom.vue";
import circuit from "@/data/circuit.json";

const {
  currentRoundStore,
  totalRoundStore,
  currentSeasonStore,
  lastRoundInfoOfRace,
  nextRoundInfoOfRace,
} = storeToRefs(seasonData)
// 上下轮比赛
const lastRoundId = ref<string>(lastRoundInfoOfRace.value.circuit.circuitId)
const lastRace = ref<any>(circuit.find(item =>{
  if (item.circuitId === lastRoundId.value)
    return item
}))
const lastRaceDate = ref<string>(lastRoundInfoOfRace.value.schedule.race.date)
// 下轮比赛
const nextRoundId = ref<string>(nextRoundInfoOfRace.value.circuit.circuitId)
const nextRace = ref<any>(circuit.find(item =>{
  if (item.circuitId === nextRoundId.value)
    return item
}))
const nextRaceDate = ref<string>(nextRoundInfoOfRace.value.schedule.race.date)
// 本周比赛情况 是否为比赛周
const theWeekRaceStatus = computed(() => {
  return dateUtils.raceStatusFormat(nextRaceDate.value);
});
</script>

<template>
  <div class="race-view-content">
    <div class="season-overview-content">
      <h2>{{ currentSeasonStore }}赛季</h2>
      <div class="season-info">
        <p>共 <span>{{ totalRoundStore }}</span> 场比赛</p>
        <p>已进行 <span>{{ currentRoundStore }}</span> 场比赛</p>
      </div>
      <div class="round-info">
        <p>上一站：{{lastRace.country_zh }}</p>
        <p>下一站：{{ nextRace.country_zh }}</p>
      </div>
      <div class="this-week">
        本周<span>{{ theWeekRaceStatus === 1 ? '是' : '不是' }}</span>比赛周！
      </div>
    </div>
    <div class="round-last-next">
      <div class="round-last">
        <div class="round-title"><h3>上一场</h3> <RaceStatusCom :props-data="lastRaceDate"/> </div>
        <RaceScheduleItem :race="lastRoundInfoOfRace" :collapse="true" :show-title="false"/>
      </div>
      <div class="round-next">
        <div class="round-title"><h3>下一场</h3> <RaceStatusCom :props-data="nextRaceDate"/> </div>
        <RaceScheduleItem :race="nextRoundInfoOfRace" :collapse="true" :show-title="false"/>
      </div>
    </div>
  </div>

</template>
<style scoped>
.round-last-next {
  display: grid;
  grid-template-columns: 1fr;
  gap: 5px;
  background-color: var(--card-bg-color);
  border: 1px solid var(--card-border-color);
  padding: 10px;
  box-sizing: border-box;
  border-radius: var(--border-radius);
}

.season-info {
  > p {
    margin: 10px 0 0 0;

    > span {
      font-size: 2em;
      color: var(--brand-color);
    }
  }

  @media screen and (max-width: 770px) {
    display: flex;
    justify-content: space-between;
  }

}

.round-info {
  display: block;
  @media screen and (max-width: 770px) {
    display: flex;
    justify-content: space-between;
  }
}

.race-view-content {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 10px;
  @media screen and (max-width: 770px) {
    grid-template-columns: 1fr;
  }

}

.season-overview-content {
  width: 100%;
  height: fit-content;
  padding: 20px;
  box-sizing: border-box;
  background-color: var(--card-bg-color);
  border: 1px solid var(--card-border-color);
  border-radius: var(--border-radius);
  margin: 0 auto;

  > h2 {
    padding: 0;
    margin: 0 0 10px 0;
  }
}

.this-week {
  font-size: 1.2em;

  > span {
    color: var(--brand-color);
  }
}
.round-title{
  >h3{
    margin-right: 10px;
  }
  display: flex;
  align-items: center;
}
</style>
