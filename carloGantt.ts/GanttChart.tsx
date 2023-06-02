import React, {FunctionComponent, useEffect} from 'react'
import "./GantChart.css"
import { gantSettings } from './types/generalTypes'
import drawGanttGrid from './drawGanttGrid'

type Props ={
    width:number,
    height:number,
    gantSettings:gantSettings
}
function GanttChart(props:Props){
 
    const canvasRef = React.useRef(null)
    const gantData = React.useRef(null)
    const frameID = React.useRef(0)

    const draw = ()=>{
        if(canvasRef.current){
            const canvas : HTMLCanvasElement = canvasRef.current
            const ctx = canvas.getContext("2d")
            const gridInputs = {
                context: ctx,
                gantHeight:props.height, //grid dims may be smaller than the gant chart as a whole
                gantWidth:props.width,
                nCols:props.gantSettings.nCols,
                nRows:props.gantSettings.nRows,
                rowHeight:props.gantSettings.rowHeight

            }
            drawGanttGrid(gridInputs)
        }

    }

   const nextFrame = () =>{
        if(!canvasRef.current) return
        draw()
        frameID.current = requestAnimationFrame(nextFrame)
   }

    useEffect(()=>{
        frameID.current = requestAnimationFrame(nextFrame)
        return () => {
            cancelAnimationFrame(frameID.current)
        }
        
    },[])

    return(
        <div>
            <canvas width={props.width} height={props.height} ref={canvasRef}/>
        </div>
    )
}

export default GanttChart