import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import GanttChart from '../carloGantt.ts/GanttChart'
import drawGanttGrid from '../carloGantt.ts/engine/GanttGrid'
import dayjs from 'dayjs'
import { taskType } from '../carloGantt.ts/types/generalTypes'

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
    rowHeight:50,
    columnWidth:100,
    backgroundColour:0x5BBA6F,
    gridLineColour:0x00FF00,
    maxScale:5,
    minScale:1,
    taskDetailsWidth:300,
    
    
  }

const tasks:taskType [] = [];

for(let i = 0; i < 30; i ++){
  const now = dayjs()
  const startDate = now.add(i,'day')
  const endDate = startDate.add(7, 'day')
  tasks.push({
    id:`Task ${i}`,
    name:`Task ${i}`,
    startDate:startDate,
    endDate:endDate
  })
}


function App() {
  const [count, setCount] = useState(0)
  
  return (
    <GanttChart renderSettings={Settings} tasks={tasks}></GanttChart>
  )
}

export {App}
