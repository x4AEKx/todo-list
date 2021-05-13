import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";

type AddItemFormType = {
		addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormType) {
		const [title, setTitle] = useState("")
		const [error, setError] = useState<string | null>(null)

		const addTask = () => {
				if (title.trim() !== "") {
						props.addItem(title.trim())
						setTitle("")
				} else {
						setError("Title is required")
				}
		}

		const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

		const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
				setError(null)
				if (e.charCode === 13) {
						addTask()
				}
		}
		return (
				<div>
						<TextField value={title}
											 variant={"outlined"}
											 label={"type value"}
											 onChange={onChangeHandler}
											 onKeyPress={onKeyPressHandler}
											 error={!!error}
											 helperText={error}
											 type="text"/>
						<IconButton color={"primary"} onClick={addTask}>
								<ControlPoint />
						</IconButton>
				</div>
		)
}