<template>
  <div class="bg-bgcard rounded-md border-line border overflow-hidden min-w-75">
    <div
      :style="backgroundHead"
      class="flex gap-1 justify-between items-center pt-4 pb-4 pl-2 pr-2"
    >
      <img src="../assets/images/flag-nl.png" alt="flag" class="w-5 h-5" />
      <div>
        <p class="text-tp font-bold">{{ team.team.teamName }}</p>
      </div>
    </div>
    <div class="p-2">
      <div class="flex items-center gap-1 justify-around w-full">
        <div class="text-center">
          <p class="font-bold text-2xl">{{ team.position }}</p>
          <p class="text-xs text-ts">{{ $t("text.position") }}</p>
        </div>
        <div class="text-center">
          <p class="font-bold text-2xl">{{ team.points }}</p>
          <p class="text-xs text-ts">{{ $t("text.points") }}</p>
        </div>
      </div>
      <div class="border-t border-line mt-2 pt-2 text-sm text-ts gap-2 flex flex-col">
        <div class="flex justify-between">
          <p>{{ $t("text.seasonWins") }}</p>
          <p class="text-tp">{{ team.wins }}</p>
        </div>
        <div class="flex justify-between">
          <p>{{ $t("text.teamChampionships") }}</p>
          <p class="text-tp">{{ team.team.constructorsChampionships }}</p>
        </div>
        <div class="flex justify-between">
          <p>{{ $t("text.driverChampionships") }}</p>
          <p class="text-tp">{{ team.team.driversChampionships }}</p>
        </div>
        <div class="flex justify-between">
          <p>{{ $t("text.firstAppareance") }}</p>
          <p class="text-tp">{{ team.team.firstAppareance }}</p>
        </div>
        <div class="flex justify-between">
          <p>{{ $t("text.country") }}</p>
          <p class="text-tp">{{ team.team.country }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import type { TeamChampionship } from "@/type/common";
const backgroundColor = ref<string>("var(--color-primary)");
const backgroundHead = computed(() => {
  return `background-image: linear-gradient(120deg, ${backgroundColor.value}, transparent 70%)`;
});

const props = defineProps<{
  team: TeamChampionship;
}>();

// get brand color
import TeamData from "@/data/team.json";
onMounted(() => {
  if (props.team) {
    backgroundColor.value = TeamData.find((team) => team.teamId === props.team.teamId)!.brandColor;
  }
});
</script>
