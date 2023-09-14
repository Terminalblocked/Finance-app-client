import { instance } from 'api/axios.api'
import { CategoryModal } from 'components/CategoryModal'
import React from 'react'
import { AiFillEdit, AiFillCloseCircle } from 'react-icons/ai'
import { FaPlus } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import { ICategory } from 'types/types'
import { toast } from 'react-toastify'

export const categoriesAction = async ({ request }: any) => {
	try {
		switch (request.method) {
			case 'POST': {
				const formData = await request.formData()
				const title = {
					title: formData.get('title'),
				}
				await instance.post('/categories', title)
				return null
			}
			case 'PATCH': {
				const formData = await request.formData()
				const category = {
					id: formData.get('id'),
					title: formData.get('title'),
				}
				await instance.patch(`/categories/category/${category.id}`, category)
				return null
			}
			case 'DELETE': {
				const formData = await request.formData()
				const categoryId = formData.get('id')
				await instance.delete(`/categories/category/${categoryId}`)
				return null
			}
		}
	} catch (err: any) {
		const error = err.response?.data.message
		toast.error(error.toString())
	}
}

export const categoryLoader = async () => {
	const { data } = await instance.get<ICategory[]>('/categories')
	return data
}

const Categories: React.FC = () => {
	const categories = useLoaderData() as ICategory[]
	const [categoryId, setCategoryId] = React.useState<number>(0)
	const [isEdit, setIsEdit] = React.useState<boolean>(false)

	const [visibleModal, setVisibleModal] = React.useState<boolean>(false)

	React.useEffect(() => {
		if (!visibleModal) {
			setIsEdit(false)
		}
	}, [visibleModal])

	return (
		<React.Fragment>
			<div className="mt-10 p-4 rounded-md bg-slate-800">
				<h1>Your category list:</h1>
				<div className="flex mt-2 flex-wrap items-center gap-2">
					{categories?.map((category, idx) => (
						<div
							key={idx}
							className="group py-2 px-4 rounded-lg gap-8 bg-blue-600 flex items-center relative"
						>
							{category.title}
							<div className="group-hover:flex absolute hidden px-3 left-0 top-0 bottom-0 right-0 rounded-lg bg-black/90 items-center justify-between">
								<button
									onClick={() => {
										setVisibleModal(true)
										setCategoryId(category.id)
										setIsEdit(true)
									}}
								>
									<AiFillEdit />
								</button>

								<Form className="flex" method="delete" action="/categories">
									<input type="hidden" name="id" value={category.id} />
									<button type="submit">
										<AiFillCloseCircle />
									</button>
								</Form>
							</div>
						</div>
					))}
				</div>

				<button
					onClick={() => setVisibleModal(true)}
					className="max-w-fit mt-5 flex items-center gap-2 text-white/50 hover:text-white"
				>
					<FaPlus />
					<span>Create a new category</span>
				</button>
			</div>

			{/* Add Category Modal */}
			{visibleModal && (
				<CategoryModal
					type="post"
					setVisibleModal={setVisibleModal}
					setIsEdit={setIsEdit}
				/>
			)}

			{/* Update Category Modal */}
			{visibleModal && isEdit && (
				<CategoryModal
					type="patch"
					id={categoryId}
					setIsEdit={setIsEdit}
					setVisibleModal={setVisibleModal}
				/>
			)}
		</React.Fragment>
	)
}

export default Categories
