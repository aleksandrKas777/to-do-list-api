import "./style/main.scss";
import {CompletedTasks} from "./completedTasks";
import {TaskList} from "./taskList";
import {useEffect, useState} from "react";


export const Main = () => {
    const [taskList, setTaskList] = useState([]);
    const [newTask, setInputNewTask] = useState('');
    const [btnInput, setBtnInput] = useState('add');
    const [idTaskEdit, setIdTaskEdit] = useState(0);
    const [validationInput, setValidationInput] = useState(true);

    const urlApi = "https://jsonplaceholder.typicode.com/todos/";

    let styleInputValidation = {borderColor: "red"};

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
            .then((json) => {
                setInputNewTask('')
                return setTaskList([...taskList, json])

            });

    }
    // styleInputValidation = {borderColor: "red"}
    const inputNewTaskClear = (e) => {
        if (newTask !== "") {
            addTask(e)
            setInputNewTask('');
        } else {
            setValidationInput(false);
        }
    };

    const keyPress = (e) => {
        if (newTask !== "") {
            const code = e.keyCode || e.which;
            if (code === 13) {
                btnInput === 'add' ? addTask(newTask) : editTaskSave(newTask);

            }
        } else {
            setValidationInput(false);
        }
    };
    const inputNewTask = (e) => {
        setInputNewTask(e.target.value);
        if (newTask !== "") {
            setValidationInput(true);
        }
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

    const editTask = (id, task) => {
        setInputNewTask(task);
        setBtnInput('save');
        setIdTaskEdit(id);
    }
    const editTaskSave = (task) => {
        if (newTask !== "") {
            fetch(urlApi + idTaskEdit, {
                method: 'PATCH',
                body: JSON.stringify({
                    title: task,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((json) => setTaskList([...taskList.map(item => item.id === idTaskEdit ? json : item
                )]));
            setInputNewTask('')
            setBtnInput('add')
        } else {
            setValidationInput(false);
        }
    }
    const filterTaskList = (bool) => {
        return taskList.filter(item => item.completed === bool);
    }

    return (
        <main>
            <section className="main__left-block">
                <div className="main__left-block__input">
                    <input style={!validationInput ? styleInputValidation : null} value={newTask}
                           placeholder="+ Add a task, press Enter to save"
                           onKeyPress={(e) => keyPress(e)} onChange={inputNewTask}/>
                    <button onClick={() => {
                        btnInput === 'add' ? inputNewTaskClear(newTask) : editTaskSave(newTask)

                    }}>{btnInput}</button>
                </div>
                <div className="main__left-block__tags">
                    Total:{taskList.length}

                </div>
                <div className="main__left-block__all-tasks">

                    <TaskList taskList={filterTaskList(false)} deleteTask={deleteTask}
                              completeTask={completeTask} editTask={editTask}/>

                </div>
            </section>
            <section className="main__completed-task">
                <CompletedTasks taskList={filterTaskList(true)} deleteTask={deleteTask}
                                completeTask={completeTask}/>
            </section>
        </main>

    )
}