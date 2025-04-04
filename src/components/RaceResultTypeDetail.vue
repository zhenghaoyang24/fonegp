<script setup lang="ts">
import dateUtils from "@/utils/dateUtils.ts";
import raceUtils from "@/utils/raceUtils.ts";
import {onBeforeMount, ref, watch} from "vue";
import {Icon} from "@iconify/vue";
import axios from "axios";
import {F1_API} from "@/utils/api.ts";
import {seasonDataStorage} from "@/stores/seasonStore.ts";
import drivers from '@/data/driver.json'

const seasonData = seasonDataStorage();

const props = defineProps({
  theRound: {
    type: Number,
    required: true
  },
  theType: {
    type: String,
    required: true
  },
  theSchedule: {
    type: Object,
    required: true
  }
})
onBeforeMount(() => {
  getPropsDate()
  fetchRaceResultApi(seasonData.currentSeasonStore, round.value, type.value)
})
// 定义 props 的响应式数据
const round = ref<Number>(1)
const type = ref<string>('')
const schedule = ref<any>()

// 获取 props 的数据
function getPropsDate() {
  round.value = props.theRound
  type.value = props.theType
  schedule.value = props.theSchedule
}

// 转换比赛时间
function scheduleFormatDateTime(date: any, time: any) {
  return dateUtils.getMonthDay(dateUtils.convertUTCtoCST(date, time)) + ' ' + dateUtils.getHoursMinutes(dateUtils.convertUTCtoCST(date, time))
}

// 定义计时器
let timeoutId: number | null = null;
// 监听轮次是否变化
watch(() => props.theRound, (newValue, oldValue) => {
// 清除之前的定时器
  if (timeoutId !== null) {
    clearTimeout(timeoutId);
  }
  // 设置新的定时器
  timeoutId = setTimeout(() => {
    getPropsDate()
    fetchRaceResultApi(seasonData.currentSeasonStore, round.value, type.value)
  }, 500);
});
// 折叠 图标 ref 绑定
const collapseIconElement = ref<HTMLElement | null>(null)
// 折叠状态 默认不折叠
const collapseStatus = ref<boolean>(false);
// 折叠 方法
const collapseRaceDetail = () => {
  if (!collapseStatus.value) {  // 折叠
    collapseStatus.value = true
    if (collapseIconElement.value)
      collapseIconElement.value.style.transform = "rotateZ(90deg)"
  } else {  // 展开
    collapseStatus.value = false
    if (collapseIconElement.value)
      collapseIconElement.value.style.transform = "rotateZ(180deg)"
  }
}

// api 结果关键字定义
const api_result_key = {
  fp1: 'fp1Results',
  fp2: 'fp2Results',
  fp3: 'fp3Results',
  qualy: 'qualyResults',
  sprintQualy: 'sprintQualyResults',
  sprintRace: 'sprintRaceResults',
  race: 'results',
} as const
// 定义类型
type SessionKey = typeof api_result_key;

// 返回对应类型
function getResultKey(key: string): string {
  return api_result_key[key as keyof SessionKey];
}

//  本场比赛 单项结果
const theRaceTypeResult = ref<any>()

// 获取比赛详细数据
function fetchRaceResultApi(year: Number, round: Number, type: string) {
  const apiUrl = F1_API.raceResultApi(year, round, type)
  raceResultFetchIng.value = true //切换状态
  raceResultFetchError.value = "别急，我们还在换胎。"
  axios.get(apiUrl).then(response => {
    raceResultFetchIng.value = false //切换状态
    theRaceTypeResult.value = response.data.races[getResultKey(type)]
  }).catch(error => {
    if (error.message)
      raceResultFetchError.value = "这场比赛还没开始。"
    else {
      raceResultFetchError.value = "糟糕，我们的换胎遇到了一些麻烦。"
      console.error(error)
    }
  })
}

// 获取中文名
function getDriverNameZh(driverId: string) {
  return drivers.find(driver => driver.driverId === driverId)?.surname_zh
}

// 获取状态
const raceResultFetchIng = ref<boolean>(true)
// 失败提示信息
const raceResultFetchError = ref<string>("别急，正在干扰 ToTo 的无线电。")

</script>

<template>
  <div class="race-result-one-type-content">
    <div class="type-title" @click="collapseRaceDetail">
      <span>{{ scheduleFormatDateTime(schedule?.date, schedule?.time) }}</span>
      <span>{{ raceUtils.getRaceTypeZh(type) }}</span>
      <span class="item-collapse-icon" ref="collapseIconElement"> <Icon icon="ooui:collapse"/> </span>
    </div>
    <div class="type-result-detail" v-show="!collapseStatus">
      <div class="type-result-fetch-error" v-if="raceResultFetchIng">
        {{ raceResultFetchError }}
      </div>
      <div class="type-result-fetch-success" v-else>
        <div class="result-item">
          <div class="result-item-title grid-auto">
            <span>排名</span>
            <span>车手</span>
            <span v-if="props.theType === 'race' || props.theType === 'sprintRace'">GAP</span>
            <span v-if="props.theType === 'race' || props.theType === 'sprintRace'">积分</span>
            <span v-else>GAP</span>
          </div>
          <div class="result-item-content grid-auto" v-for="(item ,index) in theRaceTypeResult" :key="index">
            <span v-if="props.theType === 'race' || props.theType === 'sprintRace'">{{ item.position==='-'? '+DQS': item.position }}</span>
            <span v-else>{{ index + 1}}</span>
            <span>{{ getDriverNameZh(item.driver.driverId) }}</span>
            <span>{{item.time}}</span>
            <span v-if="props.theType === 'race' || props.theType === 'sprintRace'">{{item.points}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.type-title {
  border-bottom: 1px solid var(--card-border-color);
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: space-around;
  background-color: var(--card-bg-color);
  padding: 15px 0;


}

.item-collapse-icon {
  color: var(--text-s);
  position: absolute;
  display: flex;
  align-items: center;
  right: 20px;
  top: 0;
  bottom: 0;
  transform: rotateZ(180deg);
  transform-origin: center;
  transition: transform .3s;
}

.type-result-detail {
  padding: 0 10px;
}

.type-result-fetch-error {
  display: flex;
  justify-content: center;
  padding: 40px 0;
  color: var(--brand-color);
}

.result-item {
  display: block;
}

.result-item-title {
  padding: 10px 0;
  color: var(--text-s);


}
.grid-auto{
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  >span{
    display: flex;
    justify-content: center;
  }
}

.result-item-content{
  padding: 10px 0;
  &:hover{
    background-color: var(--card-border-color);
  }
}
.fast-lap-text{
  color: var(--fast-lap-purple);
}
</style>
