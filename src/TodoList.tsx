import React, {ChangeEvent} from "react";

import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";

export type TaskType = {
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

		const onAllClickHandler = () => props.changeFilter("all", props.id)
		const onActiveClickHandler = () => props.changeFilter("active", props.id)
		const onCompletedClickHandler = () => props.changeFilter("completed", props.id)
		const removeTodoList = () => {
				props.removeTodoList(props.id)
		}

		const addTask = (title: string) => {
				props.addTask(title, props.id)
		}

		return (
				<div>
						<h3>{props.title}
								<button onClick={removeTodoList}>X</button>
						</h3>
						<AddItemForm addItem={addTask}/>
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
		);
}

