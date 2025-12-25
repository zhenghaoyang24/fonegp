<script setup lang="ts">
import { getCurrentLastRaceResult } from "@/api/resultApi";
import FOAnimatedNumber from "@/components/common/FOAnimatedNumber.vue";
import type { Option, RaceResult } from "@/type/common";
import FOCard from "@/components/common/FOCard.vue";
import FOHero from "@/components/common/FOHero.vue";
import { computed, onMounted, ref } from "vue";
import { dataStorage } from "@/stores/dataStore";
const useDataStorage = dataStorage();
import { useI18n } from "vue-i18n";
import FOProgress from "@/components/common/FOProgress.vue";
import MatchCard from "@/components/common/MatchCard.vue";
import FOCollapse from "@/components/common/FOCollapse.vue";
import FOIcon from "@/components/common/FOIcon.vue";
const { t } = useI18n();

// current season matches
const seasonData = computed<Option[]>(() => [
  { label: t("text.totalMatches"), value: useDataStorage.currentRaceListState?.length || 0 },
  { label: t("text.completedMatches"), value: lastRaceResultRef.value?.round || 0 },
  {
    label: t("text.remainingMatches"),
    value:
      (useDataStorage.currentRaceListState?.length || 0) - (lastRaceResultRef.value?.round || 0),
  },
]);
// const progress = computed(() => {
//   return (
//     (lastRaceResultRef.value?.round || 0) / (useDataStorage.currentRaceListState?.length || 0)
//   );
// });
const isFetching = ref(false);
const lastRaceResultRef = ref<RaceResult | null>();
onMounted(async () => {
  isFetching.value = true;
  try {
    const [lastRaceResult] = await Promise.all([getCurrentLastRaceResult()]);
    if (lastRaceResult.status === 200) {
      lastRaceResultRef.value = lastRaceResult.data!;
    }
    lastRaceResultRef.value = null;
    console.log(lastRaceResultRef.value);
  } catch (error) {
    console.log(error);
  } finally {
    isFetching.value = false;
  }
});
</script>

<template>
  <div class="w-full bg-bg">
    <FOHero>
      <h3 class="m-o p-0 text-primary font-bold text-4xl text-center max-md:text-3xl">
        {{
          `${useDataStorage.currentSeasonYearState}
        ${$t("text.championshipName")}`
        }}
      </h3>
    </FOHero>
    <div class="grid gap-responsive">
      <div class="grid grid-cols-2 max-md:grid-cols-1 gap-responsive">
        <FOCard :title="$t('text.currentSeasonInfo')" icon="mage:message-information-fill">
          <template #content>
            <div class="flex flex-col gap-responsive">
              <FOAnimatedNumber :data="seasonData" />
              <FOProgress
                :value="parseInt(((seasonData[2].value / seasonData[0].value) * 100).toFixed(0))"
              />
              <div class="border-t border-line pt-responsive flex flex-col gap-1">
                <div class="flex items-center gap-1">
                  <FOIcon icon="lucide-lab:motor-racing-helmet" color="var(--color-ts)" />
                  <h3 class="text-ts text-sm">{{ $t("text.leadingDriver") }}:</h3>
                </div>
                <div class="flex items-center gap-1">
                  <FOIcon icon="ri:team-fill" color="var(--color-ts)" />
                  <h3 class="text-ts text-sm">{{ $t("text.leadingTeam") }}:</h3>
                </div>
              </div>
            </div>
          </template>
        </FOCard>
        <FOCard :title="$t('text.nextMatch')" icon="maki:racetrack">
          <template #content>
            <div class="flex flex-col gap-responsive pt-1">
              <MatchCard />
              <div class="border-t border-line pt-responsive"></div>
            </div>
          </template>
        </FOCard>
      </div>
      <div class="grid grid-cols-1">
        <FOCard :title="$t('text.lastMatchResult')" icon="carbon:result">
          <template #content>
            <FOCollapse :open="true" />
          </template>
        </FOCard>
      </div>
    </div>
  </div>
</template>
