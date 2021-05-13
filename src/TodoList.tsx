import React, {ChangeEvent} from "react";

import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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
								<IconButton onClick={removeTodoList} aria-label="delete">
										<Delete/>
								</IconButton>
						</h3>
						<AddItemForm addItem={addTask}/>
						<div>
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

												return <div key={task.id} className={task.isDone ? "is-done" : ""}>
														<Checkbox
																checked={task.isDone}
																onChange={onChangeStatusHandler}
														/>
														<EditableSpan onChange={onChangeTitleHandler} title={task.title}/>
														<IconButton onClick={onRemoveHandler} aria-label="delete">
																<Delete/>
														</IconButton>
												</div>
										})
								}
						</div>
						<div>
								<Button variant={props.filter === "all" ? "contained" : "text"}
												onClick={onAllClickHandler}>All
								</Button>
								<Button color={"primary"} variant={props.filter === "active" ? "contained" : "text"}
												onClick={onActiveClickHandler}>Active
								</Button>
								<Button color={"secondary"} variant={props.filter === "completed" ? "contained" : "text"}
												onClick={onCompletedClickHandler}>Completed
								</Button>
						</div>
				</div>
		);
}

