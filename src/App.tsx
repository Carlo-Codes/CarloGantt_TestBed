import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import GanttChart from '../carloGantt.ts/GanttChart'
import drawGanttGrid from '../carloGantt.ts/drawGanttGrid'


import { gantSettings } from '../carloGantt.ts/types/generalTypes'

const body = document.body

const ganttChartWidth = body.clientWidth
const gantChartHeight = 500


const gantSetting:gantSettings = {
    gantHeight:gantChartHeight,
    gantWidth:ganttChartWidth,
    nCols:10,
    nRows:5,
    rowHeight:20
  }


function App() {
  const [count, setCount] = useState(0)
  
  return (
    <GanttChart height={gantChartHeight} width={ganttChartWidth} gantSettings={gantSetting}></GanttChart>
  )
}

export {App}
