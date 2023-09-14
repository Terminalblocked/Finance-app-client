import { instance } from 'api/axios.api'
import { convertDate } from 'helpers/date.helper'
import React from 'react'
import { FaTrash } from 'react-icons/fa'
import ReactPaginate from 'react-paginate'
import { Form, useLoaderData } from 'react-router-dom'
import { IResponseTransactionLoader, ITransaction } from 'types/types'

interface ITransactionTable {
	limit: number
}

const TransactionTable: React.FC<ITransactionTable> = ({ limit = 5 }) => {
	const { transactions } = useLoaderData() as IResponseTransactionLoader

	const [data, setData] = React.useState<ITransaction[]>([])
	const [currentPage, setCurrentPage] = React.useState<number>(1)
	const [totalPages, setTotalPages] = React.useState<number>(0)

	const handleChangePage = (selectedItem: { selected: number }) => {
		setCurrentPage(selectedItem.selected + 1)
	}

	const fetchTransactions = async (page: number) => {
		const response = await instance.get(
			`/transactions/pagination?page=${page}&limit=${limit}`,
		)
		setData(response.data)
		setTotalPages(Math.ceil(transactions.length / limit))
	}

	React.useEffect(() => {
		fetchTransactions(currentPage)
	}, [currentPage, transactions])

	return (
		<React.Fragment>
			<ReactPaginate
				className="flex gap-3 pg-3 justify-end mt-4 items-center"
				activeClassName="bg-blue-600 rounded-md"
				pageLinkClassName="text-white text-xs py-1 px-2 rounded-md"
				previousClassName="text-white py-1 px-2 bg-slate-800 rounded-md text-xl"
				nextClassName="text-white py-1 px-2 bg-slate-800 rounded-md text-xl"
				disabledClassName="text-white/50 cursor-not-allowed"
				disabledLinkClassName="text-slate-600 cursor-not-allowed"
				pageCount={totalPages}
				pageRangeDisplayed={1}
				marginPagesDisplayed={2}
				onPageChange={handleChangePage}
			/>

			<div className="bg-slate-800 px-4 py-3 mt-4 rounded-md">
				<table className="w-full">
					<thead>
						<tr>
							<td className="font-bold text-white">№</td>
							<td className="font-bold text-white">Title</td>
							<td className="font-bold text-white">Amount($)</td>
							<td className="font-bold text-white">Category</td>
							<td className="font-bold text-white">Date</td>
							<td className="font-bold text-white text-right">Action</td>
						</tr>
					</thead>
					<tbody>
						{data?.map((transaction, idx) => (
							<tr key={idx + 1}>
								<td>{idx + 1}</td>
								<td>{transaction.title}</td>
								<td
									className={
										transaction.type === 'income'
											? 'text-green-500'
											: 'text-red-600'
									}
								>
									{transaction.type === 'income' ? '+ ' : '- '}
									{transaction.amount}
								</td>
								<td>{transaction.category?.title || 'other'}</td>
								<td>{convertDate(transaction.createdAt, 'd/m/y')}</td>
								<td>
									<Form method="delete" action="/transactions">
										<input type="hidden" name="id" value={transaction.id} />
										<button className="btn hover:btn-red ml-auto">
											<FaTrash />
										</button>
									</Form>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</React.Fragment>
	)
}

export default TransactionTable
