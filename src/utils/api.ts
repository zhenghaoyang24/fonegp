export let F1_API:{
    currentSeasonApi: string
    lastRoundApi: string
    nextRoundApi: string
    raceResultByRoundApi: Function
};
const F1_API_BASE = 'https://f1api.dev/api'
F1_API = {
    currentSeasonApi: `${F1_API_BASE}/current`,
    lastRoundApi: `${F1_API_BASE}/current/last`,
    nextRoundApi: `${F1_API_BASE}/current/next`,
    raceResultByRoundApi: function (round:string, season:string){
        return `${F1_API_BASE}/2025/${round}/${season}`
    }
}
