<template>
  <div class="bg-bgcard rounded-md border-line border overflow-hidden">
    <div :style="backgroundHead" class="flex gap-1 justify-between items-center p-2">
      <img src="" alt="flag" class="w-5 h-5" />
      <div>
        <p class="text-tp font-bold">{{ driver.driver.name + " " + driver.driver.surname }}</p>
        <p class="text-ts text-sm">{{ driver.team.teamName }}</p>
      </div>
    </div>
    <div class="p-2">
      <div class="flex items-center gap-1 justify-around w-full">
        <div class="text-center">
          <p class="font-bold text-2xl">{{ driver.position }}</p>
          <p class="text-xs text-ts">{{ $t("text.position") }}</p>
        </div>
        <div class="text-center">
          <p class="font-bold text-2xl">{{ driver.points }}</p>
          <p class="text-xs text-ts">{{ $t("text.points") }}</p>
        </div>
      </div>
      <div class="border-t border-line mt-2 pt-2 text-sm text-ts gap-2 flex flex-col">
        <div class="flex justify-between">
          <p>{{ $t("text.seasonWins") }}</p>
          <p class="text-tp">{{ driver.wins }}</p>
        </div>
        <div class="flex justify-between">
          <p>Number</p>
          <p class="text-tp">{{ driver.driver.number }}</p>
        </div>
        <div class="flex justify-between">
          <p>Driver Code</p>
          <p class="text-tp">{{ driver.driver.shortName }}</p>
        </div>
        <div class="flex justify-between">
          <p>{{ $t("text.birthday") }}</p>
          <p class="text-tp">{{ driver.driver.birthday }}</p>
        </div>
        <div class="flex justify-between">
          <p>{{ $t("text.nationality") }}</p>
          <p class="text-tp">{{ driver.driver.nationality }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import type { DriverChampionship } from "@/type/common";
const backgroundColor = ref<string>("");
const backgroundHead = computed(() => {
  return `background-image: linear-gradient(120deg, ${backgroundColor.value}, transparent 70%)`;
});

const props = defineProps<{
  driver: DriverChampionship;
}>();

// get brand color
import TeamData from "@/data/team.json";
onMounted(() => {
  if (props.driver) {
    const tem = TeamData.find((team) => team.teamId === props.driver.teamId);
    if (tem) {
      backgroundColor.value = tem.brandColor;
    }
  }
});
</script>
