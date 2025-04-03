<script setup lang="ts">
import {Icon} from '@iconify/vue'
import {computed, ref} from "vue";
import dateUtils from "@/utils/dateUtils.ts";
import circuit from '@/data/circuit.json'
import RaceStatusCom from "@/components/RaceStatusCom.vue";
import {seasonDataStorage} from "@/stores/seasonStore.ts";
import {storeToRefs} from "pinia";
import raceUtils from "../utils/raceUtils.ts";

const seasonData = seasonDataStorage();
const {
  currentRacesScheduleDate,
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
// 本轮id
const circuitId = computed(() => {
  return props.race.circuit.circuitId
})
// 本轮的日程
const theRaceSchedule = computed(() => {
  return currentRacesScheduleDate.value.races.find(item => {
    if (item.circuitId === circuitId.value)
      return item
  })?.scheduleDate
})


// 日期
const raceStartEndDateString = computed(() => {
  const fp1DateString = props.race.schedule.race.date;
  const raceDateString = props.race.schedule.race.date;
  if (!fp1DateString || !raceDateString)
    return '待公布'
  else {
    //  转换时间
    const fp1_local_time = scheduleFormatDate(fp1DateString, props.race.schedule.fp1.time)
    const race_local_time =scheduleFormatDate(raceDateString, props.race.schedule.race.time)
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
const raceDate = computed(() => {
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

const circuitInfo = computed(() => {
  return circuit.find(item => {
    if (item.circuitId === circuitId.value)
      return item
  })
})

function scheduleFormatDateTime(date:any,time:any){
    return  dateUtils.getMonthDay(dateUtils.convertUTCtoCST(date, time))+' '+dateUtils.getHoursMinutes(dateUtils.convertUTCtoCST(date, time))
}
function scheduleFormatDate(date:any,time:any){
  return  dateUtils.getMonthDay(dateUtils.convertUTCtoCST(date, time))
}
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
          <div class="race-item-detail-track-item">
            <Icon icon="tabler:number"/>
            第{{ theRaceRound }}场
          </div>
          <div class="race-item-detail-track-schedule">
            <div class="race-item-detail-track-schedule-icon">
              <Icon icon="cil:calendar"/>
            </div>
            <div class="race-item-detail-track-schedule-content">
              <div v-for="(item ,index) in theRaceSchedule" :key="index" class="race-item-detail-track-schedule-item">
                <span>{{ raceUtils.getRaceTypeZh(item.type) }}</span>
                {{scheduleFormatDateTime(item.schedule.date,item.schedule.time)}}
              </div>
            </div>
          </div>
          <div class="race-item-detail-track-item">
            <Icon icon="mdi:address-marker"/>
            {{ circuitInfo?.country_zh }} ,{{ circuitInfo?.city_zh }}
          </div>
          <div class="race-item-detail-track-item">
            <Icon icon="maki:racetrack"/>
            {{ circuitInfo?.circuitName_zh }}
          </div>
          <div class="race-item-detail-track-item">
            <Icon icon="material-symbols:trail-length"/>
            {{ circuitLength }} {{ laps }}圈 {{ corners }}个弯
          </div>
          <div class="race-item-detail-track-item">
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

  .race-item-detail-track-item {
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

.race-item-detail-track-schedule {
  display: flex;
  justify-content: start;
  align-items: start;
}
.race-item-detail-track-schedule-content{
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media screen and (max-width: 770px) {
    grid-template-columns: 1fr;
  }
  .race-item-detail-track-schedule-item{
    >span{
      color: var(--text-s);
    }
  }
}
.race-item-detail-track-schedule-icon {
  color: var(--text-s);
  margin-right: 5px;
  display: flex;
  align-items: start;
}
</style>
