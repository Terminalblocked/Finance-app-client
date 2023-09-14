import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import { IResponseTransactionLoader } from 'types/types'
import { CategoryModal } from './CategoryModal'

const TransactionForm: React.FC = () => {
	const { categories } = useLoaderData() as IResponseTransactionLoader
	const [visibleModal, setVisibleModal] = React.useState<boolean>(false)

	return (
		<div className="rounded-md bg-slate-800 p-4">
			<Form className="grid gap-2" method="post" action="/transactions">
				<label className="grid" htmlFor="title">
					<span>Title</span>
					<input
						type="text"
						className="my-2 input border-slate-700"
						placeholder="Title..."
						name="title"
						required
					/>
				</label>

				<label className="grid" htmlFor="amount">
					<span>Amount</span>
					<input
						type="number"
						className="my-2 input border-slate-700"
						placeholder="Amount..."
						name="amount"
						required
					/>
				</label>

				{/* Select */}
				{categories.length ? (
					<label className="grid" htmlFor="category">
						<span>Category</span>
						<select
							className="my-2 input border-slate-600 bg-slate-800"
							name="category"
						>
							{categories?.map((ctg, idx) => (
								<option key={idx} value={ctg.id}>
									{ctg.title}
								</option>
							))}
						</select>
					</label>
				) : (
					<h1 className="mt-1 text-red-300">
						To continue add a category first
					</h1>
				)}

				<button
					onClick={() => setVisibleModal(true)}
					className="max-w-fit  flex items-center gap-2 text-white/50 hover:text-white"
				>
					<FaPlus />
					<span>Manage Categories</span>
				</button>

				{/* Radio Buttons */}
				<div className="flex gap-4 items-center">
					<label className="flex cursor-pointer items-center gap-2">
						<input
							type="radio"
							name="type"
							value={'income'}
							className="form-radio text-blue-600"
							required
						/>
						<span>Income</span>
					</label>
					<label className="flex cursor-pointer items-center gap-2">
						<input
							type="radio"
							name="type"
							value={'expense'}
							className="form-radio text-blue-600"
							required
						/>
						<span>Expense</span>
					</label>
				</div>

				{/* Submit Button */}
				<button type="submit" className="btn btn-green max-w-fit mt-2">
					Submit
				</button>
			</Form>

			{/* Add Category Modal */}
			{visibleModal && (
				<CategoryModal type="post" setVisibleModal={setVisibleModal} />
			)}
		</div>
	)
}

export default TransactionForm
