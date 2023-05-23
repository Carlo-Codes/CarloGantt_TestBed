import React, {FunctionComponent} from 'react'
import "./GantChart.css"

type Props ={
    width:number,
    height:number
}

function GanttChart(props:Props):FunctionComponent<Props>{

    let cavasRef = React.useRef(null)

    

    return(
        <div>
            <canvas width={props.width} height={props.height} ref={cavasRef}/>
        </div>
    )
}

export default GanttChart