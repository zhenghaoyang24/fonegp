<template>
  <div
    class="bg-bgcard rounded-md border-line border overflow-hidden p-4 flex flex-col gap-2 max-md:p-2 max-md:gap-1"
  >
    <div class="flex justify-between items-center gap-4">
      <img v-if="flagUrl" class="h-20 max-md:h-12 rounded" :src="flagUrl" alt="" />
      <div class="text-end overflow-hidden text-nowrap text-ellipsis">
        <div class="font-bold text-3xl max-md:text-lg text-primary overflow-hidden text-ellipsis">
          {{ race.circuit.circuitName }}
        </div>
        <div class="text-sm text-ts">{{ race.circuit.city + ", " + race.circuit.country }}</div>
      </div>
    </div>
    <div class="flex max-md:block gap-2 border-t border-line pt-4">
      <div
        v-if="circuildUrl"
        class="w-[40%] flex items-center justify-center max-md:w-full max-md:pb-2"
      >
        <img class="w-[90%]" :src="circuildUrl" alt="circuil" />
      </div>
      <div
        class="w-[60%] max-md:w-full border-l border-line pl-2 max-md:border-t max-md:border-l-0 max-md:pl-0 max-md:pt-2"
      >
        <div class="border-b border-line pt-1 pb-2">
          <p class="text-sm text-ts">Circuit Length</p>
          <p class="text-3xl">{{ formatKm(race.circuit.circuitLength) }}</p>
        </div>
        <div class="grid grid-cols-2 gap-2 pt-2">
          <div>
            <p class="text-sm text-ts">corners</p>
            <p class="text-2xl">{{ race.circuit.corners }}</p>
          </div>
          <div>
            <p class="text-sm text-ts">laps</p>
            <p class="text-2xl">{{ race.laps }}</p>
          </div>
          <div>
            <p class="text-sm text-ts">First Grand Prix</p>
            <p class="text-2xl">{{ race.circuit.firstParticipationYear }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Race } from "@/type/common";
import { computed, onMounted, ref } from "vue";
import { getFlagUrl, getCircuitBycircuitId } from "@/utils/getUrlUtil";
import { formatKm } from "@/utils/formatUtil";
const props = defineProps<{
  race: Race;
}>();
const flagUrl = ref<string | null>();
const circuildUrl = ref<string | null>();

onMounted(() => {
  if (props) {
    flagUrl.value = getFlagUrl(props.race.circuit.country);
    circuildUrl.value = getCircuitBycircuitId(props.race.circuit.circuitId);
  }
});
</script>
<style scoped></style>
