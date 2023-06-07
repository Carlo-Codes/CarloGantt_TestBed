import React, {FunctionComponent, MouseEventHandler, WheelEventHandler, useEffect} from 'react'
import "./GantChart.css"
import { renderSettings } from './types/generalTypes'
import GanttGrid from './GanttGrid'
import { Application } from 'pixijs'

type Props ={
    renderSet:renderSettings
}

function GanttChart(props:Props){
 
    const canvasRef = React.useRef(null)
    const gantData = React.useRef(null)
    const frameID = React.useRef(0)

    const pixiRef = React.useRef(null)
    
    const app = new Application<HTMLCanvasElement>({
        width:props.renderSet.canvasWidth,
        height:props.renderSet.canvasHeight,
        backgroundColor: 0x5BBA6F,
    })

    const gridInputs = {
        renderSettings:props.renderSet
    }

    const grid = new GanttGrid(gridInputs)
    grid.draw()

    const view = new DOMMatrix ([1, 0, 0, 1, 0, 0])
    


    let mouseDown = false
    let mX:number
    let mY:number



    const limitTransfrom = (view:DOMMatrix) => { //limits views every applyview() call
        
        // const lowestViewPosition = props.renderSet.canvasHeight - (props.renderSet.nRows * props.renderSet.rowHeight)
  
    }

    const applyView = (view:DOMMatrix) =>{
        null
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
        
        
            view.e += dx
            view.f += dy

            applyView(view)
            console.log(view)
        
        mY = new_mY
        mX = new_mX
    }   

    const handleMouseWheel:WheelEventHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        

        const newScale = view.a + (e.deltaY * 0.0001 )
        const oldScale = view.a

        const scaleDelta = newScale - oldScale

        const offsetX = -(scaleDelta * e.clientX )
        const offsetY = -(scaleDelta * e.clientY )

        console.log(e.clientX)
        console.log(offsetX)

        applyView(view)

        }

    const draw = ()=>{
        
            
            
            app.stage.addChild(grid)
            
        }



    useEffect(()=>{ 
        if(pixiRef.current){
            const pixiElemet:HTMLDivElement = pixiRef.current
            pixiElemet.appendChild(app.view)
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