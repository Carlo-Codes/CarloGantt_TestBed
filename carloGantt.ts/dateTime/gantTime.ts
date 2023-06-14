import * as dayjs from "dayjs"

type gantTimeSettings = {
    divisions:"h"|"m"|"d"|"w" //hour minutes days weeks
    bufferSize : number
}


export class GantTime{
    private timeDivisions : [dayjs.Dayjs]
    constructor(settings:gantTimeSettings){
        const now = dayjs()
        this.timeDivisions = [now]
        for(let i = settings.bufferSize; i > 0; i--){
            this.timeDivisions.push(now.subtract(i,settings.divisions))
        }
        for(let i = 0; i < settings.bufferSize; i++){
            this.timeDivisions.push(now.add(i,settings.divisions))
        }
    }

    getDivisions(){
        return this.timeDivisions
    }


}

