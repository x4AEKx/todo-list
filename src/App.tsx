import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";

const task1 = [
    {id: 1, title: 'HTML&CSS', isDone: true},
    {id: 2, title: 'JS', isDone: true},
    {id: 3, title: 'ReactJS', isDone: false}
]

const task2 = [
    {id: 1, title: 'Hello world', isDone: true},
    {id: 2, title: 'I am Happy', isDone: false},
    {id: 3, title: 'Yo', isDone: false}
]

function App() {
    return (
        <div className="App">
            <TodoList title={'What to learn'} tasks={task1}/>
            <TodoList title={'Movies'} tasks={task2}/>
        </div>
    );
}

export default App;
