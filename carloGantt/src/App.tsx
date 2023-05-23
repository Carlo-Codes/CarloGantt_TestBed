import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import GanttChart from '../carloGantt.ts/GanttChart'

let body = document.body

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <GanttChart height={500} width={body.clientWidth}></GanttChart>
  )
}

export default App
