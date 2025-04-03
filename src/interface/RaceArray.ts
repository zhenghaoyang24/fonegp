// 比赛类型 时间日程 对象
interface RaceScheduleDate {
    date: string | null;
    time: string | null;
}

interface RaceSchedule {
    race: RaceScheduleDate;
    qualy: RaceScheduleDate;
    fp1: RaceScheduleDate;
    fp2: RaceScheduleDate;
    fp3: RaceScheduleDate;
    sprintQualy: RaceScheduleDate;
    sprintRace: RaceScheduleDate;
}

interface FastLap {
    fast_lap: string | null;
    fast_lap_driver_id: string | null;
    fast_lap_team_id: string | null;
}

interface Circuit {
    circuitId: string;
    circuitName: string;
    country: string;
    city: string;
    circuitLength: string;
    lapRecord: string;
    firstParticipationYear: number;
    corners: number;
    fastestLapDriverId: string;
    fastestLapTeamId: string;
    fastestLapYear: number;
    url: string;
}

export interface Race {
    raceId: string;
    championshipId: string;
    raceName: string | null;
    schedule: RaceSchedule;
    laps: number | null;
    round: number;
    url: string | null;
    fast_lap: FastLap;
    circuit: Circuit;
    winner: string | null;
    teamWinner: string | null;
}

// 如果需要数组类型
export type RaceArray = Race[];
