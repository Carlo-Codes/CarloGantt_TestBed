import { Graphics } from "pixijs";

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
        
    }

    setBar(x:number, y:number, height:number, width:number){
        this.positionX = x
        this.positionY = y
        this.height = height
        this.width = width
        this.bar.beginFill(0x00FF00)
        this.bar.drawRect(x,y,width,height)
        
    }

    getBar(){
        return this.bar
    }

    


}