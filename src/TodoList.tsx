import React, {ChangeEvent} from "react";

import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
		changeTaskTitle: (id: string, newTitle: string, todoListId: string) => void
		filter: FilterValuesType
		removeTodoList: (todoListId: string) => void
		changeTodoListTitle: (id: string, newTitle: string) => void
}

export function TodoList(props: PropsType) {

		const onAllClickHandler = () => props.changeFilter("all", props.id)
		const onActiveClickHandler = () => props.changeFilter("active", props.id)
		const onCompletedClickHandler = () => props.changeFilter("completed", props.id)
		const removeTodoList = () => {
				props.removeTodoList(props.id)
		}

		const changeTodoListTitle = (newTitle: string) => {
				props.changeTodoListTitle(props.id, newTitle)
		}

		const addTask = (title: string) => {
				props.addTask(title, props.id)
		}

		return (
				<div>
						<h3><EditableSpan title={props.title} onChange={changeTodoListTitle}/>
								<button onClick={removeTodoList}>X</button>
						</h3>
						<AddItemForm addItem={addTask}/>
						<ul>
								{
										props.tasks.map(task => {
												const onRemoveHandler = () => {
														props.removeTask(task.id, props.id)
												}

												const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
														props.changeStatus(task.id, e.currentTarget.checked, props.id)
												}
												const onChangeTitleHandler = (newValue: string) => {
														props.changeTaskTitle(task.id, newValue, props.id)
												}

												return <li key={task.id} className={task.isDone ? "is-done" : ""}>
														<input type="checkbox"
																	 checked={task.isDone}
																	 onChange={onChangeStatusHandler}
														/>
														<EditableSpan onChange={onChangeTitleHandler} title={task.title}/>
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

