import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaLandmark, FaSignOutAlt } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { useAuth } from 'hooks/useAuth'
import { useAppDispatch } from 'store/hooks'
import { logout } from 'store/user/userSlice'
import { removeTokenFromLocalStorage } from 'helpers/localStorage.helper'
import { toast } from 'react-toastify'

const Header: React.FC = () => {
	const isAuth = useAuth()
	const location = useLocation()
	const checkAuthRoute = location.pathname !== '/auth'
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const logoutHandler = () => {
		dispatch(logout())
		removeTokenFromLocalStorage('token')
		navigate('/')
		toast.success('You are successfully logged out.')
	}

	return (
		<header className="flex items-center  px-4 py-4 shadow-sm bg-slate-800 backdrop-blur-sm">
			<Link to={'/'} className="ml-10">
				<FaLandmark size={40} />
			</Link>

			{/* Menu */}
			{isAuth && (
				<nav className="ml-auto mr-10">
					<ul className="flex items-center gap-5">
						<NavLink
							to={'/'}
							className={({ isActive }) =>
								isActive ? 'text-white' : 'text-white/50'
							}
						>
							Home
						</NavLink>
						<NavLink
							to={'/transactions'}
							className={({ isActive }) =>
								isActive ? 'text-white' : 'text-white/50'
							}
						>
							Transactions
						</NavLink>
						<NavLink
							to={'/categories'}
							className={({ isActive }) =>
								isActive ? 'text-white' : 'text-white/50'
							}
						>
							Categories
						</NavLink>
					</ul>
				</nav>
			)}

			{/* Actions */}
			{isAuth && (
				<button onClick={logoutHandler} className="btn btn-red">
					<span>Log Out</span>
					<FaSignOutAlt />
				</button>
			)}
			{checkAuthRoute && isAuth === false && (
				<Link to={'auth'} className="ml-auto mr-10">
					<button className="btn btn-green">
						<span>Login / Register</span>
					</button>
				</Link>
			)}
		</header>
	)
}

export default Header
