import React from 'react'
import img from '../assets/errorpage.png'
import { Link } from 'react-router-dom'

const ErrorPage: React.FC = () => {
	return (
		<div className="flex min-h-screen bg-slate-900 flex-col items-center justify-center gap-10 text-white">
			<img src={img} alt="image" className="w-90" />
			<Link
				to={'/'}
				className="bg-sky-600 rounded-md px-10 py-2 hover:bg-sky-700"
			>
				Go Back
			</Link>
		</div>
	)
}

export default ErrorPage
