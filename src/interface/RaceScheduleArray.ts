interface RaceScheduleDate {
    date: string | null;
    time: string | null;
}
export interface RaceScheduleTypeDate {
    type: RaceType,
    schedule: RaceScheduleDate
}
const raceType = ["fp1", "fp2", "fp3", "qualy", "race", "sprintQualy", "sprintRace"] as const;
type RaceType = typeof raceType[number];
export type RaceSchedule = {
    circuitId: string,
    scheduleDate: RaceScheduleTypeDate[]
}
export type CurrentSeasonSchedule = {
    season: string | number,
    races: RaceSchedule[]
}
