import { Container, Graphics, Matrix } from "pixijs";
import {viewPortLimits} from "../types/pixiJsTypes"


export class Viewport extends Container{
    private viewMatrix : Matrix
    private limits : viewPortLimits | null
    constructor(matrix:Matrix = new Matrix(1, 0, 0, 1, 0, 0)){
        super()
        this.viewMatrix = matrix
        this.limits = {
            minX:null,
            minY:null, 
            maxX:null,
            maxY:0, 
            minScale:null,
            maxScale:null,
        }


    }

    zoom(factor:number, X:number, Y:number){
        if(this.limits){
            if((this.limits.minScale || this.limits.minScale === 0) && (this.viewMatrix.a * factor < this.limits.minScale)){
                this.viewMatrix.a = this.limits.minScale
                this.viewMatrix.d = this.limits.minScale
                
            }
            else if((this.limits.maxScale || this.limits.maxScale === 0) && (this.viewMatrix.a * factor > this.limits.maxScale)){
                this.viewMatrix.a = this.limits.maxScale
                this.viewMatrix.d = this.limits.maxScale
                

            }else{
                console.log(this.viewMatrix) 
                this.viewMatrix.translate(-X, -Y)
                this.viewMatrix.scale(factor, factor)
                this.viewMatrix.translate(X, Y)
                this.limitTranform()
                console.log(this.viewMatrix)
                this.transform.setFromMatrix(this.viewMatrix)
            }
        }
    }

    pan(xAmount:number, yAmount:number){
        this.viewMatrix.translate(xAmount,yAmount)
        this.limitTranform()
        console.log(this.viewMatrix)
        this.transform.setFromMatrix(this.viewMatrix)

    }

    addGraphics(graphics:Graphics){
        this.addChild(graphics)
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
            console.log(this.limits)
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
}