import React, { useEffect } from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import { useAuth } from './utils/authHook'
import { useSelector, useDispatch } from 'react-redux'
import { loadUser, selectUser } from './features/user/userSlice'
import { loadNotes } from './features/note/NoteSlice'
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
			dispatch(loadNotes())
		}
	}, [dispatch, logged])

	return (
		<div className='App'>
			<BrowserRouter>
				<Layout>
					<SiderComponent />
					<Layout>
						<NavbarComponent logged={logged} />
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
