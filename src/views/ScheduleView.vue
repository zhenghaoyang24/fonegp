<script setup lang="ts">
import FOButton from "@/components/common/FOButton.vue";
import FOCard from "@/components/common/FOCard.vue";
import FOHero from "@/components/common/FOHero.vue";
import { seasonStorage } from "@/stores/dataStore";
const useSeasonStore = seasonStorage();
</script>

<template>
  <div class="w-full bg-bg">
    <FOHero>
      <h3 class="m-o p-0 text-primary font-bold text-center text-4xl max-md:text-2xl">
        {{
          `${useSeasonStore.currentSeasonYearState} ${$t("text.season")} - ${$t("text.schedule")}`
        }}
      </h3>
    </FOHero>
    <div class="flex justify-between items-center border border-line rounded-md p-4">
      <div class="flex items-center gap-2">
        <p class="text-ts">{{ $t("text.filterCriteria") }}:</p>
        <FOButton
          text="All"
          icon="medical-icon:family-practice"
          @click="() => {}"
        />
      </div>
      <div></div>
    </div>
  </div>
</template>
