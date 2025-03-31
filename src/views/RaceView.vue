<script setup lang="ts">
import infoCnFormatUtil from "@/utils/infoCnFormatUtil.ts";
import {seasonDataStorage} from "@/stores/seasonStore.ts";

const seasonData = seasonDataStorage();
import {storeToRefs} from 'pinia'
import {computed, onMounted, ref} from "vue";
import dateUtils from "@/utils/dateUtils.ts";

const {
  currentSeasonInfoOfSeason,
  currentSeasonInfoOfTotalRound,
  lastRoundInfoOfRound,
  lastRoundInfoOfRace,
  nextRoundInfoOfRace
} = storeToRefs(seasonData)

const raceStatus = computed(() => {
  const date = nextRoundInfoOfRace.value.schedule.race.date;
  return dateUtils.raceStatusFormat(date);
});
</script>

<template>

  <div class="content">
    <div class="season-overview-content">
      <h2>{{ currentSeasonInfoOfSeason }}赛季</h2>
      <div class="season-info">
        <p>共 <span>{{ currentSeasonInfoOfTotalRound }}</span> 场比赛</p>
        <p>已进行 <span>{{ lastRoundInfoOfRound }}</span> 场比赛</p>
      </div>
      <div class="round-info">
        <p>上一站：{{ infoCnFormatUtil.grandPrixFormatUtil(lastRoundInfoOfRace.raceName) }}</p>
        <p>下一站：{{ infoCnFormatUtil.grandPrixFormatUtil(nextRoundInfoOfRace.raceName) }}</p>
      </div>
      <div class="this-week">
        本周<span>{{ raceStatus === 1 ? '是' : '不是' }}</span>比赛周！
      </div>
    </div>
    <div class="round-last-next">
      <div class="round-last-next-content">
      </div>

    </div>
  </div>

</template>
<style scoped>
.round-last-next-content {
  background-color: var(--card-bg-color);
  border: 1px solid var(--card-border-color);
  padding: 20px;
  box-sizing: border-box;
  border-radius: var(--border-radius);
}

.season-info {
  > p {
    margin: 10px 0 0 0;

    > span {
      font-size: 2em;
      color: var(--brand-color);
    }
  }
}

.content {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 10px;
}

.season-overview-content {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: var(--card-bg-color);
  border: 1px solid var(--card-border-color);
  border-radius: var(--border-radius);
  margin: 0 auto;

  > h2 {
    padding: 0;
    margin: 0 0 10px 0;
  }
}

.this-week {
  font-size: 1.2em;

  > span {
    color: var(--brand-color);
  }
}
</style>
