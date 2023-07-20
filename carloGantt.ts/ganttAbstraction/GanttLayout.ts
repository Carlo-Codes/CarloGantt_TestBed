import{GantTime} from '../dateTime/gantTime'
import { renderSettings } from '../types/generalTypes'
import GanttColumn from './GanttColumns'
import {Viewport} from '../engine/viewport'

/* this is where the columns for the chart is layed out, the time is set and interactivity for zooming/changing time divisions in is handled */

class GanttLayout{
    
    time : GantTime
    viewPort : Viewport

    private masterZoomTracking :number //0 - 100 to track how in or out the user has actuqally zoomed
    private timeMode : "h"|"d"|"m"|"w" // to dispaly column headings as time

    private ganttColumns: GanttColumn[]
    private columnWidths : number
    private columnHeights : number

    constructor(renderSettings:renderSettings){
        this.time = new GantTime(renderSettings.timeBuffer,renderSettings.timeUnit)
        this.ganttColumns = []
        this.columnHeights = renderSettings.canvasHeight
        this.viewPort = new Viewport()
        this.masterZoomTracking = 0
        this.timeMode = renderSettings.timeUnit
        this.columnWidths = renderSettings.columnWidth
    }

    generateColumns(){
        const columnsDivs = this.time.getDivisions()
        for(let i = 0; i < columnsDivs.length; i++){
            const date = columnsDivs[i]
            const id = date.toISOString()
            const heading = date.format("D/MMM/YYYY")
            const xPos = i * this.columnWidths
    
            const column = new GanttColumn(id,heading,20,xPos,0,this.columnWidths,this.columnHeights)
            column.render()
            
            this.ganttColumns.push(column)
            this.viewPort.addGraphics(column.getColumnRect())
            this.viewPort.addGraphics(column.getHeadingRect())
        }
    }

    zoomColumns(widthDelta:number){
        this.columnWidths += widthDelta
        
        for(let i = 0; i < this.ganttColumns.length; i++){
            const newPositionX = this.ganttColumns[i].getXPosition() + (widthDelta * i)
            if(i > 0){
                this.ganttColumns[i].setXPosition(newPositionX)
            }
            this.ganttColumns[i].clear()
            this.ganttColumns[i].setColumnWidth(this.columnWidths)
            this.ganttColumns[i].render()
        }
        console.log(this.ganttColumns[0].getColumnWidth())
        
        
        
    }
}

export default GanttLayout