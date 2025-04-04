<script setup lang="ts">
import {computed} from "vue";
import dateUtils from "@/utils/dateUtils.ts";

const props = defineProps({
  propsData: {
    type: Date,
    required: true
  }
})
const raceStatus = computed(() => {
  return dateUtils.checkWeek(props.propsData)
});
</script>

<template>
  <div class="race-status">
    <span v-if="raceStatus==='before'" class="status-ed"> 完赛</span>
    <span v-if="raceStatus==='this'" class="status-ing"> 本周</span>
    <span v-if="raceStatus==='after'" class="status-future"> 未赛</span>
  </div>
</template>

<style scoped>
.race-status {
  display: flex;
  justify-content: center;
  width: fit-content;
  height: fit-content;
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
</style>
