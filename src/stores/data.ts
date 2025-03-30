import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import dateUtil from '../utils/dateUtils'
export const seasonDataStorage = defineStore('seasonDataStorage', () => {

    const currentSeason = ref<Number>(dateUtil.getFullYear())
    const totalRound = ref<Number>(0)



    return {currentSeason}
}, {
    persist: [
        {
            pick: ['currentSeason'],
        }
    ]
})
