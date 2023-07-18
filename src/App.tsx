import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import GanttChart from '../carloGantt.ts/GanttChart'
import drawGanttGrid from '../carloGantt.ts/pixiJS/GanttGrid'


import { renderSettings } from '../carloGantt.ts/types/generalTypes'

/* 
this is the test bed for the library
*/

const body = document.body

const ganttChartWidth = body.clientWidth
const gantChartHeight = 500


const Settings:renderSettings = {
    canvasHeight:gantChartHeight,
    canvasWidth:ganttChartWidth,
    timeBuffer:365,
    timeUnit:"d",
    nRows:100,
    rowHeight:20,
    backgroundColour:0x5BBA6F,
    gridLineColour:0x00FF00,
    maxScale:5,
    minScale:1,
    
  }


function App() {
  const [count, setCount] = useState(0)
  
  return (
    <GanttChart renderSettings={Settings}></GanttChart>
  )
}

export {App}
