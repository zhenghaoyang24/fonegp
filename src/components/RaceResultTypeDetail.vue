<script setup lang="ts">
import type {RaceScheduleTypeDate} from "@/interface/RaceScheduleArray.ts";
import dateUtils from "@/utils/dateUtils.ts";
import raceUtils from "@/utils/raceUtils.ts";
import {onBeforeMount, ref, watch} from "vue";
import {Icon} from "@iconify/vue";

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
</script>

<template>
  <div class="race-result-one-type-content">
    <div class="type-title" @click="collapseRaceDetail">
      <span>{{ scheduleFormatDateTime(schedule?.date, schedule?.time) }}</span>
      <span>{{ raceUtils.getRaceTypeZh(type) }}</span>
      <span class="item-collapse-icon" ref="collapseIconElement"> <Icon icon="ooui:collapse"/> </span>
    </div>
    <div class="type-result-detail" v-show="!collapseStatus">
      详细数据
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
.item-collapse-icon{
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
.type-result-detail{
  padding: 10px;
}
</style>
