import {taskType} from '../types/generalTypes'
import GanttRow from './GanttRow'
class Task {
    task: taskType
    private row : GanttRow
    constructor(){
        this.row = new GanttRow()
    
    }
}