import React, {FunctionComponent, MouseEventHandler, useEffect} from 'react'
import "./GantChart.css"
import { renderSettings } from './types/generalTypes'
import drawGanttGrid from './drawGanttGrid'

type Props ={
    renderSet:renderSettings
}
function GanttChart(props:Props){
 
    const canvasRef = React.useRef(null)
    const gantData = React.useRef(null)
    const frameID = React.useRef(0)
    let ctx : CanvasRenderingContext2D | null
    if(canvasRef.current){
        const canvas : HTMLCanvasElement = canvasRef.current
         ctx = canvas.getContext("2d")
    } 
   

    let mouseDown = false
    let mX:number
    let mY:number

    const handleMouseDown:MouseEventHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        mouseDown = true
        mX = e.clientX
        mY = e.clientY
    }
    const handleMouseUp:MouseEventHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        mouseDown = false
    }
    const handleMouseMove:MouseEventHandler = (e) => {
        if(!mouseDown) return 
        e.preventDefault();
        e.stopPropagation();
        const new_mX = e.clientX
        const new_mY = e.clientY
        const dx = new_mX - mX
        const dy = new_mY - mY
        if(ctx){
            ctx.save()
            ctx.setTransform(1, 0, 0, 1, 0, 0)
            ctx.clearRect(0,0,props.renderSet.canvasWidth , props.renderSet.canvasHeight)
            ctx.restore()
            ctx.translate(dx,dy)
            
        }
       
        mY = new_mY
        mX = new_mX
    }   



    const draw = ()=>{
        if(ctx){
            const gridInputs = {
                context: ctx,
                renderSettings:props.renderSet
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
        if(canvasRef.current){
            const canvas : HTMLCanvasElement = canvasRef.current
             ctx = canvas.getContext("2d")
        } 
        return () => {
            cancelAnimationFrame(frameID.current)
        }
        
    },[])

    return(
        <div>
            <canvas onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} width={props.renderSet.canvasWidth} height={props.renderSet.canvasWidth} ref={canvasRef}/>
        </div>
    )
}

export default GanttChart