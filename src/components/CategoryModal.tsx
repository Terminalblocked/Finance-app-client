import React from 'react'
import { Form } from 'react-router-dom'

interface ICategoryModal {
	type: 'post' | 'patch'
	id?: number
	setVisibleModal: (visible: boolean) => void
	setIsEdit?: (bool: boolean) => void
}

export const CategoryModal: React.FC<ICategoryModal> = ({
	type,
	id,
	setVisibleModal,
	setIsEdit,
}) => {
	return (
		<div className="fixed top-0 left-0 bottom-0 right-0 w-full h-full bg-black/50 flex justify-center items-center">
			<Form
				action="/categories"
				onSubmit={() => setVisibleModal(false)}
				method={type}
				className="grid gap-2 w-[300px] p-5 rounded-md bg-slate-900"
			>
				<label htmlFor="title">
					<small>Category Title</small>
					<input
						className="mt-5 input w-full"
						type="text"
						name="title"
						placeholder="Title"
					/>
					<input type="hidden" name="id" value={id} />
				</label>

				<div className="mt-5 flex justify-center items-center gap-5">
					<button className="btn btn-green" type="submit">
						{type === 'patch' ? 'Save' : 'Create'}
					</button>
					<button
						onClick={() => {
							setVisibleModal(false)
							setIsEdit && setIsEdit(false)
						}}
						className="btn btn-red"
					>
						Close
					</button>
				</div>
			</Form>
		</div>
	)
}
