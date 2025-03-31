<script setup lang="ts">
import {computed, onMounted} from "vue";
import dateUtils from "@/utils/dateUtils.ts";
const props = defineProps({
  propsData: {
    type: String,
    required: true
  }
})
const raceStatus = computed(() => {
  return dateUtils.raceStatusFormat(props.propsData);
});
</script>

<template>
<div class="race-status">
  <span v-if="raceStatus===0" class="status-ed"> 完赛</span>
  <span v-if="raceStatus===1" class="status-ing"> 本周</span>
  <span v-if="raceStatus===2" class="status-future"> 未赛</span>
</div>
</template>

<style scoped>
.race-status{
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
