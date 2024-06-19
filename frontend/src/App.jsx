import { useState, useEffect } from 'react'
import { ProtectedRoute } from './ProtectedRoute'
import { Login } from './pages/Login'
import { Registration } from './pages/Registration'
import { PatientHome } from './pages/PatientHome'
import { DoctorHome } from './pages/DoctorHome'
import Cookies from 'js-cookie'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState('')

  useEffect(() => {
    const token = Cookies.get('token');

    if (token && token !== isLoggedIn) {
      setIsLoggedIn(token)
    }
  }, )

  const handleLoginApp = (token) => {
    Cookies.set('token', token)
    setIsLoggedIn(token)
  }

  const handleLogoutApp = () => {
    Cookies.remove('token')
    setIsLoggedIn('')
  }

  return (
    <Router>
      <Routes>
        <Route
          path='/login'
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} type={0}>
              <Login onLogin={handleLoginApp} />
            </ProtectedRoute>
          }
        />
        <Route
          path='/patient-home'
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} type={1}>
              <PatientHome onLogout={handleLogoutApp} />
            </ProtectedRoute>
          }
        />
        <Route
          path='/doctor-home'
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} type={2}>
              <DoctorHome onLogout={handleLogoutApp} />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} type={3}>
              <Registration />
            </ProtectedRoute>
          } />
        <Route
          path='/'
          element={<Navigate to='/login' />}
        />
      </Routes>
    </Router>
  )
}

export default App
