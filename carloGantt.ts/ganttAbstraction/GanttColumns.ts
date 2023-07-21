import { renderSettings } from "../types/generalTypes"
import { Text, TextStyle, Graphics } from "pixijs"
import 'fontfaceobserver'
import * as dayjs from "dayjs"

/*
 This class abstracts the column of a gantt chart, here all the properties for
 a column will be defined and the rendering function of the column based on theses
 properties. Time objects will almost certainly be used in conjuction with 
 the creation of an instance of this class
*/

class GanttColumn { 

    private id:string // planning to be the date backwards

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

    //PixiJS Graphics
    private headingRect: Graphics
    private columnRect : Graphics
    private headingText: Text
    private headingTextStyle: TextStyle


    private setHeadingText(){
        this.headingText.position.set(this.xPositionHeading, this.yPositionHeading);
        
    }

   
    

    constructor(id:string, heading:string, headingHeight:number, xPosition:number, yPosition:number,columnWidth:number, columnHeight:number, 
        xPositionColumn?:number, yPositionColumn?:number //these params are here incase the heading and column are seperated in some way
        ){
        this.id = id
        this.heading = heading
        this.headingHeight = headingHeight
        this.xPositionHeading = xPosition
        this.yPositionHeading = yPosition
        this.xPositionColumn = xPosition
        this.yPositionColumn = yPosition - headingHeight
        this.columnWidth = columnWidth
        this.columnHeight = columnHeight- yPosition
        
        this.headingRect = new Graphics()
        this.columnRect = new Graphics()
        

        //tests/// - to be turned into some sort of object for passing around
        this.headingTextStyle = new TextStyle({
            align: "center",
            fill: "#754c24",
            fontSize: 10
        });
        this.lineWeight = 1
        this.lineColour = 0x00FF00
        /////////

        this.headingText = new Text(this.heading, this.headingTextStyle)
        

    }


    getColumnWidth(){
        return this.columnWidth
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

    getHeadingRect(){
        return this.headingRect
    }
    getColumnRect(){
        return this.columnRect
    }

    setXPosition(x:number){
        this.xPositionHeading = x
        this.xPositionColumn = x
    }

    getXPosition(){
        return this.xPositionColumn
    }

    getHeadingHeight(){
        return this.headingHeight
    }


    render(){ //start back here - add headings to the header rect.
        

        if(this.lineWeight && this.lineColour){
            this.headingRect.lineStyle(this.lineWeight, this.lineColour)
            this.columnRect.lineStyle(this.lineWeight, this.lineColour)
        }

        if(this.headingColour){
            this.headingRect.beginFill(this.headingColour)
        }

        if(this.bodyColour){
            this.columnRect.beginFill(this.bodyColour)
        }

        this.headingRect.drawRect(this.xPositionHeading,this.yPositionHeading,this.columnWidth,this.headingHeight)
        this.setHeadingText()
        this.headingRect.addChild(this.headingText)
        this.columnRect.drawRect(this.xPositionColumn,this.yPositionColumn,this.columnWidth,this.columnHeight)
        
    }

    setColumnWidth(width:number){
        this.columnWidth = width
    }

    clear(){
        this.headingRect.clear()
        this.columnRect.clear()
    }
}

export default GanttColumn

