import {CompletedTaskItem} from "./comletedTaskItem";


export const CompletedTasks = ({taskList}) => {


    return (
        <div>
            {taskList.map(item=> <CompletedTaskItem task={item} key={item.id}/>)}
        </div>
    )
}