import{GantTime} from '../dateTime/gantTime'
import { renderSettings, taskType } from '../types/generalTypes'
import GanttColumn from './GanttColumns'
import {Viewport} from '../engine/viewport'
import GanttTask from './GanttTask'

/* this is where the columns for the chart is layed out, the time is set and interactivity for zooming/changing time divisions in is handled */

class GanttLayout{
    
    time : GantTime
    viewPort : Viewport

    private masterZoomTracking :number //0 - 100 to track how in or out the user has actuqally zoomed
    private timeMode : "h"|"d"|"m"|"w" // to dispaly column headings as time

    private ganttColumns: GanttColumn[]
    private columnWidths : number
    private columnHeights : number

    private tasks ?: taskType[]
    private ganttTasks: GanttTask[]
    private rowHeights : number
    private rowWidths? : number

    constructor(renderSettings:renderSettings, tasks?:taskType[]){
        this.time = new GantTime(renderSettings.timeBuffer,renderSettings.timeUnit)
        this.ganttColumns = []
        this.ganttTasks = []
        this.columnHeights = renderSettings.canvasHeight
        this.viewPort = new Viewport()
        this.masterZoomTracking = 0
        this.timeMode = renderSettings.timeUnit
        this.columnWidths = renderSettings.columnWidth
        this.rowHeights = renderSettings.rowHeight
        

        if(tasks){
            this.tasks = tasks
        }

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

    generateTasks(){
        console.log(this.tasks)
        if(this.tasks){
        for(let i = 0; i < this.tasks.length; i++){
            const yPos = i * this.rowHeights + this.ganttColumns[0].getHeadingHeight()
            const xPos = 0
            const rowWidth = this.ganttColumns.length * this.columnWidths
            const tempTask = new GanttTask(this.tasks[i],xPos,yPos,this.rowHeights,rowWidth,this.rowHeights,300,)
            
            tempTask.render()
            
            this.ganttTasks.push(tempTask)

            this.viewPort.addGraphics(tempTask.getDetailsRect())
            this.viewPort.addGraphics(tempTask.getRowRect())
            
        }
    }
    }

    addTasks(tasks:taskType[]){
        this.tasks?.concat(tasks)
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