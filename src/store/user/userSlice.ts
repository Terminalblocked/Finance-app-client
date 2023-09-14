import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { IUser } from 'types/types'

interface UserState {
	user: IUser | null
	isAuth: boolean
}

const initialState: UserState = {
	user: null,
	isAuth: false,
}

export const userSlice = createSlice({
	name: 'user',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		login(state, action: PayloadAction<IUser>) {
			state.user = action.payload
			state.isAuth = true
		},
		logout(state) {
			state.isAuth = false
			state.user = null
		},
	},
})

export const { login, logout } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
