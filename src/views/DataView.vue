<script setup lang="ts">
import FOButton from "@/components/common/FOButton.vue";
import FOHero from "@/components/common/FOHero.vue";
import FOSelect from "@/components/common/FOSelect.vue";
import DriverCard from "@/components/data/DriverCard.vue";
import { seasonStorage } from "@/stores/dataStore";
import { computed, reactive, ref } from "vue";
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

/**
 * @description 筛选逻辑
 */
// 选中样式
const activeStyle = {
  "background-color": "var(--color-primary)",
  color: "var(--color-tp)",
};
// 选中类型
const selectedType = ref<"drivers" | "teams" | "circuits">("drivers");
// 筛选类型
function selectedTypeHandle(value: "drivers" | "teams" | "circuits") {
  selectedType.value = value;
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
        <FOButton
          :style="[selectedType === 'drivers' ? activeStyle : '']"
          :text="$t('text.drivers')"
          @click="selectedTypeHandle('drivers')"
        />
        <FOButton
          :text="$t('text.teams')"
          :style="[selectedType === 'teams' ? activeStyle : '']"
          @click="selectedTypeHandle('teams')"
        />
        <FOButton
          :text="$t('text.circuits')"
          :style="[selectedType === 'circuits' ? activeStyle : '']"
          @click="selectedTypeHandle('circuits')"
        />
      </div>
      <div></div>
    </div>
    <div class="mt-2">
      <Transition name="slide-fade" mode="out-in">
        <div v-if="selectedType === 'drivers'">
          <div class="grid grid-cols-3 gap-4">
            <DriverCard />
          </div>
        </div>
        <div v-else-if="selectedType === 'teams'">teams</div>
        <div v-else="selectedType === 'circuits'">circuits</div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.1s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
