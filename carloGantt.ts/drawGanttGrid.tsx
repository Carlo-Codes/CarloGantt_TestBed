import { renderSettings } from "./types/generalTypes"


type inputs = {
    context:CanvasRenderingContext2D | null
    renderSettings:renderSettings

}
function drawGanttGrid(inputs:inputs){
    
    const cellwidth = inputs.renderSettings.canvasWidth / inputs.renderSettings.nCols
    const cellheight = inputs.renderSettings.rowHeight
    const nCells = inputs.renderSettings.nCols * inputs.renderSettings.nRows
    let drawingRow = 0
    let drawingCol = 0
    if(!inputs.context) throw new Error("drawGanttGrid has no context")
    for (let i = 0; i < nCells; i++){
        
        if (i % inputs.renderSettings.nCols === 0){
            drawingRow++
            drawingCol = 0
        }
        const xPos = cellwidth*drawingCol
        const yPos = cellheight*drawingRow
        inputs.context.strokeRect(xPos,yPos,cellwidth,cellheight)
        drawingCol++
    }
}

export default drawGanttGrid