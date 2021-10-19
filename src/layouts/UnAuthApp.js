import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import LoginForm from '../components/loginForm/LoginForm'
import RegisterForm from '../components/registerForm/RegisterForm'

export default function UnAuthApp() {
	return (
		<>
			<Switch>
				<Route path='/login' component={LoginForm} />
				<Route path='/register' component={RegisterForm} />
				<Redirect from='*' to='/login' />
			</Switch>
		</>
	)
}
