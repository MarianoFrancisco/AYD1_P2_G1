import { useEffect } from 'react'
import { decodeToken } from 'react-jwt'
import Cookies from 'js-cookie'
import DoctorNavBar from '../components/DoctorNavBar'


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
      <DoctorNavBar onLogout={onLogout} />
    </>
  )
}
