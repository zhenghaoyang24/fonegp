<script setup lang="ts">
import FOHero from "@/components/common/FOHero.vue";
import FOSelect from "@/components/common/FOSelect.vue";
import { seasonStorage } from "@/stores/dataStore";
import { computed, ref } from "vue";
const useSeasonStore = seasonStorage();

const dataYearRange = computed(() => {
  const startYear = 1950;
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= startYear; year--) {
    years.push({
      value: String(year),
      label: String(year),
    });
  }
  return years;
});
const selectedYear = ref(new Date().getFullYear());
function selectedYearHandle(value: number) {
  selectedYear.value = value;
}
</script>
<template>
  <div class="w-full bg-bg min-h-[50dvh]">
    <FOHero>
      <div class="flex flex-col text-center">
        <h3 class="text-primary font-bold text-4xl max-md:text-2xl">
          {{ `${useSeasonStore.currentSeasonYearState} ${$t("text.season")} - ${$t("text.data")}` }}
        </h3>
      </div>
    </FOHero>
    <div class="flex justify-between items-center border border-line rounded-md p-4">
      <div class="flex items-center gap-2">
        <p class="text-ts">{{ $t("text.filterCriteria") }}:</p>
        <FOSelect
          :showBorder="true"
          :value="selectedYear"
          :options="dataYearRange"
          @change-value="selectedYearHandle"
        />
      </div>
      <div></div>
    </div>
  </div>
</template>

<style scoped></style>
