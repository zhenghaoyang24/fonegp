import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import axios from "axios";
import {F1_API} from "@/utils/api.ts";
import type {RaceArray} from "@/interface/RaceArray.ts";
import raceDefault from '@/data/raceDefault.json'
import type {CurrentSeasonSchedule, RaceSchedule, RaceScheduleTypeDate} from "@/interface/RaceScheduleArray.ts";
import dateUtils from "@/utils/dateUtils.ts";

export const seasonDataStorage = defineStore(
    'seasonDataStorage', () => {

        const lastFetchTime = ref<Date>(new Date(1900, 1, 1))
        function refreshLastFetchTime(){
            lastFetchTime.value = dateUtils.getDate()
        }

        const currentSeasonInfoOfAllRaces = ref<RaceArray>(raceDefault)
        const currentRoundStore = ref<number>(0)
        const currentSeasonStore = ref<number>(0)
        const totalRoundStore = ref<number>(0)
        const lastRoundInfoOfRace = ref<any>()
        const nextRoundInfoOfRace = ref<any>()
        const currentRacesScheduleDate = ref<CurrentSeasonSchedule>({
            races: [],
            season: 0,
        })

        async function refreshLastRoundInfo(): Promise<boolean> {
            try {
                const res = await axios.get(F1_API.lastRoundApi)
                lastRoundInfoOfRace.value = res.data.race[0]
                currentRoundStore.value = res.data.round
                return true
            } catch (error) {
                console.error(error)
                return false
            }
        }

        async function refreshNextRoundInfo(): Promise<boolean> {
            try {
                const res = await axios.get(F1_API.nextRoundApi)
                nextRoundInfoOfRace.value = res.data.race[0]
                return true
            } catch (error) {
                console.error(error)
                return false
            }
        }

        async function refreshCurrentSeasonInfo(): Promise<boolean> {
            try {
                const res = await axios.get(F1_API.currentSeasonApi)
                currentSeasonInfoOfAllRaces.value = res.data.races
                totalRoundStore.value = res.data.total
                currentSeasonStore.value = res.data.season
                if (currentRacesScheduleDate.value.season !== currentSeasonStore.value) {
                    fetchRaceScheduleDate(currentSeasonInfoOfAllRaces.value)
                }
                return true
            } catch (error) {
                console.error(error)
                return false
            }
        }


        /**
         * 获取赛程日期
         * @param races
         */
        function fetchRaceScheduleDate(races: RaceArray) {
            const raceType = ["fp1", "fp2", "fp3", "qualy", "race", "sprintQualy", "sprintRace"] as const;

            currentRacesScheduleDate.value.races = []  //清空所有赛程日历
            currentRacesScheduleDate.value.season = currentSeasonStore.value  // 赋值 赛季值
            races.forEach(race => {
                    const newRaceScheduleFormated: RaceSchedule = {  //新建 一场比赛 赛程单项 赛道id 与赛程
                        circuitId: race.circuit.circuitId,
                        scheduleDate: <RaceScheduleTypeDate[]>[]
                    }
                    const raceSchedule = race.schedule;
                    const typeScheduleDateFormated: RaceScheduleTypeDate[] = []  // 本场 单个类型 赛程日期
                    raceType.forEach(type => {
                        const raceData = raceSchedule[type];
                        if (raceData?.date !== null && raceData?.date !== undefined) { // 此类型 赛程 有安排，则加入

                            typeScheduleDateFormated.push({
                                type: type,
                                schedule: {
                                    date: raceData.date,
                                    time: raceData.time,
                                }
                            })
                        }
                    });
                    // 按日期排序
                    typeScheduleDateFormated.sort((a, b) => {
                        return new Date(`${a.schedule.date!}T${a.schedule.time}`).getTime() - new Date(`${b.schedule.date!}T${b.schedule.time}`).getTime();
                    });
                    newRaceScheduleFormated.scheduleDate = typeScheduleDateFormated
                    // 将 本场所有赛程安排加入到 本赛季 赛程安排中
                    currentRacesScheduleDate.value.races.push(newRaceScheduleFormated)
                }
            );
        }

        return {
            lastFetchTime,
            currentRoundStore,
            totalRoundStore,
            currentSeasonStore,
            currentSeasonInfoOfAllRaces,
            lastRoundInfoOfRace,
            nextRoundInfoOfRace,
            currentRacesScheduleDate,
            refreshCurrentSeasonInfo,
            refreshLastRoundInfo,
            refreshNextRoundInfo,
            refreshLastFetchTime
        }
    }, {
        persist: [
            {
                pick: ['currentRacesScheduleDate','nextRoundInfoOfRace','lastRoundInfoOfRace','lastFetchTime','currentSeasonInfoOfAllRaces','currentSeasonStore','currentRoundStore','totalRoundStore'],
            }
        ]
    })
