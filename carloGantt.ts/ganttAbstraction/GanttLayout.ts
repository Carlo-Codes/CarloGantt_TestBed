import{GantTime} from '../dateTime/gantTime'
import { renderSettings, taskType } from '../types/generalTypes'
import GanttColumn from './GanttColumns'
import {Viewport} from '../engine/viewport'
import GanttTask from './GanttTask'
import {Application, BitmapText, FederatedPointerEvent, FederatedWheelEvent} from 'pixijs'
import { rgb2hex } from 'pixijs/utils'
import dayjs, { Dayjs } from 'dayjs'
import GanttBar from './GanttBar'
import { Text, TextStyle } from 'pixijs/text'


/* this is where everything for the chart is layed out,
 the time is set and interactivity for zooming/changing time divisions in is handled */

class GanttLayout{

    private ganttChart : Application<HTMLCanvasElement>
    
    //Time 
    private time : GantTime
    private timeMode : dayjs.UnitTypeShort
    
    //viewport layouts set out in 3 main panels
    private ganttViewPort : Viewport 
    private columnHeadingViewport : Viewport
    private detailsPanelViewport : Viewport

    //Columns - A custom class for rendering columns & headings
    private ganttColumns: GanttColumn[]
    private columnWidths : number
    private headingHeight:number
    
    //detailsPanel - parameters for rendering the details panel which is where details of the gant bar can be seen(name , startdate etc)
    private taskDetailsWidth : number

    //tasks - Relating to the custom class fore rendering tasks and the gant bars
    private tasks ?: taskType[]
    public ganttTasks: GanttTask[]
    private rowHeights : number
    private rowWidths? : number

    //styling 
    private detailsPanelColour:number

    //Event Trackers

    private mouseDown = false
    private mX = 0
    private mY = 0

    //Top level Properties
    private chartHeight:number //for setting where things should end etc
    private targetColumn:GanttColumn|null //the column targeted by the user, the one on the very left or clicked on?

    constructor(renderSettings:renderSettings, tasks?:taskType[]){

        this.time = new GantTime(renderSettings.timeBuffer,renderSettings)

        this.ganttChart = new Application<HTMLCanvasElement>({
            width:renderSettings.canvasWidth,
            height:renderSettings.canvasHeight,
            backgroundColor: renderSettings.backgroundColour,
        })

        //globalThis.__PIXI_APP__ =  this.ganttChart;

        this.ganttColumns = []
        this.ganttTasks = []
        this.ganttViewPort = new Viewport()
        this.columnHeadingViewport = new Viewport()
        this.detailsPanelViewport = new Viewport()
        this.targetColumn = null
        this.detailsPanelColour = rgb2hex([1,1,1])
        this.headingHeight = 20
        this.chartHeight = 0
        this.timeMode = renderSettings.timeUnit
        this.columnWidths = renderSettings.columnWidth
        this.rowHeights = renderSettings.rowHeight
        this.taskDetailsWidth = renderSettings.taskDetailsWidth
        
        if(tasks){
            this.tasks = tasks
            this.chartHeight = this.rowHeights * this.tasks.length + this.headingHeight //calculating chart height
        }
    }
 
    generateColumns(){ //this generates an array of columns bases on the time divisions specificed by gantTime in the constructor
        //it then adds the graphics to the corresponding viewports
        const columnsDivs = this.time.getDivisions() 
       
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
            column.getColumnRect().interactive = true
            
            this.ganttColumns.push(column)
            this.ganttViewPort.addGraphics(column.getColumnRect())
            this.columnHeadingViewport.addGraphics(column.getHeadingRect())
        }
    }

    generateTasks(){ //this generates an array of task instances based on the task data fed into the react component.
   //it then adds the graphics to the corresponding viewports
        if(this.tasks){
        for(let i = 0; i < this.tasks.length; i++){
            const yPos = i * this.rowHeights + this.ganttColumns[0].getHeadingHeight()
            const xPos = 0
            const rowWidth = this.ganttColumns.length * this.columnWidths
            const barStart = this.getXfromDate(this.tasks[i].startDate,this.ganttColumns,this.timeMode)
            const barSpan = this.tasks[i].endDate.diff(this.tasks[i].startDate,this.timeMode)
            const tempTask = new GanttTask(this.tasks[i],xPos,yPos,this.rowHeights,rowWidth,this.rowHeights,this.taskDetailsWidth,this.columnWidths,barStart,barSpan,this.timeMode)
            tempTask.getRowRect().interactive = true
            this.ganttTasks.push(tempTask)

            this.detailsPanelViewport.addGraphics(tempTask.getDetailsRect())
            this.ganttViewPort.addGraphics(tempTask.getRowRect())
            tempTask.render()
            }   
        }
    }

    generateDetailsPanel(){//this sets up the details panel
        this.detailsPanelViewport.generateBackroundPanel(0,0,this.chartHeight,this.taskDetailsWidth,this.detailsPanelColour)
    }

    bindEventHandlers(){
        //event Handeling
        
        //this.ganttViewPort.on("pointerout",this.handleMouseUp.bind(this))
        this.ganttViewPort.on("pointerup", this.handleMouseUp.bind(this))
        this.ganttViewPort.on("pointerdown", this.handleMouseDown.bind(this))
        this.ganttViewPort.on("pointermove", this.handleMouseMove.bind(this))
        this.ganttViewPort.on("wheel", this.handleMouseWheel.bind(this))

        //tests//
        const bounds = this.ganttViewPort.getBounds()
/*         const x = bounds.x
        const y = bounds.y
        const widht = bounds.width
        const height = bounds.height */
        console.log("bounds = \n" + bounds)


    }

    getXfromDate(date:Dayjs, columns:GanttColumn[], timeUnit:dayjs.UnitTypeShort){ //this retrieves the x position of a column based on its date
        for(let i = 0; i < columns.length; i++){
            if(columns[i].getDayjs().isSame(date,timeUnit)){
                return columns[i].getXPosition()
            }
        }
    }

    panToNow(){ //this pans the viewports to todays date
        const i = this.time.getiNow()
        if(i == undefined) return
        const x = this.ganttColumns[i].getXPosition() - this.taskDetailsWidth
        this.targetColumn = this.ganttColumns[i]
        this.columnHeadingViewport.panTo(x,0)
        this.ganttViewPort.panTo(x, 0) 
    }

    layoutPan(dx:number,dy:number){//this is used for mouse dragging,
        //pan method inside GanttLayout so i can set the targetColumn from here
        this.ganttViewPort.pan(dx,dy)
        this.columnHeadingViewport.pan(dx,0)
        this.detailsPanelViewport.pan(0,dy)

        const [newTargetColumn, newTargetColumni] = this.getNearestColumnfromX(this.ganttViewPort.x - this.taskDetailsWidth)
        this.targetColumn = newTargetColumn
    }


    zoomColumns(widthDelta:number){ //This method "zooms" the chart by increasing the size of the columns 
        this.columnWidths += widthDelta

        for(let i = 0; i < this.ganttColumns.length; i++){//looping through the columns, changing the width, clearing and re rendering
            const newPositionX = this.ganttColumns[i].getXPosition() + (widthDelta * i)
            if(i > 0){
                this.ganttColumns[i].setXPosition(newPositionX)
            }
            this.ganttColumns[i].clear()
            this.ganttColumns[i].setColumnWidth(this.columnWidths)
            this.ganttColumns[i].render()
        }

        for(let i = 0; i < this.ganttTasks.length; i++){//looping through the tasks, clearing them and reRendering based on new colum widths and re rendering
            const barStart = this.getXfromDate(this.ganttTasks[i].getTaskDetails().startDate,this.ganttColumns,this.timeMode)
            this.ganttTasks[i].clear()
            if(barStart){
                this.ganttTasks[i].setBarXPosition(barStart)
            }
            this.ganttTasks[i].setColumnWidths(this.columnWidths)
            this.ganttTasks[i].render()

        }

        if(this.targetColumn){ //panning the view ports back to the target column
            
            this.ganttViewPort.panTo(this.targetColumn.getXPosition() - this.taskDetailsWidth ,this.ganttViewPort.y)
            this.columnHeadingViewport.panTo(this.targetColumn.getXPosition() - this.taskDetailsWidth, this.columnHeadingViewport.y)
        }
    }

    getNearestColumnfromX(x:number):[GanttColumn|null,number|null]{ // returning the column and its index in the column arry of which its x position is closest to the x value supplied
        const absX = Math.abs(x) 
        let nearestColumn : GanttColumn | null = null 
        let distanceX : number | null = null//distance to current col in loop. smallest distance will be here at end of loop
        let colI : number | null = null
        for(let i = 0; i < this.ganttColumns.length; i++){
            if(!nearestColumn || !distanceX){
                nearestColumn = this.ganttColumns[i]
                distanceX = Math.abs(this.ganttColumns[i].getXPosition() - absX)
                colI = i
            }else{
                const tempDistance = Math.abs(this.ganttColumns[i].getXPosition() - absX)
                if(tempDistance < distanceX){
                    distanceX = tempDistance
                    nearestColumn = this.ganttColumns[i]
                    colI = i
                }
            }
        }
        return [nearestColumn,colI]
    }

    getNearestTaskfromY(y:number):[GanttTask|null, number|null]{ //static mathod in gant task?
        const absY = Math.abs(y)// possible jitteryness
        let nearestTask : GanttTask | null = null
        let distanceY : number | null = null //distance to current task in loop. smallest distance will be here at end of loop
        let taskI:number | null = null
        for(let i = 0; i < this.ganttTasks.length; i++){
            console.log(nearestTask)
            console.log("distances = " + distanceY)
            const task = this.ganttTasks[i]
            if(!nearestTask || !distanceY){
                nearestTask = task
                distanceY = Math.abs(task.getRowBodyPostionY()-absY)
                taskI = i
            }else{
                const tempDistance = Math.abs((task.getRowBodyPostionY()-absY))
                if(tempDistance < distanceY){
                    distanceY = tempDistance
                    nearestTask = task
                    taskI = i
                }

            }
        }
        return [nearestTask, taskI]
    }

    //eventHandleing//
    handleMouseDown(e:FederatedPointerEvent){ 
        for(let i = 0; i < this.ganttTasks.length;i++){ //handleing cancel dragging while off the bar
            const ganttBar = this.ganttTasks[i].getGanttBar()
            if(ganttBar.barIsDragging){
                return 
            }
        }
        this.mouseDown = true
        this.mX = e.clientX
        this.mY = e.clientY 
        //console.log("handleMouseDown fired")
    }

    handleMouseUp(e:FederatedPointerEvent){
        e.preventDefault()
        this.mouseDown = false
        for(let i = 0; i < this.ganttTasks.length;i++){ //handleing cancel dragging while off the bar
            this.ganttTasks[i].getGanttBar().stopAllDragging()
            
        }
        //console.log("handleMouseUp fired")
    }

    reorderTask(targetTask:GanttTask, TargetI:number){
     null
    }

    handleMouseMove(e:FederatedPointerEvent){
       
        e.preventDefault()
        e.stopPropagation()
        //console.log("handleMouseMove fired")

        //Bar Dragging Handleing 
        for(let i = 0; i < this.ganttTasks.length;i++){
            const ganttBar = this.ganttTasks[i].getGanttBar()
            if(ganttBar.rightArrowIsDragging){//rightArrow
                GanttBar.handleRightArrowDragging(e,this,ganttBar)
            }
            else if(ganttBar.leftArrowIsDragging){//leftArrow
                GanttBar.handleLeftArrowDragging(e,this,ganttBar)
            }else if(ganttBar.barIsDragging){
                GanttBar.handleBarYDragging(e,this,i,GanttBar.handleBarXDragging)
                
            }
        }

        if(!this.mouseDown) return 
        const new_mX = e.clientX
        const new_mY = e.clientY
        const dx = new_mX - this.mX
        const dy = new_mY - this.mY
        
        this.layoutPan(dx,dy)
        
        this.mY = new_mY
        this.mX = new_mX

        //debugging/////////
/*         const debugStyle = new TextStyle({
            align: "center",
            fill: "#754c24",
            fontSize: 10
        });

        const viewport = e.currentTarget as Viewport
        const x = viewport.getViewMatix().tx - e.x
        const y = viewport.getViewMatix().ty - e.y
        
        const xLabel = new Text(x.toString(),debugStyle)
        const yLabel = new Text(y.toString(),debugStyle)

        xLabel.position.set(x, y)
        yLabel.position.set(x + 10 , y)

         */
    }   

    handleMouseWheel(e:FederatedWheelEvent){
        e.preventDefault()
        //const factor = 1 + (-e.deltaY * 0.001) this is from when we were able to actually zoom in not needed.
        this.zoomColumns(e.deltaY/100)
    }

    //getters and setters

    getTasks(){
        return this.ganttTasks
    }

    getColumns(){
        return  this.ganttColumns
    }

    addTasks(tasks:taskType[]){ 
        this.tasks?.concat(tasks)
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

    getGantChart(){
        return this.ganttChart
    }
    
    init(){
        //initialising
        this.ganttViewPort.setLimits({})
        this.generateDetailsPanel()
        this.generateColumns()
        this.generateTasks()
        this.bindEventHandlers()
        this.getGanttViewport().generateInteractionRect(0)
        
    }

    draw(){
        
        this.ganttChart.stage.addChild(this.ganttViewPort)
        this.ganttChart.stage.addChild(this.columnHeadingViewport)
        this.ganttChart.stage.addChild(this.detailsPanelViewport)
    }
}

export default GanttLayout