import React, {FunctionComponent, useEffect} from 'react'
import "./GantChart.css"

type Props ={
    width:number,
    height:number,
    drawGantts(context:CanvasRenderingContext2D):void,
}
function GanttChart(props:Props){
 
    const canvasRef = React.useRef(null)
    const draw = props.drawGantts

    useEffect(()=>{
        const canvas =  canvasRef.current as unknown as HTMLCanvasElement
        
        const context = canvas.getContext('2d')
        if(context === null) throw new Error("couldnt get context")
        draw(context)
    },[draw])

    return(
        <div>
            <canvas width={props.width} height={props.height} ref={canvasRef}/>
        </div>
    )
}

export default GanttChart