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
    raceResultApi: function (year:Number, round:Number, type:"fp1" | "fp2" | "fp3" | "race" | "qualy" | "sprintQualy" | "sprintRace"){
        if (type !== 'sprintQualy' && type !== 'sprintRace'){
            return `${F1_API_BASE}/${year}/${round}/${type}`
        }else{
            if (type === "sprintQualy")
                return `${F1_API_BASE}/${year}/${round}/sprint/qualy`
            if (type === 'sprintRace')
                return `${F1_API_BASE}/${year}/${round}/sprint/race`
        }
    }
}
