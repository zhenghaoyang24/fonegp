interface RaceScheduleEvent {
    date: string | null;
    time: string | null;
}

interface RaceSchedule {
    race: RaceScheduleEvent;
    qualy: RaceScheduleEvent;
    fp1: RaceScheduleEvent;
    fp2: RaceScheduleEvent;
    fp3: RaceScheduleEvent;
    sprintQualy: RaceScheduleEvent;
    sprintRace: RaceScheduleEvent;
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
