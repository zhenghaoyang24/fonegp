import { defineStore } from "pinia";
import { ref } from "vue";
import { getCurrentSeasonInfoRequest } from "@/api/seasonsApi";
import { type Race } from "@/type/common";
import { getCurrentRaceList } from "@/api/raceApi";

export const dataStorage = defineStore(
  "dataStorage",
  () => {
    // 获取当前赛季年份
    const currentSeasonYearState = ref<number | null>();
    async function setCurrentSeasonYearAction() {
      const year = new Date().getFullYear();
      if (year === currentSeasonYearState.value) {
        return;
      }
      const res = await getCurrentSeasonInfoRequest();
      if (res.status === 200) {
        currentSeasonYearState.value = res.data!.year;
      } else {
        currentSeasonYearState.value = null;
      }
    }

    // 获取当前赛季年份
    const currentRaceListState = ref<Race[]>();
    async function setCurrentRaceListAction() {
      const res = await getCurrentRaceList();
      if (res.status === 200) {
        currentRaceListState.value = res.data;
      } else {
        currentRaceListState.value = [];
      }
    }

    return {
      currentSeasonYearState,
      setCurrentSeasonYearAction,
      currentRaceListState,
      setCurrentRaceListAction,
    };
  },
  {
    persist: [
      {
        pick: ["currentSeasonYearState"],
      },
    ],
  }
);
