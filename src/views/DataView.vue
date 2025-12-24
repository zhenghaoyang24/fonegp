<script setup lang="ts">
// components import
import FOButton from "@/components/common/FOButton.vue";
import FOHero from "@/components/common/FOHero.vue";
import FOSelect from "@/components/common/FOSelect.vue";
import DriverCard from "@/components/data/DriverCard.vue";
import TeamCard from "@/components/data/TeamCard.vue";
// store import
import { seasonStorage } from "@/stores/dataStore";
import { computed, onMounted, ref, watch } from "vue";
const useSeasonStore = seasonStorage();
// type import
import type { DriverChampionship, Race, TeamChampionship } from "@/type/common";
// 接口导入
import { getDriversChampionshipByYear } from "@/api/driverApi";
import { getTeamChampionshipByYear } from "@/api/teamApi";
import { getRaceListByYear } from "@/api/raceApi";
import CircuitCard from "@/components/data/CircuitCard.vue";

/**
 * @description 年份选择
 * 获取选取年份的车手、车队、赛道信息
 */
// 年份范围，从1950年开始
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
// 选中的年份
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

/**
 * @description 获取初始数据并监听 selectedYear 变化
 */
const isFetching = ref(false);
const driversList = ref<DriverChampionship[]>([]);
const teamsList = ref<TeamChampionship[]>([]);
const racesList = ref<Race[]>([]);
onMounted(async () => {
  isFetching.value = true;

  try {
    const [drivers, teams, races] = await Promise.all([
      getDriversChampionshipByYear(selectedYear.value),
      getTeamChampionshipByYear(selectedYear.value),
      getRaceListByYear(selectedYear.value),
    ]);

    if (drivers.status === 200) {
      driversList.value = drivers.data!;
    }
    if (teams.status === 200) {
      teamsList.value = teams.data!;
    }
    if (races.status === 200) {
      racesList.value = races.data!;
    }
  } catch (error) {
    // 可选：处理网络错误或请求失败
    console.error("Failed to fetch championship data:", error);
  } finally {
    isFetching.value = false;
  }
});
// 用于存储防抖定时器
let debounceTimer: ReturnType<typeof setTimeout> | null = null;
watch(selectedYear, async (newValue) => {
  isFetching.value = true;
  // 如果有正在等待的请求，先清除它
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  // 设置新的防抖定时器
  debounceTimer = setTimeout(async () => {
    const [drivers, teams, races] = await Promise.all([
      getDriversChampionshipByYear(selectedYear.value),
      getTeamChampionshipByYear(selectedYear.value),
      getRaceListByYear(selectedYear.value),
    ]);

    if (drivers.status === 200) {
      driversList.value = drivers.data!;
    }
    if (teams.status === 200) {
      teamsList.value = teams.data!;
    }
    if (races.status === 200) {
      racesList.value = races.data!;
    }
    isFetching.value = false;
  }, 1000); // 防抖延迟：300ms
});
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
    <div class="flex max-md:block items-center border border-line rounded-md p-4 gap-4">
      <p class="text-ts">{{ $t("text.filterCriteria") }}:</p>
      <div class="flex justify-start items-center gap-2">
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
    </div>
    <div class="mt-2">
      <div v-if="!isFetching">
        <Transition name="slide-fade" mode="out-in">
          <div v-if="selectedType === 'drivers'">
            <div class="w-full grid gap-x-2 gap-y-4 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
              <DriverCard v-for="driver in driversList" :driver="driver" />
            </div>
          </div>
          <div v-else-if="selectedType === 'teams'">
            <div class="w-full grid gap-x-2 gap-y-4 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
              <TeamCard v-for="team in teamsList" :team="team" />
            </div>
          </div>
          <div v-else="selectedType === 'circuits'">
            <div class="w-full grid gap-x-2 gap-y-4 grid-cols-2 max-md:grid-cols-1">
              <CircuitCard v-for="race in racesList" :race="race" />
            </div>
          </div>
        </Transition>
      </div>
      <div v-else class="flex justify-center items-center h-[50dvh]">
        {{ $t("message.dataLoading") }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
