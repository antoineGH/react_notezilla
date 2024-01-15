import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Note from '../features/note/Note'
import User from '../features/user/User'
import NavbarComponent from '../components/navbarComponent/NavbarComponent'

export default function AuthApp(props) {
  const { runTour, setRunTour } = props

  return (
    <>
      <NavbarComponent />
      <Routes>
        <Route
          path="/note"
          element={<Note runTour={runTour} setRunTour={setRunTour} />}
        />
        <Route path="/user" element={<User />} />
        <Route
          path="*"
          element={<Note runTour={runTour} setRunTour={setRunTour} />}
        />
      </Routes>
    </>
  )
}
