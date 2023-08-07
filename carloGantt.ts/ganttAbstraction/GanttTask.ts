import { Graphics, Text, TextStyle } from "pixijs"
import { renderSettings, taskType } from "../types/generalTypes"
import dayjs, { Dayjs } from "dayjs"
import { Viewport } from "../engine/viewport"
import GanttBar from '../ganttAbstraction/GanttBar'
import GanttColumn from "./GanttColumns"

export default class GanttTask{

    private task : taskType

    private timeMode :dayjs.UnitTypeShort
    private detailsPositionX : number
    private detailsPostionY : number
    private detailsWidth : number
    private detailTextStyle:TextStyle

    private rowBodyPositionX : number
    private rowBodypositionY : number
    private rowWidth : number
    private rowHeight : number

    private detailsRect:Graphics
    private rowRect:Graphics
    private detailsNameText: Text

    private lineWeight:number
    private lineColour:number

    private barStartXPosition:number | undefined
    private columnWidth : number 
    private barSpan : number | undefined
    private bar : GanttBar

    constructor(task:taskType, positionX:number, positionY:number, height:number, rowWidth:number, rowHeight:number, detailsPanelWidth:number, columnWidth:number, barStart:number|undefined, barSpan:number, timeMode:dayjs.UnitTypeShort){
        
        //tests/// - to be turned into some sort of object for passing around
        this.detailTextStyle = new TextStyle({
            align: "center",
            fill: "#754c24",
            fontSize: 10
        })

        this.lineWeight = 1
        this.lineColour = 0x00FF00
        ////


        
        this.task = task
        this.rowHeight = rowHeight
        
        this.timeMode = timeMode

        this.detailsPositionX = positionX
        this.detailsPostionY = positionY
        this.detailsWidth = detailsPanelWidth

        this.rowBodyPositionX = positionX + detailsPanelWidth
        this.rowBodypositionY = positionY 
        this.rowWidth = rowWidth 

        this.detailsRect = new Graphics()
        this.rowRect = new Graphics()
        this.detailsNameText = new Text(this.task.name, this.detailTextStyle)
        this.detailsNameText.position.set(this.detailsPositionX, this.detailsPostionY)

        this.bar = new GanttBar()
        this.columnWidth = columnWidth
        this.barSpan = barSpan
        this.barStartXPosition = barStart
        this.detailsRect.interactive = true

   

    }



    render(){
        this.detailsRect.lineStyle(this.lineWeight,this.lineColour)
        this.detailsRect.drawRect(this.detailsPositionX, this.detailsPostionY, this.detailsWidth, this.rowHeight)
        this.rowRect.lineStyle(this.lineWeight, this.lineColour)
        this.rowRect.drawRect(this.rowBodyPositionX, this.rowBodypositionY, this.rowWidth, this.rowHeight)

        

        if(this.barStartXPosition && this.barSpan){
            const barWidth = this.barSpan * this.columnWidth
            this.bar.setBar(this.barStartXPosition,this.rowBodypositionY,this.rowHeight,barWidth)
        }

        this.rowRect.addChild(this.bar.getBar())
        this.detailsRect.addChild(this.detailsNameText)
    }




    getDetailsRect(){
        return this.detailsRect
    }


    getRowRect(){
        return this.rowRect
    }

    setColumnWidths(widths:number){
        this.columnWidth = widths
    }

    getGanttBar(){
        return this.bar
    }

    getBarXPosition(){
        return this.barStartXPosition
    }

    setBarXPosition(x:number){
        this.barStartXPosition = x
    }

    clear(){
        this.detailsRect.clear()
        this.bar.getBar().clear()
        this.rowRect.clear()
    }

    getTaskDetails(){
        return this.task
    }
}