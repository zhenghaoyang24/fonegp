export interface Option {
  value: number;
  label: string;
}

export interface Championship {
  championshipId: string;
  championshipName: string;
  url: string;
  year: number;
}

export interface Driver {
  driverId: string;
  name: string;
  surname: string;
  nationality: string;
  birthday: string;
  number: number;
  shortName: string;
  url: string;
}
export interface Team {
  teamId: string;
  teamName: string;
  country: string;
  firstAppearance: number;
  constructorsChampionships: number;
  driversChampionships: number;
  url: string;
}

export interface Schedule {
  race: {
    date: string;
    time: string;
  };
  qualy: {
    date: string;
    time: string;
  };
  fp1: {
    date: string;
    time: string;
  };
  fp2: {
    date: string;
    time: string;
  };
  fp3: {
    date: string;
    time: string;
  };
  sprintQualy: {
    date: null;
    time: null;
  };
  sprintRace: {
    date: null;
    time: null;
  };
}

export interface Circuit {
  circuitId: string;
  circuitName: string;
  country: string;
  city: string;
  circuitLength: string; // 注意：当前值为 "5278km"，含单位，故为 string
  lapRecord: string; // 注意：当前值为 "1:19:813"，格式非常规（应为 1:19.813），但按你给的保留为 string
  firstParticipationYear: number;
  corners: number;
  fastestLapDriverId: string;
  fastestLapTeamId: string;
  fastestLapYear: number;
  url: string;
}

// races type ，
export interface Race {
  raceId: string;
  championshipId: string;
  raceName: string;
  schedule: Schedule;
  laps: number;
  round: number;
  url: string;
  fast_lap: {
    fast_lap: string;
    fast_lap_driver_id: string;
    fast_lap_team_id: string;
  };
  circuit: Circuit;
  winner: Driver;
  teamWinner: Team;
}

export interface DriverChampionship {
  classificationId: number;
  driverId: string;
  teamId: string;
  points: number;
  position: number;
  wins: number;
  driver: Omit<Driver, "driverId">;
  team:Team;
}
