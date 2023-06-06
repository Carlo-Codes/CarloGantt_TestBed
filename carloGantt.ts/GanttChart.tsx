import React, {FunctionComponent, MouseEventHandler, WheelEventHandler, useEffect} from 'react'
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
    

    const view = new DOMMatrix ([1, 0, 0, 1, 0, 0])
    let previousView:DOMMatrix; // this might not work

   

    let ctx : CanvasRenderingContext2D | null
    if(canvasRef.current){
        const canvas : HTMLCanvasElement = canvasRef.current
         ctx = canvas.getContext("2d")
    } 


    let mouseDown = false
    let mX:number
    let mY:number

    const clearCanvas = (ctx : CanvasRenderingContext2D) => {
        ctx.save()
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.clearRect(0,0,props.renderSet.canvasWidth, props.renderSet.canvasHeight)
        ctx.restore()
    }

    const limitTransfrom = (view:DOMMatrix) => { //limits views every applyview() call
        
        // const lowestViewPosition = props.renderSet.canvasHeight - (props.renderSet.nRows * props.renderSet.rowHeight)
           
        // if(view.f >= lowestViewPosition){ 
        //     view.f = lowestViewPosition
        // }

        if(view.a < 1 || view.d < 1){
            view.a = 1
            view.d = 1
            view.e = previousView.e
            view.f = previousView.f
        }
    }

    const applyView = (view:DOMMatrix) =>{
        limitTransfrom(view)
        ctx?.setTransform(view)
    }


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
        previousView = view
        if(ctx){
            clearCanvas(ctx)
            view.e += dx
            view.f += dy

            applyView(view)
            console.log(view)
        }
        mY = new_mY
        mX = new_mX
    }   

    const handleMouseWheel:WheelEventHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        previousView = view

        const newScale = view.a + (e.deltaY * 0.0001 )
        const oldScale = view.a

        const scaleDelta = newScale - oldScale

        const offsetX = -(scaleDelta * e.clientX )
        const offsetY = -(scaleDelta * e.clientY )

        console.log(e.clientX)
        console.log(offsetX)

        if(ctx){
            clearCanvas(ctx)
            view.a = newScale
            view.d = newScale 
            view.e += offsetX
            view.f += offsetY
            //console.log(view)
            applyView(view)

        }
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
            <canvas onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} onWheel={handleMouseWheel} width={props.renderSet.canvasWidth} height={props.renderSet.canvasHeight} ref={canvasRef}/>
        </div>
    )
}

export default GanttChart