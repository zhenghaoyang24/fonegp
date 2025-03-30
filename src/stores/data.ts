import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import dateUtils from "@/utils/dateUtils.ts";
import axios from "axios";
export const seasonDataStorage = defineStore(
    'seasonDataStorage', () => {

    const currentSeason = ref<Number>(dateUtils.getFullYear())

    const currentSeasonInfo = ref(null)

        const  refreshCurrentSeasonInfo = ()=> {
        axios.get('https://f1api.dev/api/current').then(res => {
            currentSeasonInfo.value = res.data
            console.log(res.data)
        }).catch(error => {
            console.log(error)
        })
    }


    return {currentSeason,currentSeasonInfo,refreshCurrentSeasonInfo}
}, {
    persist: [
        {
            pick: ['currentSeason','currentSeasonInfo'],
        }
    ]
})
