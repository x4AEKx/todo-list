import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Rest API', isDone: false},
        {id: 5, title: 'GraphQL', isDone: false}
    ])

    const [filter, setFilter] = useState<FilterValuesType>('all')

    function removeTask(id: number) {
        let filteredTasks = tasks.filter(task => task.id !== id)
        setTasks(filteredTasks)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    let tasksForTodolist = tasks

    if(filter === 'active') {
        tasksForTodolist = tasks.filter(task => task.isDone === false)
    }
    if(filter === 'completed') {
        tasksForTodolist = tasks.filter(task => task.isDone === true)
    }

    return (
        <div className="App">
            <TodoList title={'What to learn'}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />

        </div>
    );
}

export default App;
