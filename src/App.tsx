import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import GanttChart from '../carloGantt.ts/GanttChart'
import drawGanttGrid from '../carloGantt.ts/drawGanttGrid'

const body = document.body

const ganttChartWidth = body.clientWidth
const gantChartHeight = 500



const draw = (context:CanvasRenderingContext2D )=>{


  const gridSettings = {
    context:context,
    gantHeight:gantChartHeight,
    gantWidth:ganttChartWidth,
    nCols:10,
    nRows:5,
  }

  drawGanttGrid(gridSettings)



}



function App() {
  const [count, setCount] = useState(0)
  
  return (
    <GanttChart height={gantChartHeight} width={ganttChartWidth} drawGantts={draw}></GanttChart>
  )
}

export default App
