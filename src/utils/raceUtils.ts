import raceType from '@/data/raceType.json'

export default {


    getRaceTypeZh(type: string) {
        return raceType.find(item => {
            return item.type === type
        })?.race_zh

    }

}
