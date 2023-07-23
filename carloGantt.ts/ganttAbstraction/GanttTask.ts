import { Graphics, Text, TextStyle } from "pixijs"
import { renderSettings, taskType } from "../types/generalTypes"
import dayjs, { Dayjs } from "dayjs"

export default class GanttTask{

    private task : taskType

    private detailsPositionX : number
    private detailsPostionY : number
    private detailsWidth : number
    private detailTextStyle:TextStyle

    private rowBodyPositionX : number
    private rowBodypositionY : number
    private rowWidth : number
    private rowHeight : number

    private detailsStartTime : Dayjs
    private detailsEndTime : Dayjs

    private detailsRect:Graphics
    private rowRect:Graphics
    private detailsNameText: Text

    private lineWeight:number
    private lineColour:number

    constructor(task:taskType, positionX:number, positionY:number, height:number, rowWidth:number, rowHeight:number, detailsWidth:number){
        
        this.detailTextStyle = new TextStyle({
            align: "center",
            fill: "#754c24",
            fontSize: 10
        });
        this.lineWeight = 1
        this.lineColour = 0x00FF00

        this.task = task
        this.rowHeight = rowHeight
        

        this.detailsPositionX = positionX
        this.detailsPostionY = positionY
        this.detailsWidth = detailsWidth

        this.detailsStartTime = dayjs(task.startDate)
        this.detailsEndTime = dayjs(task.endDate)

        this.rowBodyPositionX = this.detailsPositionX + this.detailsWidth
        this.rowBodypositionY = positionY
        this.rowWidth = rowWidth 

        this.detailsRect = new Graphics()
        this.rowRect = new Graphics()
        this.detailsNameText = new Text(this.task.name, this.detailTextStyle)
        this.detailsNameText.position.set(this.detailsPositionX, this.detailsPostionY)



        //tests/// - to be turned into some sort of object for passing around

    }

    render(){
        this.detailsRect.lineStyle(this.lineWeight,this.lineColour)
        this.detailsRect.drawRect(this.detailsPositionX, this.detailsPostionY, this.detailsWidth, this.rowHeight)
        this.rowRect.lineStyle(this.lineWeight, this.lineColour)
        this.rowRect.drawRect(this.rowBodyPositionX, this.rowBodypositionY, this.rowWidth, this.rowHeight)

        this.detailsRect.addChild(this.detailsNameText)
    }

    getDetailsRect(){
        return this.detailsRect
    }

    getRowRect(){
        return this.rowRect
    }
}