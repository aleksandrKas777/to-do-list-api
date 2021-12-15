import {CompletedTaskItem} from "./comletedTaskItem";


export const CompletedTasks = ({taskList, deleteTask, completeTask}) => {


    return (
        <div>
            {taskList.map(item => <CompletedTaskItem task={item} key={item.id} deleteTask={deleteTask}
                                                     completeTask={completeTask}/>)}
        </div>
    )
}