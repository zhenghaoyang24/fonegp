<script setup lang="ts">
import {Icon} from '@iconify/vue'
import {computed, onBeforeMount, ref} from "vue";
import dateUtils from "@/utils/dateUtils.ts";
import circuit from '@/data/circuit.json'
import RaceStatusCom from "@/components/RaceStatusCom.vue";
import {seasonDataStorage} from "@/stores/seasonStore.ts";
import {storeToRefs} from "pinia";
import raceTypeJson from '@/data/raceType.json'
const seasonData = seasonDataStorage();
const {
  currentRoundStore
} = storeToRefs(seasonData)
const props = defineProps({
  race: {
    type: Object,
    required: true
  },
  collapse: {
    type: Boolean,
    default: false
  },
  showTitle: {
    type: Boolean,
    default: true
  }
})
// 日期
const raceStartEndDateString = computed(() => {
  const fp1DateString = props.race.schedule.race.date;
  const raceDateString = props.race.schedule.race.date;
  if (!fp1DateString || !raceDateString)
    return '待公布'
  else {
    //  转换时间
    const fp1_local_time = dateUtils.getMonthDay(dateUtils.convertUTCtoCST(fp1DateString, props.race.schedule.fp1.time))
    const race_local_time = dateUtils.getMonthDay(dateUtils.convertUTCtoCST(raceDateString, props.race.schedule.race.time))
    return `${fp1_local_time}-${race_local_time}`
  }
});
// 比赛item 折叠
const collapseStatus = ref<boolean>(props.collapse);
const collapseIconElement = ref<HTMLElement | null>(null)
const collapseRaceDetail = () => {
  if (!collapseStatus.value) {
    collapseStatus.value = true
    if (collapseIconElement.value)
      collapseIconElement.value.style.transform = "rotateZ(180deg)"
  } else {
    collapseStatus.value = false
    if (collapseIconElement.value)
      collapseIconElement.value.style.transform = "rotateZ(90deg)"
  }
}
const theRaceRound = ref<number>(props.race.round)
/*
比赛 时间
* */
// 正赛
const raceDate = computed(()=>{
  return dateUtils.convertUTCtoCST(props.race.schedule.race.date, props.race.schedule.race.time)
})
const lapRecord = computed(() => {
  return props.race.circuit.lapRecord
})
const circuitLength = computed(() => {
  return props.race.circuit.circuitLength
})
const corners = computed(() => {
  return props.race.circuit.corners
})
const laps = computed(() => {
  return props.race.circuit.laps
})
const circuitId = computed(() => {
  return props.race.circuit.circuitId
})
const circuitInfo = computed(() => {
  return circuit.find(item =>{
    if (item.circuitId === circuitId.value)
      return item
  })
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
function theRaceScheduleFormat(){
  return theRaceSchedule.value.forEach(item => {
    raceTypeJson.forEach(TypeJson => {
      return TypeJson.type === item.type
    })
  });
}
onBeforeMount(()=>{
  fetchTheRaceSchedule(props.race.schedule)
  theRaceScheduleFormat()
  // console.log(theRaceSchedule.value)
})
</script>

<template>
  <div class="race-item">
    <div class="race-item-overview" @click="collapseRaceDetail" v-if="showTitle">
      <span>{{ raceStartEndDateString }}</span>
      <span>{{ circuitInfo?.raceName_zh }}</span>
      <span><RaceStatusCom :propsData="raceDate"/></span>
      <span class="race-item-collapse-icon" ref="collapseIconElement"> <Icon icon="ooui:collapse"/> </span>
    </div>
    <div class="race-item-detail" v-show="collapseStatus">
      <div class="race-item-detail-basic">
        <div class="race-item-detail-track">
          <div>
            <Icon icon="tabler:number"/>
            第{{ theRaceRound }}场
          </div>
          <div>
            <Icon icon="cil:calendar"/>
            {{ dateUtils.getMonthDay(raceDate) }} {{dateUtils.getHoursMinutes(raceDate)}}
          </div>
          <div>
            <Icon icon="mdi:address-marker"/>
            {{ circuitInfo?.country_zh }} ,{{ circuitInfo?.city_zh }}
          </div>
          <div>
            <Icon icon="maki:racetrack"/>
            {{ circuitInfo?.circuitName_zh }}
          </div>
          <div>
            <Icon icon="material-symbols:trail-length"/>
            {{ circuitLength }} {{ laps }}圈 {{ corners }}个弯
          </div>
          <div>
            <Icon icon="mingcute:time-line"/>
            最快记录：{{ lapRecord }}
          </div>
        </div>
        <div class="circuit-img-content">
          <img :src="circuitInfo?.circuitImg" alt="">
        </div>
      </div>
      <div class="race-item-detail-result" v-if="theRaceRound <= currentRoundStore">
        <router-link :to="`/result/${theRaceRound}`" exact>详细结果</router-link>
      </div>
    </div>

  </div>
</template>

<style scoped>
.race-item {
  cursor: pointer;
  margin: 0;
  background-color: var(--card-bg-color);
  border: 1px solid var(--card-border-color);
  border-radius: var(--border-radius);
}

.race-item-overview {
  padding: 10px;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  > span {
    display: flex;
    justify-content: center;
  }
}

.race-item-detail {
  padding: 10px 20px;
  cursor: auto;

  .race-item-detail-basic {
    display: grid;
    grid-template-columns: 3fr 1fr;
  }

  .race-item-detail-result {
    padding: 7px 0;

    > a {
      color: var(--text-s) !important;
      font-size: 0.9em;

      &:hover {
        color: var(--brand-color) !important;
      }
    }
  }
}

.circuit-img-content {
  display: flex;
  justify-content: center;
  align-items: center;

  > img {
    width: 130px;
  }
}

.race-item-collapse-icon {
  color: var(--text-s);
  position: absolute;
  display: flex;
  align-items: center;
  right: 20px;
  top: 0;
  bottom: 0;
  transform: rotateZ(90deg);
  transform-origin: center;
  transition: transform .3s;
}

.race-item-detail-track {
  display: block;
  > div {
    padding: 4px 0;
    display: flex;
    align-items: center;

    > svg {
      color: var(--text-s);
      margin-right: 5px;
    }
  }
}

.the-race-detail {
  padding: 5px 20px;
}
</style>
