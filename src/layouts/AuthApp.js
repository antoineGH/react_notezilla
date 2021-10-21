import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import Note from '../features/note/Note'
import User from '../features/user/User'
import NavbarComponent from '../components/navbarComponent/NavbarComponent'

export default function AuthApp() {
	return (
		<>
			<NavbarComponent />
			<Switch>
				<Route path='/note' component={Note} />
				<Route path='/user' component={User} />
				<Redirect from='*' to='/note' />
			</Switch>
		</>
	)
}
