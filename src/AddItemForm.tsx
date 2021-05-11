import React, {ChangeEvent, KeyboardEvent, useState} from "react";

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
						<input value={title}
									 onChange={onChangeHandler}
									 onKeyPress={onKeyPressHandler}
									 className={error ? "error" : ""}
									 type="text"/>
						<button onClick={addTask}>+
						</button>
						{error && <div className="error-message">{error}</div>}
				</div>
		)
}