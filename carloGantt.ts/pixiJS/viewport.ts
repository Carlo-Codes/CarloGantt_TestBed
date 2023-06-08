import { Container, Graphics, Matrix } from "pixijs";

export class Viewport extends Container{
    private viewMatrix : Matrix
    private maxY : number | null
    private minY : number | null
    private maxX : number | null
    private minX : number | null
    constructor(matrix:Matrix = new Matrix(1, 0, 0, 1, 0, 0)){
        super()
        this.viewMatrix = matrix
        this.maxY = 0
        this.minY = null
        this.maxX = null
        this.minX = null
        

    }

    zoom(factor:number, X:number, Y:number){

         
        
        console.log(this.viewMatrix)
        
        this.viewMatrix.translate(-X, -Y)
        this.viewMatrix.scale(factor,factor)
        this.viewMatrix.translate(X, Y)
        this.limitTranform()
        this.transform.setFromMatrix(this.viewMatrix)
      
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

    setLimits(minX:number|null = null, minY:number|null = null, maxX:number|null = null, maxY:number|null = 0){
        this.minX = minX
        this.minY = minY
        this.maxX = maxX
        this.maxY = maxY
        this.limitTranform()
    }

    private limitTranform(){
        if ((this.maxY || this.maxY === 0) && (this.viewMatrix.ty > this.maxY)){
            this.viewMatrix.ty =  this.maxY
        }
        if ((this.minY || this.minY === 0) && (this.viewMatrix.ty < this.minY)){
            
            this.viewMatrix.ty =  this.minY
        }
        if ((this.maxX || this.maxX === 0 ) && (this.viewMatrix.tx > this.maxX)){
            this.viewMatrix.tx =  this.maxX
        }
        if ((this.minX || this.minX === 0) && (this.viewMatrix.tx < this.minX)){
            console.log(this.viewMatrix.tx + "<" + this.minX)
            this.viewMatrix.tx =  this.minX
        }
        
    }
}