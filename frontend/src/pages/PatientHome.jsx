import React, { useState, useEffect, useRef } from 'react'
import Cookies from 'js-cookie'
import { decodeToken } from 'react-jwt'
import { DoctorsPortal } from '../components/DoctorsPortal'
import { ActiveAppointments } from '../components/ActiveAppointments'
import { PatientProfileEditor } from '../components/PatientProfileEditor'

export function PatientHome({ onLogout }) {
  const [selectedOption, setSelectedOption] = useState('Portal de médicos')
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const [hoverMediCare, setHoverMediCare] = useState(false)
  const [hoverMenu, setHoverMenu] = useState(false)
  const [user, setUser] = useState(null)

  const getUserData = () => {
    const token = Cookies.get('token')

    if (token) {
      const decodedUser = decodeToken(token)
      return decodedUser
    } else {
      console.log('No se encontró ningún token en las cookies.')
      return null
    }
  }

  useEffect(() => {
    const userData = getUserData()
    if (userData) {
      setUser(userData)
    }
  }, []) // Agrega [] para ejecutar solo una vez al montar el componente

  const handleOptionClick = (option) => {
    setSelectedOption(option)
    setMenuOpen(false)
    if (option === 'Cerrar sesión') {
      onLogout()
    }
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const handleMediCareHover = () => {
    if (!menuOpen) {
      setHoverMediCare(true)
    }
  }

  const handleMediCareLeave = () => {
    setHoverMediCare(false)
  }

  const handleMenuHover = () => {
    if (!menuOpen) {
      setHoverMenu(true)
    }
  }

  const handleMenuLeave = () => {
    setHoverMenu(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    document.title = 'Patient Home | MediCare';
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white text-black">
      <nav className="bg-gray-900 py-4 px-24 flex justify-between items-center text-white">
        <div
          className={`flex items-center space-x-4 ${hoverMediCare ? 'text-gray-400' : 'text-white'}`}
          onMouseEnter={handleMediCareHover}
          onMouseLeave={handleMediCareLeave}
        >
          <div className="text-xl font-bold mr-8 text-white">
            <a href="/patient-home" className="text-white">MediCare</a>
          </div>
          <button
            onClick={() => handleOptionClick('Portal de médicos')}
            className={`transition-colors ${selectedOption === 'Portal de médicos' ? 'text-white' : 'text-gray-400'}`}
          >
            Portal de médicos
          </button>
          <button
            onClick={() => handleOptionClick('Citas activas')}
            className={`transition-colors ${selectedOption === 'Citas activas' ? 'text-white' : 'text-gray-400'}`}
          >
            Citas activas
          </button>
        </div>
        <div className="relative" ref={menuRef} onMouseEnter={handleMenuHover} onMouseLeave={handleMenuLeave}>
          <button onClick={toggleMenu}>
            <span className={menuOpen || hoverMenu ? 'text-gray-400' : 'text-white'}>
              {user ? `${user.first_name} ${user.last_name}` : 'Nombre de usuario'} &#x25BE;
            </span>
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg" style={{ zIndex: 9999 }}>
              <button
                onClick={() => handleOptionClick('ProfileEditor')}
                className="block px-4 py-2 hover:bg-gray-700 w-full text-left text-white"
              >
                Editar perfil
              </button>
              <button
                onClick={() => handleOptionClick('Cerrar sesión')}
                className="block px-4 py-2 hover:bg-gray-700 w-full text-left text-white"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </nav>
      <main className="p-0">
        {selectedOption === 'Portal de médicos' && <DoctorsPortal userId={user ? user.id : null} {...setSelectedOption} />}
        {selectedOption === 'Citas activas' && <ActiveAppointments userId={user.id} />}
        {selectedOption === 'ProfileEditor' && <PatientProfileEditor user={user} setUser={setUser} />}
      </main>
    </div>
  )
}
