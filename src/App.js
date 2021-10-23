import React, { useEffect } from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import { useAuth } from './utils/authHook'
import { useDispatch } from 'react-redux'
import { loadUser } from './features/user/userSlice'
import { loadNotes } from './features/note/NoteSlice'
import SiderComponent from './components/siderComponent/SiderComponent'
import AuthApp from './layouts/AuthApp'
import UnAuthApp from './layouts/UnAuthApp'
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
					<SiderComponent logged={logged} />
					<Layout>
						<Content>
							<div className='div-content'>
								<Switch>
									{logged ? <AuthApp /> : <UnAuthApp />}
								</Switch>
							</div>
						</Content>
					</Layout>
				</Layout>
			</BrowserRouter>
		</div>
	)
}

export default App
