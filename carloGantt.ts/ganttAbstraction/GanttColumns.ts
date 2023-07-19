import { renderSettings } from "../types/generalTypes"
import { Graphics } from "pixijs"

/*
 This class abstracts the column of a gantt chart, here all the properties for
 a column will be defined and the rendering function of the column based on theses
 properties. Time objects will almost certainly be used in conjuction with 
 the creation of an instance of this class
*/

class GanttColumn { 

    private id:number // planning to be the date backwards

    //Heading Properties - heading may want to be sperate (in postion) from the column
    private heading:string
    private headingHeight:number
    private xPositionHeading:number
    private yPositionHeading:number
    
    //column Body properties
    private xPositionColumn:number
    private yPositionColumn:number
    private columnWidth:number
    private columnHeight:number

    //rendering properties
    private headingColour?:number
    private bodyColour?:number
    private lineWeight?:number
    private lineColour?:number
   
    

    constructor(id:number, heading:string, headingHeight:number, xPosition:number, yPosition:number, width:number,renderSettings:renderSettings, 
        xPositionColumn?:number, yPositionColumn?:number //these params are here incase the heading and column are seperated in some way
        ){
        this.id = id
        this.heading = heading
        this.headingHeight = headingHeight
        this.xPositionHeading = xPosition
        this.yPositionHeading = yPosition
        this.xPositionColumn = xPosition
        this.yPositionColumn = yPosition - headingHeight
        this.columnWidth = width
        this.columnHeight = renderSettings.canvasHeight - yPosition


    }

    setWidth(width:number){
        null
    }

    setColour(colour:number){
        null
    }

    setLineWeight(lineWeight:number){
        null
    }

    setLineColour(lineColour:number){
        null
    }

    setHeadingHeight(headingHeight:number){
        null
    }

    render(){
        const headingRect = new Graphics()
        const columnRect = new Graphics()

        if(this.lineWeight && this.lineColour){
            headingRect.lineStyle(this.lineWeight, this.lineColour)
            columnRect.lineStyle(this.lineWeight, this.lineColour)
        }

        if(this.headingColour){
            headingRect.beginFill(this.headingColour)
        }

        if(this.bodyColour){
            columnRect.beginFill(this.bodyColour)
        }

        headingRect.drawRect(this.xPositionHeading,this.yPositionHeading,this.columnWidth,this.headingHeight)
        columnRect.drawRect(this.xPositionColumn,this.yPositionColumn,this.columnWidth,this.columnHeight)
        
    }
}

export default GanttColumn

