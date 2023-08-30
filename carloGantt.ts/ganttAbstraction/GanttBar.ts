import { Graphics, FederatedPointerEvent,Rectangle,Sprite,Container,Texture} from "pixijs";
import { Viewport } from "../engine/viewport";
import GanttLayout from "../ganttAbstraction/GanttLayout"
import GanttTask from "./GanttTask";
const root = document.getElementById("root")

export default class GanttBar {
    private bar: Graphics

    
    private leftArrow:Sprite
    private rightArrow:Sprite

    private positionX: number | null
    private positionY: number | null
    private height: number | null
    private width: number | null // in pixels

    public rightArrowIsDragging = false
    public leftArrowIsDragging = false
    public barIsDragging = false
    private cursorOnBar = false

    
    public clickedOffset: number | null //the X offset at the point of cliking on the bar

    public onClickI : number | null //the index of the task of the bar in the global list of tasks apon click


    constructor(){
        
        this.bar = new Graphics()
   
        
        const arrowTexture = Texture.from("carloGantt.ts/Assets/Arrow.png")
        this.rightArrow = new Sprite(arrowTexture)
        this.rightArrow.anchor.set(0.5,0.5)
        this.leftArrow = new Sprite(arrowTexture)
        this.leftArrow.anchor.set(0.5,0.5)

        this.leftArrow.rotation = 3
        this.rightArrow.scale.set(0.05,0.05)
        this.leftArrow.scale.set(0.05,0.05)

        this.positionX = null
        this.positionY = null
        this.height = null
        this.width = null

        this.bar.interactive = true
        this.leftArrow.interactive = true
        this.rightArrow.interactive = true 

        this.clickedOffset = null
        this.onClickI = null

        this.bar.on('mouseover',this.onBarOver.bind(this))
        this.bar.on('mouseleave', this.onBarLeave.bind(this))

        this.bar.on('mousedown', this.onBarDragStart.bind(this))
        this.bar.on('mouseup', this.onBarDragEnd.bind(this))
        

        this.leftArrow.on('mouseover', this.onArrowOver.bind(this))
        this.rightArrow.on('mouseover', this.onArrowOver.bind(this))
        this.leftArrow.on('mouseleave', this.onArrowleave.bind(this))
        this.rightArrow.on('mouseleave', this.onArrowleave.bind(this))

        this.leftArrow.on('pointerdown', this.onLeftArrowDragStart.bind(this))
        this.rightArrow.on('pointerdown', this.onRightArrowDragStart.bind(this))

        //for leaving the bar or arrows after clicking
        this.leftArrow.on('pointerup', this.onArrowDragEnd.bind(this))
        this.rightArrow.on('pointerup', this.onArrowDragEnd.bind(this))
        this.bar.on('pointerup',this.onArrowDragEnd.bind(this))

        this.leftArrow.alpha = 0
        this.rightArrow.alpha = 0
        
    }
    
    setGanttBar(x:number, y:number, height:number, width:number){
        this.height = height/2
        this.positionX = x
        this.positionY = y + (height/4)
        this.width = width

        this.bar.beginFill(0x00FF00)
        this.bar.drawRect(this.positionX,this.positionY,this.width,this.height)
        
        this.leftArrow.x = this.positionX
        this.leftArrow.y = y + (height/2)
        this.rightArrow.x = this.positionX + this.width
        this.rightArrow.y = y + (height/2)
        
        this.bar.addChild(this.leftArrow,this.rightArrow)

    }

    getBar(){
        return this.bar
    }
 //clean below up with functions with arguments
    onBarOver(e:FederatedPointerEvent){
        e.stopPropagation()
        this.leftArrow.alpha = 1
        this.rightArrow.alpha = 1
        
    }

    onBarLeave(e:FederatedPointerEvent){
        e.stopPropagation()
        this.leftArrow.alpha = 0
        this.rightArrow.alpha = 0
        
    }

    onBarDragStart(e:FederatedPointerEvent){
        e.stopPropagation()
        this.bar.alpha = 0.5
        this.barIsDragging = true
    }

    onBarDragEnd(e:FederatedPointerEvent){
        this.bar.alpha = 1
        this.barIsDragging = false
    }



    onArrowOver(e:FederatedPointerEvent){
        if(root){
            root.style.cursor = "col-resize"
        }
    }

    onArrowleave(e:FederatedPointerEvent){
        e.stopPropagation()
        if(root){
            root.style.cursor = "default"
        }
    }

    onRightArrowDragStart(e:FederatedPointerEvent){
        e.stopPropagation()
        this.rightArrowIsDragging = true
        this.bar.alpha = 0.5
        
    }

    onLeftArrowDragStart(e:FederatedPointerEvent){
        e.stopPropagation()
        this.leftArrowIsDragging = true
        this.bar.alpha = 0.5
        
    }

    onArrowDragEnd(e:FederatedPointerEvent){
        if(this.rightArrowIsDragging || this.leftArrowIsDragging){
            this.bar.alpha = 1
        }
    }

    stopArrowDragging(){
        this.rightArrowIsDragging = false
        this.leftArrowIsDragging = false
        this.bar.alpha = 1
    }

    stopAllDragging(){
        this.barIsDragging = false
        this.rightArrowIsDragging = false
        this.leftArrowIsDragging = false
        this.bar.alpha = 1
        this.clickedOffset = null
        this.onClickI = null
    }

    setBarStart(x:number){
        if(this.positionX && this.width){
            const widthDiff = this.positionX - x
            this.width += widthDiff
            this.positionX = x
        }
    }

    setBarEnd(x:number){
        if(this.positionX && this.width){
            const diff = x - (this.positionX + this.width)
            this.width += diff
        }
    }

    moveBar(x:number){
        this.positionX = x
    }

    clear(){
        this.bar.clear()

    }
    reRender(){

        if(this.positionX && this.positionY && this.width && this.height){
            this.bar.beginFill(0x00FF00)
            this.bar.drawRect(this.positionX,this.positionY,this.width,this.height)
            
            this.leftArrow.x = this.positionX
            this.leftArrow.y = this.positionY + (this.height/2)
            this.rightArrow.x = this.positionX + this.width
            this.rightArrow.y = this.positionY + (this.height/2)
            
            this.bar.addChild(this.leftArrow,this.rightArrow)
            }
    }

    //methods for handling dragging when in the layout
    public static handleLeftArrowDragging(e:FederatedPointerEvent, layout:GanttLayout , bar:GanttBar){
        const viewport = e.currentTarget as Viewport
        const x = viewport.getViewMatix().tx - e.x
        const [col,j] = layout.getNearestColumnfromX(x)
        console.log(col)
        if(col){
            
            bar.setBarStart(col.getXPosition())
            bar.clear()
            bar.reRender()
        }
    }

    public static handleRightArrowDragging(e:FederatedPointerEvent, layout:GanttLayout , bar:GanttBar){
        const viewport = e.currentTarget as Viewport
        const x = viewport.getViewMatix().tx - e.x
        const [col,j] = layout.getNearestColumnfromX(x)
        console.log(col)
        if(col){
            
            bar.setBarEnd(col.getXPosition())
            bar.clear()
            bar.reRender()
        }
    }

    getBarPositionY(){
        return this.positionY
    }
    getBarPositionX(){
        return this.positionX
    }

    public static handleBarXDragging(e:FederatedPointerEvent, layout:GanttLayout , GanttTask:GanttTask){
        e.stopPropagation()
        const bar = GanttTask.getGanttBar()

        const viewport = e.currentTarget as Viewport
        const x = viewport.getViewMatix().tx - e.x
        const y = viewport.getViewMatix().ty - e.y

        if(!bar.clickedOffset && bar.positionX){ //calculating clicking offset & storing it.
            const ClickOffSet = Math.abs(x) - bar.positionX
            bar.clickedOffset = ClickOffSet
        } 

        if(bar.clickedOffset){
            const newX = Math.abs(x) - bar.clickedOffset //applying offset to global x click
            const [col, colI] = layout.getNearestColumnfromX(newX) // finding the nearest column
    
            if(col){ //applying movement
                const colX = col.getXPosition()
                
    
                bar.moveBar(colX)
                bar.clear() 
                bar.reRender()
            }
        }
    }

    public static handleBarYDragging(e:FederatedPointerEvent, layout:GanttLayout , taskI:number){
        //major problem here - look at the get nearest task from y function and look at how we reshuffle and redisplay taks
        e.stopPropagation()
        const ganttTasks = layout.ganttTasks 
        const task = ganttTasks[taskI]
        const bar = task.getGanttBar()
        const rowHeight = task.getRowHeight()
        const taskY = task.getRowBodyPostionY()
        

        const viewport = e.currentTarget as Viewport
        const x = viewport.getViewMatix().tx - e.x
        const y = viewport.getViewMatix().ty - e.y
        const [hoveringOverTask, hoveringOverTaskI] = layout.getNearestTaskfromY(y)// should inially return the same task as one weve grabbed
        console.log(y)
        console.log("hover Over Task = ")
        console.log(hoveringOverTask)
        console.log("moving Task = ")
        console.log(task)
        if(hoveringOverTask && hoveringOverTask!=task){
            task.setRowBodyPositionY(hoveringOverTask.getRowBodyPostionY())
/*             for(let i = 0; i < ganttTasks.length; i++){
                const compTask = ganttTasks[i]
                const compTaskY = compTask.getRowBodyPostionY()
                
                if(compTaskY >= taskY){
                    compTask.setRowBodyPositionY(compTaskY + rowHeight)
                }
            }*/
        }
        
        for(let i = 0; i < ganttTasks.length;i++){
            ganttTasks[i].clear()
            ganttTasks[i].render()
        }
            

            
        
    }
    





}