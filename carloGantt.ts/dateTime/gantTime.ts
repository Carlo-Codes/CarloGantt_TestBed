/* 
This Class generates the time divisions for the gantt chart

*/

import * as dayjs from "dayjs"
import { renderSettings } from "../types/generalTypes"


export class GantTime{

    private timeDivisions : dayjs.Dayjs[]
    private iNow : number | undefined


    constructor(timeBuffer:number, timeUnit:"h"|"m"|"d"|"w"){
        const now = dayjs()
        this.timeDivisions = []
        this.iNow;

        for(let i = timeBuffer; i > 0; i--){
            this.timeDivisions.push(now.subtract(i,timeUnit))
        }
        for(let i = 0; i < timeBuffer; i++){
            if(i == 0){
                this.iNow = this.timeDivisions.length
            }
            this.timeDivisions.push(now.add(i,timeUnit))
        }
    }

    getDivisions(){
        return this.timeDivisions
    }

    getiNow(){
        return this.iNow
    }


}

