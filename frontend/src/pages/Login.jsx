import React, { useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import Swal from 'sweetalert2'

export function Login({ onLogin }) {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    const formData = new FormData(event.target)
    const formDataObject = Object.fromEntries(formData.entries())

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataObject),
    })
    const json = await response.json()
    setLoading(false)

    if (!json.token) {
      Swal.fire({
        icon: 'error',
        title: 'Error al iniciar sesión',
        text: json.message || json.error,
      })
      return
    }
    onLogin(json.token)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="sm:w-full sm:max-w-md bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=black" alt="Your Company" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Iniciar sesión en MediCare</h2>

        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 text-left">Dirección de correo electrónico</label>
            <div className="mt-2">
              <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
            </div>
            <div className="mt-2">
              <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${loading ? 'bg-gray-500' : 'bg-gray-800 hover:bg-gray-700 focus-visible:outline-gray-800'}`}
              disabled={loading}
            >
              {loading ? <FaSpinner className="animate-spin h-5 w-5 mr-3" /> : 'Iniciar sesión'}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          ¿Nuevo en MediCare?
          <a href="#" className="font-semibold leading-6 text-black hover:text-gray-700 ml-1">Regístrate aquí</a>
        </p>
      </div>
    </div>
  )
}
