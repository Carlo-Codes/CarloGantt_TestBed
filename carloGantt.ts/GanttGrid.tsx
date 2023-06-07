import { renderSettings } from "./types/generalTypes"
import { Graphics } from "pixijs"


type inputs = {
    renderSettings:renderSettings

}
class GanttGrid extends Graphics{
    private canvasWidth:number
    private canvasHeight:number
    private rowHeight:number
    private nCols:number
    private nRows:number

    constructor(settings:inputs){
        super()
        this.canvasWidth = settings.renderSettings.canvasWidth
        this.canvasHeight = settings.renderSettings.canvasHeight
        this.rowHeight = settings.renderSettings.rowHeight
        this.nCols = settings.renderSettings.nCols
        this.nRows = settings.renderSettings.nRows
    }

    draw(){
        const cellwidth = this.canvasWidth / this.nCols
        const cellheight = this.rowHeight
        const nCells = this.nCols * this.nRows
        let drawingRow = 0
        let drawingCol = 0
        for (let i = 0; i < nCells; i++){
            
            if (i % this.nCols === 0){
                drawingRow++
                drawingCol = 0
            }
            const xPos = cellwidth*drawingCol
            const yPos = cellheight*drawingRow
            this.lineStyle(1, 0x00FF00);
            this.drawRect(xPos, yPos,cellwidth,cellheight)
            drawingCol++
        }
    }
    

}

export default GanttGrid