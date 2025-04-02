<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import {useRoute} from 'vue-router'

const route = useRoute()
import {storeToRefs} from "pinia";
import RaceDetailOverviewTab from "@/components/RaceDetailOverviewTab.vue";
import {seasonDataStorage} from "@/stores/seasonStore.ts";
import RaceResultPanel from "@/components/RaceResultPanel.vue";

const seasonData = seasonDataStorage();

// 选中 渲染的场次
const selectRound = ref<number>(0)

// 获取 动态参数 限制数据
onBeforeMount(() => {
  selectRound.value = limitRound(route.params.round)
})

// 获取 当前场次，最大场次数
const {
  currentRoundStore,
  totalRoundStore
} = storeToRefs(seasonData)

// 场次限制函数 最大场次限制
const limitRound = (round: any) => {
  const convertRound = Number(round)
  if (isNaN(convertRound)) {  //收到不是数字时，返回当前场次
    return currentRoundStore.value
  } else {
    if (convertRound < 1){ // 小于 1
      return 1
    }else if (convertRound > totalRoundStore.value) { // 收到参数大于总场次，返回最大场次
      return totalRoundStore.value
    } else {  // 返回本身
      return convertRound
    }
  }
}

function changeRaceRoundFn(delta:number){
  selectRound.value = limitRound(delta)
}
</script>

<template>
  <div class="race-detail-content">
    <RaceDetailOverviewTab @changeRaceRoundEmit="changeRaceRoundFn" :round="selectRound"/>
    <RaceResultPanel :the-round="selectRound"/>
  </div>
</template>

<style scoped>
.race-detail-content {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 10px;
  @media screen and (max-width: 770px) {
    grid-template-columns: 1fr;
  }
}
</style>
