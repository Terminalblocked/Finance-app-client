import axios from 'axios'
import { getTokenFromLocalStorage } from 'helpers/localStorage.helper'

export const instance = axios.create({
	baseURL: import.meta.env.VITE_REACT_APP_API_URL,
})

instance.interceptors.request.use((config) => {
	const token = getTokenFromLocalStorage()
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})
