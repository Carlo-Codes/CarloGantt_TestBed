import { Graphics } from "pixijs"
import { taskType } from "../types/generalTypes"
import { Dayjs } from "dayjs"

export default class GanttRow{
    private detailsPositionX : number
    private detailsPostionY : number
    private detailsWidth : number

    private rowBodyPositionX : number
    private rowBodypositionY : number
    private rowWidth : number
    private rowHeight : number

    private detailsName : string
    private detailsStartTime : Dayjs
    private detailsEndTime : Dayjs

    private detailsRect:Graphics
    private rowRect:Graphics

    constructor(task:taskType, positionX:number, positionY:number, height:number, rowWidth:number, detailsWidth:number){
        this.detailsPositionX = positionX
        this.detailsPostionY = positionY
        this.detailsWidth = detailsWidth

        this.detailsName = task.name
        this.detailsStartTime = task.startDate
        this.detailsEndTime = task.endDate

        this.rowBodyPositionX = this.detailsPositionX + this.detailsWidth
        this.rowBodypositionY = positionY
        this.rowWidth = rowWidth 

        this.detailsRect = new Graphics()
        this.rowRect = new Graphics()
    }

    render(){
        this.detailsRect.drawRect(this.detailsPositionX, this.detailsPostionY, this.detailsWidth, this.rowHeight)
        this.rowRect.drawRect(this.rowBodyPositionX, this.rowBodypositionY, this.rowWidth, this.rowHeight)
    }

    getDetailsRect(){
        return this.detailsRect
    }

    getRowRect(){
        return this.rowRect
    }
}