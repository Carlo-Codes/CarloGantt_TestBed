import dayjs, { Dayjs } from "dayjs"


type renderSettings = {
    canvasHeight:number,
    canvasWidth:number,
    timeBuffer:number, //the amount of time either side of now on the gantt chart
    timeUnit:dayjs.UnitTypeShort
    nRows:number,
    rowHeight:number,
    columnWidth:number,
    backgroundColour:number,
    gridLineColour: number,
    maxScale: number,
    minScale : number,
    taskDetailsWidth:number
}

type taskType = {
    id:string,
    name:string,
    startDate:Dayjs
    endDate:Dayjs
}



export type {renderSettings, taskType}