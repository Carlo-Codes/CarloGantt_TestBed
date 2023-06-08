import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import GanttChart from '../carloGantt.ts/GanttChart'
import drawGanttGrid from '../carloGantt.ts/pixiJS/GanttGrid'


import { renderSettings } from '../carloGantt.ts/types/generalTypes'

const body = document.body

const ganttChartWidth = body.clientWidth
const gantChartHeight = 500


const Settings:renderSettings = {
    canvasHeight:gantChartHeight,
    canvasWidth:ganttChartWidth,
    nCols:10,
    nRows:100,
    rowHeight:20
  }


function App() {
  const [count, setCount] = useState(0)
  
  return (
    <GanttChart renderSet={Settings}></GanttChart>
  )
}

export {App}
