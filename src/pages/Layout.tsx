import Header from 'components/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout: React.FC = () => {
	return (
		<div className="wrapper min-h-screen bg-slate-900  font-openSans text-white">
			<Header />
			<div className="container">
				<Outlet />
			</div>
		</div>
	)
}

export default Layout
