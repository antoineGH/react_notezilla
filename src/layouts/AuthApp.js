import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import Note from '../features/note/Note'
import User from '../features/user/User'

export default function AuthApp() {
	return (
		<>
			<Switch>
				<Route path='/note' component={Note} />
				<Route path='/user' component={User} />
				<Redirect from='*' to='/note' />
			</Switch>
		</>
	)
}
