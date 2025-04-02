export let F1_API:{
    currentSeasonApi: string
    lastRoundApi: string
    nextRoundApi: string
    raceResultApi: Function
};
const F1_API_BASE = 'https://f1api.dev/api'
F1_API = {
    currentSeasonApi: `${F1_API_BASE}/current`,
    lastRoundApi: `${F1_API_BASE}/current/last`,
    nextRoundApi: `${F1_API_BASE}/current/next`,
    raceResultApi: function (round:string, type:"fp1" | "fp2" | "fp3" | "race" | "qualy" ,spring:boolean | null){
        if (spring){
            return `${F1_API_BASE}/2025/${round}/spring/${type}`
        }else{
            return `${F1_API_BASE}/2025/${round}/${type}`
        }
    }
}
