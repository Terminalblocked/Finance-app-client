import { instance } from 'api/axios.api'
import TransactionForm from 'components/TransactionForm'
import React from 'react'
import {
	ICategory,
	IResponseTransactionLoader,
	ITransaction,
} from 'types/types'
import { toast } from 'react-toastify'
import TransactionTable from 'components/TransactionTable'
import { useLoaderData } from 'react-router-dom'
import Chart from 'components/Chart'

export const transactionLoader = async () => {
	const categories = await instance.get<ICategory[]>('/categories')
	const transactions = await instance.get<ITransaction[]>('/transactions')
	const totalIncome = await instance.get<number>('/transactions/income/find')
	const totalExpense = await instance.get<number>('/transactions/expense/find')

	const data = {
		categories: categories.data,
		transactions: transactions.data,
		totalIncome: totalIncome.data,
		totalExpense: totalExpense.data,
	}
	return data
}

export const transactionAction = async ({ request }: any) => {
	switch (request.method) {
		case 'POST': {
			const formData = await request.formData()
			const newTransaction = {
				title: formData.get('title'),
				amount: +formData.get('amount'),
				category: formData.get('category'),
				type: formData.get('type'),
			}

			await instance.post('/transactions', newTransaction)
			toast.success('Transaction created.')
			return null
		}
		case 'DELETE': {
			const formData = await request.formData()
			const transactionId = formData.get('id')
			await instance.delete(`/transactions/transaction/${transactionId}`)
			toast.success('Transaction  removed.')
			return null
		}
	}
}

const Transactions: React.FC = () => {
	const { totalIncome, totalExpense, categories } =
		useLoaderData() as IResponseTransactionLoader

	return (
		<React.Fragment>
			<div className="grid grid-cols-2 gap-4 mt-4 items-start">
				{/* Add transaction form */}
				<div className="grid ">
					<TransactionForm />
				</div>

				{/* Statistic blocks */}
				<div className="flex flex-col items-center rounded-md max-w-[450px] bg-slate-800 p-3">
					<div className="grid grid-cols-2 gap-10">
						<div>
							<p className="uppercase text-md font-bold text-center">
								Total Income:
							</p>
							<p className="bg-green-600 p-1 rounded-md text-center mt-2">
								{totalIncome}$
							</p>
						</div>
						<div>
							<p className="uppercase text-md font-bold text-center">
								Total Expence:
							</p>
							<p className="bg-red-500 p-1 rounded-md text-center mt-2">
								{totalExpense}$
							</p>
						</div>
					</div>
					{categories.length > 0 && (
						<Chart totalIncome={totalIncome} totalExpense={totalExpense} />
					)}
				</div>
			</div>

			{/* Transactions table */}
			<div className="my-5">
				<TransactionTable limit={5} />
			</div>
		</React.Fragment>
	)
}

export default Transactions
