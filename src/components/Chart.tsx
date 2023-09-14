import React from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts'

const COLORS = ['#0088FE', '#FF8042']

interface IChart {
	totalIncome: number
	totalExpense: number
}

interface IData {
	value: number
	name: string
}

const Chart: React.FC<IChart> = ({ totalIncome, totalExpense }) => {
	const data = Array<IData>(
		{ value: totalIncome, name: 'Income' },
		{ value: totalExpense, name: 'Expense' },
	)

	return (
		<PieChart width={343} height={343}>
			<Pie
				data={data}
				cx={'50%'}
				cy={'50%'}
				innerRadius={60}
				outerRadius={80}
				fill="#8884d8"
				paddingAngle={2}
				dataKey="value"
			>
				{data.map((_, index) => (
					<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
				))}
			</Pie>
			<Legend />
			<Tooltip />
		</PieChart>
	)
}

export default Chart
