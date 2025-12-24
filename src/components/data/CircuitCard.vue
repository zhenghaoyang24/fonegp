<template>
  <div class="bg-bgcard rounded-md border-line border overflow-hidden p-4">
    <div class="flex justify-between items-center gap-4">
      <img v-if="flagUrl" class="w-20 rounded" :src="flagUrl" alt="" />
      <div class="text-end overflow-hidden text-nowrap text-ellipsis">
        <div class="font-bold text-lg text-primary overflow-hidden text-ellipsis">
          {{ race.circuit.circuitName }}
        </div>
        <div class="text-sm text-ts">{{ race.circuit.city + ", " + race.circuit.country }}</div>
      </div>
    </div>
    <div class="bg-bg flex justify-between items-center">
        

    </div>
    <div class=" border-t border-line">
        
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Race } from "@/type/common";
import { onMounted, ref } from "vue";
import { getFlagUrl } from "@/utils/flag";
const props = defineProps<{
  race: Race;
}>();
const flagUrl = ref<string | null>();
onMounted(() => {
  if (props) {
    flagUrl.value = getFlagUrl(props.race.circuit.country);
  }
});
</script>

<style scoped></style>
