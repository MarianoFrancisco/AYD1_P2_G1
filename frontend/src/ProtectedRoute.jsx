import React from 'react'
import { Navigate } from 'react-router-dom'
import { decodeToken } from 'react-jwt'
import Cookies from 'js-cookie'

export function ProtectedRoute({ isLoggedIn, children, type }) {
  const getUserRole = () => {
    const token = Cookies.get('token')

    if (token) {
      const decodedUser = decodeToken(token)
      return decodedUser.role.id
    } else {
      console.log('No se encontró ningún token en las cookies.')
    }
  }

  if (type === 1 || type === 2) {
    if (isLoggedIn !== '') {
      return <>{children}</>
    }
    return <Navigate to='/login' />
  }

  if (isLoggedIn === '') {
    return <>{children}</>
  }

  if (getUserRole() === 1) {
    return <Navigate to='/patient-home' />
  }

  if (getUserRole() === 2) {
    return <Navigate to='/doctor-home' />
  }
}
