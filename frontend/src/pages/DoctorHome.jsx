import { useEffect } from 'react'
import { decodeToken } from 'react-jwt'
import Cookies from 'js-cookie'

export function DoctorHome({ onLogout }) {
  useEffect(() => {
    document.title = 'Doctor Home | MediCare'
  })

  const getUserData = () => {
    const token = Cookies.get('token')

    if (token) {
      const decodedUser = decodeToken(token)
      return decodedUser
    } else {
      console.log('No se encontró ningún token en las cookies.')
    }
  }

  return (
    <>
      <h1>DoctortHome</h1>
      <p>{JSON.stringify(getUserData())}</p>
      <button type='button' onClick={onLogout}>Cerrar sesión</button>
    </>
  )
}
