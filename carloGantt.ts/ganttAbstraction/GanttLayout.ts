import{GantTime} from '../dateTime/gantTime'
import { renderSettings, taskType } from '../types/generalTypes'
import GanttColumn from './GanttColumns'
import {Viewport} from '../engine/viewport'
import GanttTask from './GanttTask'
import { Graphics } from 'pixijs'
import { rgb2hex } from 'pixijs/utils'
import dayjs, { Dayjs } from 'dayjs'

/* this is where the columns for the chart is layed out, the time is set and interactivity for zooming/changing time divisions in is handled */

class GanttLayout{
    
    private time : GantTime
    
    private ganttViewPort : Viewport
    private columnHeadingViewport : Viewport
    private detailsPanelViewport : Viewport

    private detailsPanelColour:number

    private masterZoomTracking :number //0 - 100 to track how in or out the user has actuqally zoomed
    private timeMode : dayjs.UnitTypeShort

    private ganttColumns: GanttColumn[]
    private columnWidths : number
    
    private taskDetailsWidth : number

    private tasks ?: taskType[]
    private ganttTasks: GanttTask[]
    private rowHeights : number
    private rowWidths? : number


    private headingHeight:number
    private chartHeight:number

   

    

    constructor(renderSettings:renderSettings, tasks?:taskType[]){
        this.time = new GantTime(renderSettings.timeBuffer,renderSettings)
        this.ganttColumns = []
        this.ganttTasks = []
    
        this.ganttViewPort = new Viewport()
        this.columnHeadingViewport = new Viewport()
        this.detailsPanelViewport = new Viewport()

        this.detailsPanelColour = rgb2hex([1,1,1])

        this.headingHeight = 20
        this.chartHeight = 0

        this.masterZoomTracking = 0
        this.timeMode = renderSettings.timeUnit
        this.columnWidths = renderSettings.columnWidth
        this.rowHeights = renderSettings.rowHeight
        this.taskDetailsWidth = renderSettings.taskDetailsWidth
        
        if(tasks){
            this.tasks = tasks
            this.chartHeight = this.rowHeights * this.tasks.length + this.headingHeight
        }

    }

    generateColumns(){
        const columnsDivs = this.time.getDivisions()
        console.log(columnsDivs)
        for(let i = 0; i < columnsDivs.length; i++){
            const date = columnsDivs[i]
            const headingHeight = 20
            const xPos = i * this.columnWidths + this.taskDetailsWidth
            let height = 0
            if(this.tasks){
                height = this.rowHeights * this.tasks.length + headingHeight
            }
            const column = new GanttColumn(date,headingHeight,xPos,0,this.columnWidths,height)
            column.render()
            
            this.ganttColumns.push(column)
            this.ganttViewPort.addGraphics(column.getColumnRect())
            this.columnHeadingViewport.addGraphics(column.getHeadingRect())
        }
    }

    generateTasks(){

        if(this.tasks){
        for(let i = 0; i < this.tasks.length; i++){
            const yPos = i * this.rowHeights + this.ganttColumns[0].getHeadingHeight()
            const xPos = 0
            const rowWidth = this.ganttColumns.length * this.columnWidths
            const barStart = this.getXfromDate(this.tasks[i].startDate,this.ganttColumns,this.timeMode)
            const barSpan = this.tasks[i].endDate.diff(this.tasks[i].startDate,this.timeMode)
            const tempTask = new GanttTask(this.tasks[i],xPos,yPos,this.rowHeights,rowWidth,this.rowHeights,this.taskDetailsWidth,this.columnWidths,barStart,barSpan,this.timeMode)
            
            this.ganttTasks.push(tempTask)

            this.detailsPanelViewport.addGraphics(tempTask.getDetailsRect())
            this.ganttViewPort.addGraphics(tempTask.getRowRect())
            tempTask.render()

            }   
        }
    }

    generateDetailsPanel(){
        this.detailsPanelViewport.generateBackroundPanel(0,0,this.chartHeight,this.taskDetailsWidth,this.detailsPanelColour)
    }

    getXfromDate(date:Dayjs, columns:GanttColumn[], timeUnit:dayjs.UnitTypeShort){
        for(let i = 0; i < columns.length; i++){
            if(columns[i].getDayjs().isSame(date,timeUnit)){
                return columns[i].getXPosition()
            }
        }
    }

    panToNow(){
        const i = this.time.getiNow()
        if(i == undefined) return
        const x = this.ganttColumns[i].getXPosition()
        this.columnHeadingViewport.panTo(x,0)
        this.ganttViewPort.panTo(x, 0)

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
        for(let i = 0; i < this.ganttTasks.length; i++){
            let newPositionX
            if(this.ganttTasks[i].getBarXPosition()){
                 newPositionX = this.ganttTasks[i].getBarXPosition() + (widthDelta * i)
                 this.ganttTasks[i].setBarXPosition(newPositionX)
            }
            this.ganttTasks[i].clear()
            
            this.ganttTasks[i].setColumnWidths(this.columnWidths)
            this.ganttTasks[i].render()

        }
    }

    getTasks(){
        return this.ganttTasks
    }


    getGanttViewport(){
        return this.ganttViewPort
    }

    getColumnHeadingViewport(){
        return this.columnHeadingViewport
    }

    getDetailsPanelViewport(){
        return this.detailsPanelViewport
    }

    getTime(){
        return this.time
    }

    setDetailsPanelWidth(width:number){
        this.taskDetailsWidth = width
    }
}

export default GanttLayout