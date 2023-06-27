type renderSettings = {
    canvasHeight:number,
    canvasWidth:number,
    timeBuffer:number, //the amount of time either side of now on the gantt chart
    timeUnit:"h"|"m"|"d"|"w"
    nRows:number,
    rowHeight:number,
    backgroundColour:number,
    gridLineColour: number,
}

export type {renderSettings}