import { Graphics, FederatedPointerEvent,Rectangle} from "pixijs";


export default class GanttBar {
    private bar: Graphics
    private positionX: number | null
    private positionY: number | null
    private height: number | null
    private width: number | null
    

    constructor(){
        this.bar = new Graphics()
        this.positionX = null
        this.positionY = null
        this.height = null
        this.width = null
        this.bar.interactive = true
        this.bar.onmouseover = this.onHover.bind(this)
        this.bar.onmouseleave = this.onOffHover.bind(this)
        
    }

    setBar(x:number, y:number, height:number, width:number){
        this.height = height/2
        this.positionX = x
        this.positionY = y + (height/4)
        this.width = width
        this.bar.beginFill(0x00FF00)
        this.bar.drawRect(this.positionX,this.positionY,this.width,this.height)
        this.bar.hitArea = new Rectangle(this.positionX,this.positionY,this.width,this.height)
        
        
        
    }

    getBar(){
        return this.bar
    }

    onHover(e:FederatedPointerEvent){
        this.bar.alpha = 0.5
    }

    onOffHover(e:FederatedPointerEvent){
        this.bar.alpha = 1
    }


  

    


}