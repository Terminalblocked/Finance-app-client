import { useAuth } from 'hooks/useAuth'
import React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
	const isAuth = useAuth()
	return (
		<div className="flex mt-80 justify-center items-center">
			<div className="flex flex-col items-center gap-4 rounded-md border border-cyan-600 p-20 text-5xl">
				{isAuth ? (
					<h1 className="text-2xl">
						Welcome to the finance control application💸
					</h1>
				) : (
					<>
						<h1>Welcome dear user😊</h1>
						<h2 className="text-2xl">
							For use this application please 👉{' '}
							<Link className="hover:text-red-600" to={'auth'}>
								register.
							</Link>
						</h2>
					</>
				)}
			</div>
		</div>
	)
}

export default Home
