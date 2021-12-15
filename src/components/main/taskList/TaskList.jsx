import {TaskItem} from "./taskItem";


export const TaskList = ({taskList, deleteTask, completeTask}) => {


    return (

        <div>
            <h4>To do ({taskList.length})</h4>
            {taskList.map((item) => <TaskItem task={item} key={item.id} deleteTask={deleteTask}
                                              completeTask={completeTask}/>)}

        </div>
    )
}