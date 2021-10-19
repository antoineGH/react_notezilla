import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import userLogingForm from '../forms/userLoginForm/UserLoginForm'
import userRegisterForm from '../forms/userRegisterForm/UserRegisterForm'

export default function UnAuthApp() {
	return (
		<>
			<Switch>
				<Route path='/login' component={userLogingForm} />
				<Route path='/register' component={userRegisterForm} />
				<Redirect from='*' to='/login' />
			</Switch>
		</>
	)
}
