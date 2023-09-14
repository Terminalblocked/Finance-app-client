import { useAuth } from 'hooks/useAuth'
import React from 'react'
import img from '../assets/protected.png'

interface Props {
	children: JSX.Element
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
	const isAuth = useAuth()
	return (
		<React.Fragment>
			{isAuth ? (
				children
			) : (
				<div className="flex flex-col justify-center items-center mt-20 gap-10">
					<h1 className="text-4xl">To view this page you must be logged in.</h1>

					<img className="w-1/2 pointer-events-none" src={img} alt="image" />
				</div>
			)}
		</React.Fragment>
	)
}

export default ProtectedRoute
