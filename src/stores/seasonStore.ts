import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import axios from "axios";
import {api} from "@/utils/api.ts";

export const seasonDataStorage = defineStore(
    'seasonDataStorage', () => {


        const currentSeasonInfoOfAllRaces = ref<Array<Object>>()
        const currentRoundStore = ref<number>(0)
        const currentSeasonStore = ref<number>(0)
        const totalRoundStore = ref<number>(0)
        const lastRoundInfoOfRace = ref<any>()
        const nextRoundInfoOfRace = ref<any>()

        async function refreshLastRoundInfo():Promise<boolean> {
            try{
                const res=  await axios.get(api.lastRoundApi)
                lastRoundInfoOfRace.value = res.data.race[0]
                currentRoundStore.value = res.data.round
                return true
            }catch (error){
                console.error(error)
                return false
            }
        }
        async function refreshNextRoundInfo(): Promise<boolean> {
            try{
                const res=  await axios.get(api.nextRoundApi)
                nextRoundInfoOfRace.value = res.data.race[0]
                return true
            }catch (error){
                console.error(error)
                return false
            }
        }

        async function refreshCurrentSeasonInfo(): Promise<boolean> {
            try{
                const res=  await axios.get(api.currentSeasonApi)
                currentSeasonInfoOfAllRaces.value = res.data.races
                totalRoundStore.value = res.data.total
                currentSeasonStore.value = res.data.season
                return true
            }catch (error){
                console.error(error)
                return false
            }
        }
        return {
            currentRoundStore,
            totalRoundStore,
            currentSeasonStore,
            currentSeasonInfoOfAllRaces,
            lastRoundInfoOfRace,
            nextRoundInfoOfRace,
            refreshCurrentSeasonInfo,
            refreshLastRoundInfo,
            refreshNextRoundInfo
        }
    }, {
        persist: [
            {
                pick: ['currentSeason', 'currentSeasonInfo'],
            }
        ]
    })
