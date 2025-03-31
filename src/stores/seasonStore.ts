import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import axios from "axios";
import {api} from "@/utils/api.ts";

export const seasonDataStorage = defineStore(
    'seasonDataStorage', () => {

        const currentSeasonInfoOfSeason = ref<Number>(0)
        const currentSeasonInfoOfTotalRound = ref<Number>(0)
        const currentSeasonInfoOfAllRaces = ref<Array<Object>>()

        const lastRoundInfoOfRound = ref<Number>(1)
        const lastRoundInfoOfRace = ref<Object | undefined |any>()
        const nextRoundInfoOfRace = ref<Object | undefined |any>()

        function refreshLastRoundInfo():boolean {
            axios.get(api.lastRoundApi).then(res => {
                lastRoundInfoOfRound.value = res.data.round
                lastRoundInfoOfRace.value = res.data.race[0]
            }).catch(error => {
                console.log(error)
                return false
            })
            return true
        }
        function refreshNextRoundInfo(): boolean {
            axios.get(api.nextRoundApi).then(res => {
                nextRoundInfoOfRace.value = res.data.race[0]
            }).catch(error => {
                console.log(error)
                return false
            })
            return true
        }

        function refreshCurrentSeasonInfo(): boolean {
            axios.get(api.currentSeasonApi).then(res => {
                currentSeasonInfoOfSeason.value = res.data.season
                currentSeasonInfoOfTotalRound.value = res.data.total
                currentSeasonInfoOfAllRaces.value = res.data.races
            }).catch(error => {
                console.log(error)
                return false
            })
            return true
        }


        return {
            currentSeasonInfoOfSeason,
            currentSeasonInfoOfTotalRound,
            currentSeasonInfoOfAllRaces,
            lastRoundInfoOfRound,
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
