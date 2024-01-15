import React from 'react'
import { Routes, Route } from 'react-router'
import UserLoginForm from '../forms/userLoginForm/UserLoginForm'
import UserRegisterForm from '../forms/userRegisterForm/UserRegisterForm'

export default function UnAuthApp() {
  return (
    <Routes>
      <Route path="/login" element={<UserLoginForm />} />
      <Route path="/register" element={<UserRegisterForm />} />
      <Route path="*" element={<UserLoginForm />} />
    </Routes>
  )
}
