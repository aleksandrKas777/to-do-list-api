
import {TaskItem} from "./taskItem";


export const TaskList = ({taskList}) => {




    return (

        <div>
            <h4>To do ({taskList.length})</h4>
            {taskList.map((item)=> <TaskItem task={item} key={item.id}/>)}

        </div>
    )
}