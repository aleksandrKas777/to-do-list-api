import "./style/main.scss";
import {CompletedTasks} from "./completedTasks";
import {TaskList} from "./taskList";
import {useEffect, useState} from "react";


export const Main = () => {
    const [taskList, setTaskList] = useState([]);
    const [newTask, setInputNewTask] = useState('');

    const urlApi = "https://jsonplaceholder.typicode.com/todos/";

    useEffect(() => {

        fetch(urlApi)
            .then((response) => response.json())
            .then((json) => setTaskList(json));
    }, [])

    const addTask = (newTask) => {
        fetch(urlApi, {
            method: 'POST',
            body: JSON.stringify({
                userId: 7,
                title: newTask,
                completed: false
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => setTaskList([...taskList, json]));

    }

    const deleteTask = (id) => {
        fetch(urlApi + {id}, {
            method: 'DELETE',
        }).then(() => setTaskList([...taskList.filter((item) => item.id !== id)]));
    }

    const completeTask = (id, completed) => {

        fetch(urlApi + id, {
            method: 'PATCH',
            body: JSON.stringify({
                completed: !completed,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => setTaskList([...taskList.filter(item => item.id !== id), json]));
    }

    const inputNewTask = (e) => {
        setInputNewTask(e.target.value);
    }

    return (
        <main>
            <section className="main__left-block">
                <div className="main__left-block__input">
                    <input placeholder="+ Add a task, press Enter to save" onChange={inputNewTask}/>
                    <button onClick={() => addTask(newTask)}>add</button>
                </div>
                <div className="main__left-block__tags">
                    Total: {taskList.length}
                </div>
                <div className="main__left-block__all-tasks">

                    <TaskList taskList={taskList.filter(item => item.completed === false)} deleteTask={deleteTask}
                              completeTask={completeTask}/>

                </div>
            </section>
            <section className="main__completed-task">
                <CompletedTasks taskList={taskList.filter(item => item.completed === true)} deleteTask={deleteTask}
                                completeTask={completeTask}/>
            </section>
        </main>

    )
}