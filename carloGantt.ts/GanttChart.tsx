import React, {FunctionComponent, MouseEventHandler, WheelEventHandler, useEffect} from 'react'
import "./GantChart.css"
import { renderSettings, taskType } from './types/generalTypes'
import { Application,Graphics, FederatedPointerEvent, FederatedWheelEvent } from 'pixijs'
import GanttLayout from './ganttAbstraction/GanttLayout'
import dayjs from 'dayjs'
import { rgb2hex } from 'pixijs/utils'



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

    const layout = new GanttLayout(props.renderSettings,props.tasks)
    layout.init()
    const columnHeadingBackgroundColour = rgb2hex([20,50,60,0])
    const taskdetailsBackgroundColour = rgb2hex([233,0,100])
    const ganttBackgroundColour = rgb2hex([200,255,0])
    const detailsPanelBackgroundColour = rgb2hex([200,200,200])
    layout.getColumnHeadingViewport().addBackgroundColour(columnHeadingBackgroundColour,100)
    layout.panToNow()
  

    
    
  



    
    

    


    
       

/* 
    console.log("heading layout = " + layout.getColumnHeadingViewport().getBounds())
    console.log(" gant layout"+ layout.getGanttViewport().getBounds())
    console.log("details panel" + layout.getDetailsPanelViewport().getBounds()) */


    /* ALL THIS EVENT HANDLING NEEDS TO GO INTO THE REsPECTIVE CLASSES */



    useEffect(()=>{ 
        if(pixiRef.current){
            const pixiElemet:HTMLDivElement = pixiRef.current
            pixiElemet.appendChild(layout.getGantChart().view)
            layout.draw()
            layout.getGantChart().start()
            

        } 
        return () => {
            layout.getGantChart().stop() 
            
        }
    },[])

    return(
        <div ref={pixiRef}>
            
        </div>
    )
}

export default GanttChart