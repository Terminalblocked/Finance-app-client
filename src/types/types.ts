export interface IUser {
	id: number
	email: string
	token: string
}

export interface IUserData {
	email: string
	password: string
}

export interface ITransaction {
	amount: number
	createdAt: string
	updatedAt: string
	id: number
	title: string
	type: string
	category: ICategory
}

export interface IResponseUser {
	email: string
	id: number
	createdAt: string
	updatedAt: string
}

export interface IResponseUserData {
	token: string
	user: IResponseUser
}

export interface ICategory {
	title: string
	id: number
	createdAt: string
	updatedAt: string
	transaction?: []
}

export interface IResponseTransactionLoader {
	categories: ICategory[]
	transactions: ITransaction[]
	totalIncome: number
	totalExpense: number
}
