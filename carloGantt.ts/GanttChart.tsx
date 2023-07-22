import React, {FunctionComponent, MouseEventHandler, WheelEventHandler, useEffect} from 'react'
import "./GantChart.css"
import { renderSettings, taskType } from './types/generalTypes'
import { Application } from 'pixijs'
import GanttLayout from './ganttAbstraction/GanttLayout'
import dayjs from 'dayjs'



/* 
this is a react function for creating the gant chart object. it includes the viewport, the grid, the headings etc and brings it all together
Also, it handles all the events from the mouse.
*/

type Props ={
    renderSettings:renderSettings,
    tasks:taskType [],
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


    
    const layout = new GanttLayout(props.renderSettings,props.tasks)
    layout.getGanttViewport().setLimits({})
    layout.generateColumns()
    layout.generateTasks()



    
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
        
        layout.getGanttViewport().pan(dx,dy)
        layout.getColumnHeadingViewport().pan(dx,0)
        layout.getTaskDetialsViewport().pan(0,dy)
        
        mY = new_mY
        mX = new_mX
    }   

    const handleMouseWheel = (e:WheelEvent) => {
        e.preventDefault();
        e.stopPropagation();
        //const factor = 1 + (-e.deltaY * 0.001) this is from when we were able to actually zoom in not needed.
        layout.zoomColumns(e.deltaY/10)
        
    }

    const draw = ()=>{
        
            app.stage.addChild(layout.getGanttViewport())
            app.stage.addChild(layout.getTaskDetialsViewport())
            app.stage.addChild(layout.getColumnHeadingViewport())
            
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