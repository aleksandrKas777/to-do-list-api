import "./style/main.scss";
import {CompletedTasks} from "./completedTasks";
import {TaskList} from "./taskList";
import {useEffect, useState} from "react";


export const Main = () => {
    const [taskList, setTaskList] = useState([]);

    useEffect(()=> {

        fetch("https://jsonplaceholder.typicode.com/todos")
            .then((response) => response.json())
            .then((json) => setTaskList(json));

    })
    // console.log(taskList);
    return (
        <main>
            <section className="main__left-block">
                <div className="main__left-block__input">
                    <input/>
                    <button>add</button>
                </div>
                <div className="main__left-block__tags">
                    total
                </div>
                <div className="main__left-block__all-tasks">

                    <TaskList taskList={taskList.filter(item=>item.completed === false)}/>

                </div>
            </section>
            <section className="main__completed-task">
                <CompletedTasks taskList={taskList.filter(item=>item.completed === true)}/>
            </section>
        </main>
    )
}