/* 
This Class generates the time divisions for the gantt chart

*/

import * as dayjs from "dayjs"
import { renderSettings } from "../types/generalTypes"


export class GantTime{

    private timeDivisions : [dayjs.Dayjs]

    constructor(settings:renderSettings){
        const now = dayjs()
        this.timeDivisions = [now]

        for(let i = settings.timeBuffer; i > 0; i--){
            this.timeDivisions.push(now.subtract(i,settings.timeUnit))
        }
        for(let i = 0; i < settings.timeBuffer; i++){
            this.timeDivisions.push(now.add(i,settings.timeUnit))
        }
    }

    getDivisions(){
        return this.timeDivisions
    }


}

