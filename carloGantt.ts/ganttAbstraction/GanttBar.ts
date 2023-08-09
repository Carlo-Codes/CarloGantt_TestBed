import { Graphics, FederatedPointerEvent,Rectangle,Sprite,Container,Texture} from "pixijs";
const root = document.getElementById("root")

export default class GanttBar {
    private bar: Graphics

    
    private leftArrow:Sprite
    private rightArrow:Sprite

    private positionX: number | null
    private positionY: number | null
    private height: number | null
    private width: number | null

    public rightArrowIsDragging = false
    public leftArrowIsDragging = false
    private cursorOnBar = false
    

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

        this.bar.on('mouseover',this.onBarOver.bind(this))
        this.bar.on('mouseleave', this.onBarLeave.bind(this))

        this.bar.on('mousedown', (e)=>{
            e.stopPropagation() // start here
        })
        

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
    


    setBar(x:number, y:number, height:number, width:number){
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

    onArrowDrag(){
        null
    }

    stopArrowDragging(){
        this.rightArrowIsDragging = false
        this.leftArrowIsDragging = false
        this.bar.alpha = 1
    }

    setBarStart(x:number){
        this.positionX = x
        this.bar.drawRect(this.positionX,this.positionY,this.width,this.height)
    }




  

    


}