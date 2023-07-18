import { renderSettings } from "../types/generalTypes"
import { Graphics } from "pixijs"



class GanttGrid extends Graphics{
    private canvasWidth:number
    private canvasHeight:number
    private rowHeight:number
    private nCols:number
    private nRows:number
    private gridLineColour

    constructor(settings:renderSettings){
        super()
        this.canvasWidth = settings.canvasWidth
        this.canvasHeight = settings.canvasHeight
        this.rowHeight = settings.rowHeight
        this.nCols = settings.timeBuffer
        this.nRows = settings.nRows
        this.gridLineColour = settings.gridLineColour
    }

    draw(){
        const cellwidth = 100//this.canvasWidth / this.nCols
        const cellheight = this.rowHeight
        const nCells = this.nCols * this.nRows
        let drawingRow = 0
        let drawingCol = 0
        for (let i = 0; i < nCells; i++){
            
            if (i % this.nCols === 0 && i != 0){
                drawingRow++
                drawingCol = 0
            }
            const xPos = cellwidth*drawingCol
            const yPos = cellheight*drawingRow
            this.lineStyle(2, this.gridLineColour);
            this.drawRect(xPos, yPos,cellwidth,cellheight)
            drawingCol++
        }
    }
}

export default GanttGrid