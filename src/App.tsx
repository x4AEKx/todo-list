import React, {useState} from "react";
import {v1} from "uuid";

import "./App.css";
import {TaskType, TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed"
type TodoListType = {
		id: string
		title: string
		filter: FilterValuesType
}

type TasksObjType =
		{
				[p: string]: Array<TaskType>
		}

function App() {

		let todoListId1 = v1()
		let todoListId2 = v1()

		let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
				{id: todoListId1, title: "What to learn", filter: "active"},
				{id: todoListId2, title: "What to buy", filter: "completed"}
		])

		let [tasksObj, setTasksObj] = useState<TasksObjType>({
				[todoListId1]: [
						{id: v1(), title: "HTML&CSS", isDone: true},
						{id: v1(), title: "JS", isDone: true},
						{id: v1(), title: "ReactJS", isDone: false},
						{id: v1(), title: "Rest API", isDone: false},
						{id: v1(), title: "GraphQL", isDone: false}
				],
				[todoListId2]: [
						{id: v1(), title: "Book", isDone: true},
						{id: v1(), title: "Milk", isDone: true},
				]
		})

		const addTask = (title: string, todoListId: string) => {
				const task = {id: v1(), title: title, isDone: false}
				let tasks = tasksObj[todoListId]
				let newTasks = [task, ...tasks]
				tasksObj[todoListId] = newTasks

				setTasksObj({...tasksObj})
		}

		const removeTodoList = (todoListId: string) => {
				let filteredTodoList = todoLists.filter(tl => tl.id !== todoListId)
				setTodoLists(filteredTodoList)

				delete tasksObj[todoListId]
				setTasksObj({...tasksObj})
		}

		const changeStatus = (taskId: string, isDone: boolean, todoListId: string) => {
				let tasks = tasksObj[todoListId]
				let task = tasks.find(task => task.id === taskId)
				if (task) {
						task.isDone = isDone
						setTasksObj({...tasksObj})
				}
		}

		const removeTask = (id: string, todoListId: string) => {
				let tasks = tasksObj[todoListId]
				const filteredTasks = tasks.filter(task => task.id !== id)

				tasksObj[todoListId] = filteredTasks
				setTasksObj({...tasksObj})
		}

		const changeFilter = (value: FilterValuesType, todoListId: string) => {
				let todolist = todoLists.find((tl) => tl.id === todoListId)
				if (todolist) {
						todolist.filter = value
						setTodoLists([...todoLists])
				}
		}

		function AddTodoList(title: string) {
				let todoList: TodoListType = {
						id: v1(),
						filter: "all",
						title
				}
				setTodoLists([todoList, ...todoLists])
				setTasksObj({...tasksObj, [todoList.id]: []})
		}

		return (
				<div className="App">
						<AddItemForm addItem={AddTodoList}/>
						{
								todoLists.map((todolist) => {
										let tasksForTodolist = tasksObj[todolist.id]

										if (todolist.filter === "active") {
												tasksForTodolist = tasksForTodolist.filter(task => task.isDone === false)
										}
										if (todolist.filter === "completed") {
												tasksForTodolist = tasksForTodolist.filter(task => task.isDone === true)
										}

										return <TodoList title={todolist.title}
																		 key={todolist.id}
																		 id={todolist.id}
																		 tasks={tasksForTodolist}
																		 removeTask={removeTask}
																		 changeFilter={changeFilter}
																		 addTask={addTask}
																		 changeStatus={changeStatus}
																		 filter={todolist.filter}
																		 removeTodoList={removeTodoList}
										/>
								})
						}
				</div>
		);
}

export default App;