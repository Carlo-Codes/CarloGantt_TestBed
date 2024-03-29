import { Container, Graphics, Matrix, ColorMatrixFilter } from "pixijs";
import {viewPortLimits} from "../types/pixiJsTypes"
import { rgb2hex } from "pixijs/utils";




export class Viewport extends Container{
    private viewMatrix : Matrix
    private limits : viewPortLimits | null
    private backgroundRect : Graphics
    private interactionRect : Graphics
    constructor(matrix:Matrix = new Matrix(1, 0, 0, 1, 0, 0)){
        super()
        this.backgroundRect = new Graphics()
        this.interactionRect = new Graphics()
        this.viewMatrix = matrix
        
        this.limits = {
            minX:null,
            minY:null, 
            maxX:null,
            maxY:0, 
            minScale:null,
            maxScale:null,
        }
        this.interactive = true
        

    }

    generateBackroundPanel(x:number, y:number, h:number, w:number, colour:number){ //for when you want to specify an empty panel
        this.backgroundRect.beginFill(colour)
        this.backgroundRect.drawRect(x,y, w, h)
        this.addChildAt(this.backgroundRect,0)
    }

    generateInteractionRect(zIndex:number){ //for use with interaction event listeners
        const bounds = this.getBounds()
        const rectx = bounds.x
        const recty = bounds.y
        const rectH = bounds.height
        const rectW = bounds.width
        this.backgroundRect.beginFill(rgb2hex([1,1,1]))
        this.backgroundRect.drawRect(rectx,recty, rectW, rectH)
        this.backgroundRect.alpha = 0
        this.addChildAt(this.backgroundRect,zIndex)
    }

    zoom(factor:number, X:number, Y:number){//not used
        if(this.limits){
            if((this.limits.minScale || this.limits.minScale === 0) && (this.viewMatrix.a * factor < this.limits.minScale)){
                this.viewMatrix.a = this.limits.minScale
                this.viewMatrix.d = this.limits.minScale
                
            }
            else if((this.limits.maxScale || this.limits.maxScale === 0) && (this.viewMatrix.a * factor > this.limits.maxScale)){
                this.viewMatrix.a = this.limits.maxScale
                this.viewMatrix.d = this.limits.maxScale
                

            }else{
                
                this.viewMatrix.translate(-X, -Y)
                this.viewMatrix.scale(factor, factor)
                this.viewMatrix.translate(X, Y)
                this.limitTranform()
               
                this.transform.setFromMatrix(this.viewMatrix)
            }
        }
    }

    pan(xAmount:number, yAmount:number){
        this.viewMatrix.translate(xAmount,yAmount)
        this.limitTranform()
        
        this.transform.setFromMatrix(this.viewMatrix)
        //console.log(this.viewMatrix)

    }

    panTo(x:number, y:number){
        const xAmount = -x - this.viewMatrix.tx
        const yAmount = -y - this.viewMatrix.ty 
        this.viewMatrix.translate(xAmount, yAmount)
        this.limitTranform()
        this.transform.setFromMatrix(this.viewMatrix)
        console.log(this.viewMatrix)
        
        
    }

    addGraphics(graphics:Graphics){
        this.addChild(graphics)
    }

    addBackgroundColour(backgroundcolour:number, /* hex colour */ alpha:number){ //for when you just want to add abackground
        const rectx = this.getBounds().x
        const recty = this.getBounds().y
        const rectH = this.getBounds().height
        const rectW = this.getBounds().width
        this.backgroundRect.beginFill(backgroundcolour)
        this.backgroundRect.drawRect(rectx,recty, rectW, rectH)
        this.backgroundRect.alpha = alpha
        this.addChildAt(this.backgroundRect,0)
    }

    setLimits(newLimits:viewPortLimits){
        if ((newLimits.minScale && newLimits.maxScale)&&(newLimits.minScale > newLimits.maxScale)){
            throw new Error("Minimum viewport scale cannot be higher than max viewport scale")
        } 
        if (this.limits){
            for (const key  in newLimits){
                this.limits[key as keyof viewPortLimits] = newLimits[key as keyof viewPortLimits]
            }
        }

    }

    private limitTranform(){
        if(this.limits){
           
            if ((this.limits.maxY || this.limits.maxY === 0) && (this.viewMatrix.ty > this.limits.maxY)){
                this.viewMatrix.ty =  this.limits.maxY
            }
            else if ((this.limits.minY || this.limits.minY === 0) && (this.viewMatrix.ty < this.limits.minY)){
                this.viewMatrix.ty =  this.limits.minY
            }
            else if ((this.limits.maxX || this.limits.maxX === 0 ) && (this.viewMatrix.tx > this.limits.maxX)){
                this.viewMatrix.tx =  this.limits.maxX
            }
            else if ((this.limits.minX || this.limits.minX === 0) && (this.viewMatrix.tx < this.limits.minX)){
                this.viewMatrix.tx =  this.limits.minX
            }
        }
        
    }

    getViewMatix(){
        return this.viewMatrix
    }

    clear(){
        this.removeChildren()
    }

  

    
}