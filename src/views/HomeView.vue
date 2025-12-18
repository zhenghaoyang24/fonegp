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
])
</script>

<template>
  <div class="w-full bg-bg">
    <FOHero>
      <h3 class="m-o p-0 text-primary font-bold text-4xl max-md:text-2xl">{{ `${useSeasonStore.currentSeasonYearState}
        ${$t('text.championshipName')}` }}</h3>
    </FOHero>
    <div class="mt-10">
      <div class="grid grid-cols-2 max-md:grid-cols-1 gap-4 max-md:gap-2">
        <FOCard :title="$t('text.currentSeasonInfo')" icon="mage:message-information-fill">
          <template #content>
            <div class="flex flex-col gap-6 max-md:gap-2">
              <FOAnimatedNumber :data="seasonData" />
              <FOProgress :value="50" />
            </div>
          </template>
        </FOCard>
        <FOCard />
      </div>
    </div>
  </div>
</template>
