<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import circuit from "@/data/circuit.json";
import {Icon} from "@iconify/vue";

// 获取 所有 比赛信息
const props = defineProps({
  round: {
    type: Number,
    required: true
  },
  circuitId: {
    type: String,
    required: true
  },
})

// 获取选中比赛的 基本信息
const selectRaceInfo = ref()

function getSelectRaceInfo(circuitId: any) {
  return circuit.find(item => {
    return item.circuitId === circuitId
  })
}

// 初始时 获取数据
onMounted(() => {
  selectRaceInfo.value = getSelectRaceInfo(props.circuitId)
})

// props 改变时 获取数据
watch(() => props.round, (_new, _old) => {
  // props 改变 刷新数据
  selectRaceInfo.value = getSelectRaceInfo(props.circuitId)
})

// 定义 emit类型
const emits = defineEmits<{ (e: 'changeRaceRoundEmit', args: number): void }>()

// 更改轮次
function changeRaceRoundBtn(delta: boolean) {
  if (delta) // +1
    emits('changeRaceRoundEmit', props.round + 1)
  else
    emits('changeRaceRoundEmit', props.round - 1)
}

</script>

<template>
  <div class="race-detail-left-overview">
    <div class="left-overview-title-slid">
      <span @click="changeRaceRoundBtn(false)"> <Icon icon="fluent:arrow-left-12-filled"/> </span>
      <h3>{{ selectRaceInfo?.raceName_zh }}</h3>
      <span @click="changeRaceRoundBtn(true)"> <Icon icon="fluent:arrow-right-12-filled"/> </span>
    </div>
    <div class="left-overview-info">
      <div>
        <Icon icon="tabler:number"/>
        第{{ props.round }}场
      </div>
      <div>
        <Icon icon="mdi:address-marker"/>
        {{ selectRaceInfo?.country_zh }} ,{{ selectRaceInfo?.city_zh }}
      </div>
      <div>
        <Icon icon="maki:racetrack"/>
        {{ selectRaceInfo?.circuitName_zh }}
      </div>
      <div>
        <Icon icon="material-symbols:trail-length"/>
        {{ selectRaceInfo?.circuitLength }} {{ selectRaceInfo?.laps }}圈 {{ selectRaceInfo?.corners }}个弯
      </div>
    </div>
  </div>
</template>

<style scoped>
.race-detail-left-overview {
  width: 100%;
  height: fit-content;
  padding: 20px;
  box-sizing: border-box;
  background-color: var(--card-bg-color);
  border: 1px solid var(--card-border-color);
  border-radius: var(--border-radius);
  margin: 0 auto;
}

.left-overview-title-slid {
  display: flex;
  justify-content: space-between;

  > h3 {
    display: inline-block;
    padding: 0;
    margin: 0;
  }

  > span {
    user-select: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid var(--card-border-color);
    color: var(--text-s);
    transition: border-top-color 0.1s, border-right-color 0.2s, border-bottom-color 0.3s, border-left-color 0.4s;

    &:hover {
      color: var(--brand-color);
      border-color: var(--brand-color);
    }
  }
}

.left-overview-info {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (max-width: 770px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }

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
</style>
