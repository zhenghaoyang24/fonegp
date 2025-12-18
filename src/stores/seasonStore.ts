import { defineStore } from "pinia";
import { ref } from "vue";
import {getCurrentSeasonInfoRequest} from "@/api/seasonsApi";

export const seasonStorage = defineStore(
  "seasonStorage",
  () => {
    const currentSeasonYearState = ref<number | null>();

    async function setCurrentSeasonYearAction() {
      const year = new Date().getFullYear();
      if(year === currentSeasonYearState.value  ){
        return
      }
      const res = await getCurrentSeasonInfoRequest();
      if(res.status === 200){
        currentSeasonYearState.value = res.data!.year;
      }else{
        currentSeasonYearState.value = null;
      }
    }
    return {currentSeasonYearState,setCurrentSeasonYearAction};
  },
  {
    persist: [
      {
        pick: ['currentSeasonYearState'],
      },
    ],
  }
);
