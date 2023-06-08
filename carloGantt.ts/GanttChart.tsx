import React, {FunctionComponent, MouseEventHandler, WheelEventHandler, useEffect} from 'react'
import "./GantChart.css"
import { renderSettings } from './types/generalTypes'
import GanttGrid from './pixiJS/GanttGrid'
import { Application } from 'pixijs'
import {Viewport} from './pixiJS/viewport'

type Props ={
    renderSet:renderSettings
}

function GanttChart(props:Props){
 
    const canvasRef = React.useRef(null)
    const gantData = React.useRef(null)
    const frameID = React.useRef(0)

    const pixiRef = React.useRef(null)

    let mouseDown = false
    let mX:number
    let mY:number

    
    const app = new Application<HTMLCanvasElement>({
        width:props.renderSet.canvasWidth,
        height:props.renderSet.canvasHeight,
        backgroundColor: 0x5BBA6F,
    })

    const gridInputs = {
        renderSettings:props.renderSet
    }

    const viewport = new Viewport()

    const grid = new GanttGrid(gridInputs)
    grid.draw()

    viewport.addGraphics(grid)
    viewport.setLimits(-200)

    const view = new DOMMatrix ([1, 0, 0, 1, 0, 0])
    

    const limitTransfrom = (view:DOMMatrix) => { //limits views every applyview() call
        
        // const lowestViewPosition = props.renderSet.canvasHeight - (props.renderSet.nRows * props.renderSet.rowHeight)
  
    }

    const applyView = (view:DOMMatrix) =>{
        null
    }


    const handleMouseDown = (e:MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        mouseDown = true
        mX = e.clientX
        mY = e.clientY 
    }

    const handleMouseUp = (e:MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        mouseDown = false
    }

    const handleMouseMove = (e:MouseEvent) => {
        if(!mouseDown) return 
        e.preventDefault();
        e.stopPropagation();
        const new_mX = e.clientX
        const new_mY = e.clientY
        const dx = new_mX - mX
        const dy = new_mY - mY
        
        viewport.pan(dx,dy)
        
        mY = new_mY
        mX = new_mX
    }   

    const handleMouseWheel = (e:WheelEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const factor = 1 + (e.deltaY * 0.001)

        console.log(factor)
        viewport.zoom(factor,e.clientX, e.clientY)
    }

    const draw = ()=>{
        
            app.stage.addChild(viewport)
            
        }

    useEffect(()=>{ 
        if(pixiRef.current){
            const pixiElemet:HTMLDivElement = pixiRef.current
            pixiElemet.appendChild(app.view)
            pixiElemet.addEventListener("mouseout",handleMouseUp)
            pixiElemet.addEventListener("mouseup", handleMouseUp)
            pixiElemet.addEventListener("mousedown", handleMouseDown)
            pixiElemet.addEventListener("mousemove", handleMouseMove)
            pixiElemet.addEventListener("wheel", handleMouseWheel)
            draw()
            app.start()
            
        } 
        return () => {
            app.stop() 
            //app.destroy()
        }
    },[])

    return(
        <div ref={pixiRef}>
            
        </div>
    )
}

export default GanttChart