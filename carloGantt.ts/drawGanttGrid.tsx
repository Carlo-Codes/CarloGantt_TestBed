

type inputs = {
    context:CanvasRenderingContext2D | null
    gantHeight:number,
    gantWidth:number,
    nCols:number,
    nRows:number,
    rowHeight:number

}
function drawGanttGrid(inputs:inputs){
    const cellwidth = inputs.gantWidth/inputs.nCols
    const cellheight = inputs.rowHeight
    const nCells = inputs.nRows * inputs.nCols
    let drawingRow = 0
    let drawingCol = 0
    if(!inputs.context) throw new Error("drawGanttGrid has no context")
    for (let i = 0; i < nCells; i++){
        
        if (i % inputs.nCols === 0){
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