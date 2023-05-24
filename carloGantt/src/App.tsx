import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import GanttChart from '../carloGantt.ts/GanttChart'

const body = document.body

const draw = (context:CanvasRenderingContext2D )=>{
  context.fillStyle = "#000000"
  context.fillRect(0,0, 300, 200)
}

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <GanttChart height={500} width={body.clientWidth} drawGantts={draw}></GanttChart>
  )
}

export default App
