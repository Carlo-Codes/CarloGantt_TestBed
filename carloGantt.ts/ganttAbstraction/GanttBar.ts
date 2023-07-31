import { Graphics, FederatedPointerEvent,Rectangle,Sprite,Container} from "pixijs";


export default class GanttBar {
    private bar: Graphics
    private arrows:Container
    private leftArrow:Sprite
    private rightArrow:Sprite

    private positionX: number | null
    private positionY: number | null
    private height: number | null
    private width: number | null
    

    constructor(){
        this.bar = new Graphics()
        this.arrows = new Container()
        this.rightArrow = Sprite.from("carloGantt.ts/Assets/Arrow.png")
        this.rightArrow.anchor.set(0.5,0.5)
        this.leftArrow = Sprite.from("carloGantt.ts/Assets/Arrow.png")
        this.leftArrow.anchor.set(0.5,0.5)
        this.leftArrow.rotation = 3
        this.rightArrow.scale.set(0.1,0.1)
        this.leftArrow.scale.set(0.1,0.1)

        this.positionX = null
        this.positionY = null
        this.height = null
        this.width = null

        this.bar.interactive = true
        this.bar.onmouseover = this.onHover.bind(this)
        this.bar.onmouseleave = this.onOffHover.bind(this)

        this.arrows.addChild(this.rightArrow,this.leftArrow)
        this.bar.addChild(this.arrows)
    }

    setBar(x:number, y:number, height:number, width:number){
        this.height = height/2
        this.positionX = x
        this.positionY = y + (height/4)
        this.width = width

        this.bar.beginFill(0x00FF00)
        this.bar.drawRect(this.positionX,this.positionY,this.width,this.height)
        this.bar.hitArea = new Rectangle(this.positionX,this.positionY,this.width,this.height)
        
        this.leftArrow.x = this.positionX
        this.leftArrow.y = y + (height/2)
        this.rightArrow.x = this.positionX + this.width
        this.rightArrow.y = y + (height/2)
    }
    generateArrows(){

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