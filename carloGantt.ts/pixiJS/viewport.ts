import { Container, Graphics, Matrix } from "pixijs";

export class Viewport extends Container{
    private viewMatrix : Matrix
    constructor(matrix:Matrix = new Matrix(1, 0, 0, 1, 0, 0)){
        super()
        this.viewMatrix = matrix
    }

    zoom(factor:number, X:number, Y:number){
        const oldScale = this.viewMatrix.a
        const newScale = oldScale * factor
        const deltaScale = newScale - oldScale

        const offsetX = -(deltaScale * X)
        const offsetY = -(deltaScale * Y )
         
        this.viewMatrix.scale(factor,factor)
        this.viewMatrix.translate(offsetX, offsetY)
        
        this.transform.setFromMatrix(this.viewMatrix)
      
    }

    pan(newX:number, newY:number){
        null
    }

    addGraphics(graphics:Graphics){
        this.addChild(graphics)
    }

    limitTranform(matrix:Matrix){
        null
    }
}