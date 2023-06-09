import React, {FunctionComponent, MouseEventHandler, WheelEventHandler, useEffect} from 'react'
import "./GantChart.css"
import { renderSettings } from './types/generalTypes'
import GanttGrid from './pixiJS/GanttGrid'
import { Application } from 'pixijs'
import {Viewport} from './pixiJS/viewport'
import{GantTime} from './dateTime/gantTime'

/* 
this is a react function for creating the gant chart object. it includes the viewport, the grid, the headings etc and brings it all together
Also, it handles all the events from the mouse.
*/

type Props ={
    renderSettings:renderSettings
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
        width:props.renderSettings.canvasWidth,
        height:props.renderSettings.canvasHeight,
        backgroundColor: props.renderSettings.backgroundColour,
    })

    const time = new GantTime(props.renderSettings)
    const viewport = new Viewport()
    const grid = new GanttGrid(props.renderSettings)

    grid.draw()



    const columns = time.getDivisions()

    console.log(columns) // back here next, remove manual option for nCols in settings, replace with buffer size, implement column headers

    viewport.addGraphics(grid)
    

    const view = new DOMMatrix ([1, 0, 0, 1, 0, 0])
    



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
            
        }
    },[])

    return(
        <div ref={pixiRef}>
            
        </div>
    )
}

export default GanttChart