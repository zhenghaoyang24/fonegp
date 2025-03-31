<script setup lang="ts">
import {Icon} from '@iconify/vue'
import {computed, createElementBlock, ref} from "vue";
import dateUtils from "@/utils/dateUtils.ts";
import infoCnFormatUtil from "@/utils/infoCnFormatUtil.ts";
import circuit from '@/data/circuit.json'

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
const raceStatus = computed(() => {
  const date = props.race.schedule.race.date;
  return dateUtils.raceStatusFormat(date);
});
// 日期
const raceSchedule = computed(() => {
  const fp1Date = props.race.schedule.fp1.date;
  const raceDate = props.race.schedule.race.date;
  if (!fp1Date || !raceDate) return '待公布';
  try {
    const start = dateUtils.getDateParts(fp1Date);
    const end = dateUtils.getDateParts(raceDate);
    return `${dateUtils.formatDate(start)}-${dateUtils.formatDate(end)}`;
  } catch (error) {
    console.error('日期处理错误:', error);
    return '日期无效';
  }
});

// 比赛详情
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
const raceDate = ref<string>(props.race.schedule.race.date)
const lapRecord = ref<string>(props.race.circuit.lapRecord)
const circuitLength = ref<string>(props.race.circuit.circuitLength)
const corners = ref<string>(props.race.circuit.corners)
const laps = ref<string>(props.race.laps)
const circuitId = ref(props.race.circuit.circuitId)
const circuitInfo = ref<any>(circuit.find(item =>{
  if (item.circuitId === circuitId.value)
    return item
}))

</script>

<template>
  <div class="race-item">
    <div class="race-item-overview" @click="collapseRaceDetail" v-if="showTitle">
      <span>{{raceSchedule}}</span>
      <span>{{ infoCnFormatUtil.grandPrixFormatUtil(race.raceName) }}</span>
      <span v-if="raceStatus===0" class="status-ed"> 完赛</span>
      <span v-if="raceStatus===1" class="status-ing"> 本周</span>
      <span v-if="raceStatus===2" class="status-future"> 未赛</span>
      <span class="race-item-collapse-icon" ref="collapseIconElement"> <Icon icon="ooui:collapse"/> </span>
    </div>
    <div class="race-item-detail" v-show="collapseStatus">
      <div class="race-item-detail-track">
        <div>
          <Icon icon="cil:calendar"/>
          {{ raceDate }}
        </div>
        <div>
          <Icon icon="mdi:address-marker"/>
          {{ circuitInfo.country_zh }} ,{{ circuitInfo.city_zh }}
        </div>
        <div>
          <Icon icon="maki:racetrack"/>
          {{ circuitInfo.circuitName_zh }}
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
        <img :src="circuitInfo.circuitImg" alt="">
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

.status-ed {
  color: var(--text-s);
}

.status-ing {
  color: var(--brand-color);
}

.status-future {
  color: var(--text-p);
}

.race-item-detail {
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding:10px 20px;
  cursor: auto;
}
.circuit-img-content{
  display: flex;
  justify-content: center;
  align-items: center;
  >img{
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
.race-item-detail-track{
  display: block;
  >div{
    padding: 4px 0;
    display: flex;
    align-items: center;
    >svg{
      color: var(--text-s);
      margin-right: 5px;
    }
  }
}
</style>
