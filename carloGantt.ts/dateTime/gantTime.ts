/* 
This Class generates the time divisions for the gantt chart

*/

import dayjs from "dayjs"
import { renderSettings } from "../types/generalTypes"


export class GantTime{

    private timeDivisions : dayjs.Dayjs[]
    private iNow : number | undefined


    constructor(timeBuffer:number, renderSettings:renderSettings){
        const now = dayjs()
        this.timeDivisions = []
        this.iNow;

        for(let i = timeBuffer; i > 0; i--){
            this.timeDivisions.push(now.subtract(i,renderSettings.timeUnit))
        }
        for(let i = 0; i < timeBuffer; i++){
            if(i == 0){
                this.iNow = this.timeDivisions.length
            }
            this.timeDivisions.push(now.add(i,renderSettings.timeUnit))
        }
    }

    getDivisions(){
        return this.timeDivisions
    }

    getiNow(){
        return this.iNow
    }


}

