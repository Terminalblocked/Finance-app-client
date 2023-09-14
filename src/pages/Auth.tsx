import { setTokenToLocalStorage } from 'helpers/localStorage.helper'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthService } from 'services/auth.service'
import { useAppDispatch } from 'store/hooks'
import { login } from 'store/user/userSlice'

const Auth: React.FC = () => {
	const [email, setEmail] = React.useState<string>('')
	const [password, setPassword] = React.useState<string>('')
	const [isLogin, setIsLogin] = React.useState<boolean>(false)

	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const registerHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			const data = await AuthService.registration({ email, password })
			if (data) {
				toast.success('You are successfully registrated.')
				setIsLogin(!isLogin)
			}
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error.toString())
		}
	}

	const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			const data = await AuthService.login({ email, password })

			if (data) {
				setTokenToLocalStorage('token', data.token)
				dispatch(login(data))
				toast.success('You are successfully logged in.')
				navigate('/')
			}
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error.toString())
		}
	}

	return (
		<div className="mt-60 flex flex-col items-center justify-center bg-slate-900 text-white">
			<h1 className="mb-10 text-center text-3xl">
				{isLogin ? 'Login' : 'Registration'}
			</h1>
			<form
				onSubmit={isLogin ? loginHandler : registerHandler}
				className="flex w-1/3 flex-col mx-auto gap-5"
			>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					className="input"
					placeholder="Email"
				/>
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					className="input"
					placeholder="Password"
				/>
				<button className="btn btn-green mx-auto">Submit</button>
			</form>
			<div className="flex justify-center mt-5">
				{isLogin ? (
					<button
						onClick={() => setIsLogin(!isLogin)}
						className="text-slate-300 hover:text-white"
					>
						Don't have an account?
					</button>
				) : (
					<button
						onClick={() => setIsLogin(!isLogin)}
						className="text-slate-300 hover:text-white"
					>
						Already registered?
					</button>
				)}
			</div>
		</div>
	)
}

export default Auth
