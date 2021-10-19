import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import Todos from '../features/todos/Todos'
import User from '../features/user/User'

export default function AuthApp() {
	return (
		<>
			<Switch>
				<Route path='/todo' component={Todos} />
				<Route path='/user' component={User} />
				<Redirect from='*' to='/todo' />
			</Switch>
		</>
	)
}
