

type inputs = {
    context:CanvasRenderingContext2D
    gantHeight:number,
    gantWidth:number,
    nCols:number,
    nRows:number,

}
function drawGanttGrid(inputs:inputs){
    const cellwidth = inputs.gantWidth/inputs.nCols
    const cellheight = inputs.gantHeight/inputs.nRows
    const nCells = inputs.nRows * inputs.nCols
    let drawingRow = 0
    let drawingCol = 0
    for (let i = 0; i < nCells; i++){
        
        if (i % inputs.nRows === 0){
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