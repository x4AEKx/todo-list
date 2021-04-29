import React, {ChangeEvent, KeyboardEvent, useState} from "react";

import {FilterValuesType} from "./App";

type TaskType = {
		id: string
		title: string
		isDone: boolean
}

type PropsType = {
		id: string
		title: string
		tasks: Array<TaskType>
		removeTask: (id: string, todoListId: string) => void
		changeFilter: (value: FilterValuesType, todoListId: string) => void
		addTask: (title: string, todoListId: string) => void
		changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void
		filter: FilterValuesType
		removeTodoList: (todoListId: string) => void
}

export function TodoList(props: PropsType) {
		const [title, setTitle] = useState("")
		const [error, setError] = useState<string | null>(null)

		const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

		const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
				setError(null)
				if (e.charCode === 13) {
						addTask()
				}
		}

		const addTask = () => {
				if (title.trim() !== "") {
						props.addTask(title.trim(), props.id)
						setTitle("")
				} else {
						setError("Title is required")
				}
		}

		const onAllClickHandler = () => props.changeFilter("all", props.id)
		const onActiveClickHandler = () => props.changeFilter("active", props.id)
		const onCompletedClickHandler = () => props.changeFilter("completed", props.id)
		const removeTodoList = () => {
				props.removeTodoList(props.id)
		}

		return (
				<div>
						<h3>{props.title}
								<button onClick={removeTodoList}>X</button>
						</h3>
						<div>
								<input value={title}
											 onChange={onChangeHandler}
											 onKeyPress={onKeyPressHandler}
											 className={error ? "error" : ""}
											 type="text"/>
								<button onClick={addTask}>+
								</button>
								{error && <div className="error-message">{error}</div>}
								<ul>
										{
												props.tasks.map(task => {
														const onRemoveHandler = () => {
																props.removeTask(task.id, props.id)
														}

														const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
																props.changeStatus(task.id, e.currentTarget.checked, props.id)
														}

														return <li key={task.id} className={task.isDone ? "is-done" : ""}>
																<input type="checkbox"
																			 checked={task.isDone}
																			 onChange={onChangeHandler}
																/>
																<span>{task.title}</span>
																<button onClick={onRemoveHandler}>X</button>
														</li>
												})
										}
								</ul>
								<div>
										<button className={props.filter === "all" ? "active-filter" : ""}
														onClick={onAllClickHandler}>All
										</button>
										<button className={props.filter === "active" ? "active-filter" : ""}
														onClick={onActiveClickHandler}>Active
										</button>
										<button className={props.filter === "completed" ? "active-filter" : ""}
														onClick={onCompletedClickHandler}>Completed
										</button>
								</div>
						</div>
				</div>
		);
}