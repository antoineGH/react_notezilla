import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import Note from '../features/note/Note'
import User from '../features/user/User'
import NavbarComponent from '../components/navbarComponent/NavbarComponent'

export default function AuthApp(props) {
  const { runTour, setRunTour } = props
  return (
    <>
      <NavbarComponent />
      <Switch>
        <Route
          path="/note"
          render={props => (
            <Note runTour={runTour} setRunTour={setRunTour} {...props} />
          )}
        />
        <Route path="/user" component={User} />
        <Redirect from="*" to="/note" />
      </Switch>
    </>
  )
}
