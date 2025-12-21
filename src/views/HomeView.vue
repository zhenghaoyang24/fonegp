<script setup lang="ts">
import FOAnimatedNumber from "@/components/common/FOAnimatedNumber.vue";
import type { Option } from "@/type/common";
import FOCard from "@/components/common/FOCard.vue";
import FOHero from "@/components/common/FOHero.vue";
import { seasonStorage } from "@/stores/seasonStore";
import { computed, onMounted, ref } from "vue";
const useSeasonStore = seasonStorage()
import { useI18n } from 'vue-i18n'
import FOProgress from "@/components/common/FOProgress.vue";
import FOIcon from "@/components/common/FOIcon.vue";
import MatchCard from "@/components/common/MatchCard.vue";
import FOCollapse from "@/components/common/FOCollapse.vue";
const { t } = useI18n()
onMounted(() => {
  Promise.all([
    // fetch current season year
    useSeasonStore.setCurrentSeasonYearAction()
  ])
})

// current season matches
const seasonData = computed<Option[]>(() => [
  { label: t('text.totalMatches'), value: 24 },
  { label: t('text.completedMatches'), value: 12 },
  { label: t('text.remainingMatches'), value: 12 },
  { label: t('text.totalPoints'), value: 1000 },
])
</script>

<template>
  <div class="w-full bg-bg">
    <FOHero>
      <h3 class="m-o p-0 text-primary font-bold text-4xl text-center max-md:text-3xl">{{ `${useSeasonStore.currentSeasonYearState}
        ${$t('text.championshipName')}` }}</h3>
    </FOHero>
    <div class="grid gap-responsive">
      <div class="grid grid-cols-2 max-md:grid-cols-1 gap-responsive">
        <FOCard :title="$t('text.currentSeasonInfo')" icon="mage:message-information-fill">
          <template #content>
            <div class="flex flex-col gap-responsive">
              <FOAnimatedNumber :data="seasonData" />
              <FOProgress :value="50" />
              <div class="border-t border-line pt-responsive grid gap-responsive grid-cols-2 max-md:grid-cols-1">
                <div>
                  <h3 class="text-ts text-sm">{{ $t('text.topThreeDrivers') }}</h3>
                </div>
                <div>
                  <h3 class="text-ts text-sm">{{ $t('text.topThreeTeams') }}</h3>
                </div>
              </div>
            </div>
          </template>
        </FOCard>
        <FOCard :title="$t('text.nextMatch')" icon="maki:racetrack">
          <template #content>
            <div class="flex flex-col gap-responsive pt-1">
              <MatchCard />
              <div class="border-t border-line pt-responsive">
                
              </div>
            </div>
          </template>
        </FOCard>
      </div>
      <div class="grid grid-cols-1">
        <FOCard :title="$t('text.lastMatchResult')" icon="carbon:result">
          <FOCollapse />
        </FOCard>
      </div>
    </div>
  </div>
</template>
