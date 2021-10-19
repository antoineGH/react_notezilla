import React, { useEffect } from 'react'
import { useAuth } from './utils/authHook'
import { useSelector, useDispatch } from 'react-redux'
import { loadUser, selectUser } from './features/user/userSlice'
import { BrowserRouter, Switch } from 'react-router-dom'
import SiderComponent from './components/siderComponent/SiderComponent'
import NavbarComponent from './components/navbarComponent/NavbarComponent'
import AuthApp from './layouts/AuthApp'
import UnAuthApp from './layouts/UnAuthApp'
import FooterComponent from './components/footerComponent/FooterComponent'
import { Layout } from 'antd'
import './App.css'

function App() {
	const [logged] = useAuth()
	const { Content } = Layout

	const dispatch = useDispatch()
	useEffect(() => {
		if (logged) {
			dispatch(loadUser())
		}
	}, [dispatch, logged])

	const user = useSelector(selectUser)

	return (
		<div className='App'>
			<BrowserRouter>
				<Layout>
					<SiderComponent />
					<Layout>
						{logged ? (
							<NavbarComponent logged={true} user={user} />
						) : (
							<NavbarComponent logged={false} user='' />
						)}
						<Content>
							<div className='div-content'>
								<Switch>
									{logged ? <AuthApp /> : <UnAuthApp />}
								</Switch>
							</div>
						</Content>
						<FooterComponent />
					</Layout>
				</Layout>
			</BrowserRouter>
		</div>
	)
}

export default App
