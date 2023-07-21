import { Graphics } from "pixijs"
import { renderSettings, taskType } from "../types/generalTypes"
import { Dayjs } from "dayjs"

export default class GanttTask{

    private task : taskType

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

    private lineWeight:number
    private lineColour:number

    constructor(task:taskType, positionX:number, positionY:number, height:number, rowWidth:number, rowHeight:number, detailsWidth:number){
        
        this.task = task
        this.rowHeight = rowHeight
        
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

        //tests/// - to be turned into some sort of object for passing around
        this.lineWeight = 1
        this.lineColour = 0x00FF00
    }

    render(){
        this.detailsRect.lineStyle(this.lineWeight,this.lineColour)
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