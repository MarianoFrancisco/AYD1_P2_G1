import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'

export function PatientProfileEditor({ user, setUser }) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    gender_id: '',
    email: '',
    birth_date: '',
    password: '',
    photo: null
  })

  const [showPassword, setShowPassword] = useState(false)
  const [previewPhoto, setPreviewPhoto] = useState(null) // Estado para la vista previa de la foto
  const [loading, setLoading] = useState(false) // Estado para controlar el estado de carga del botón

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        gender_id: user.gender ? user.gender.id.toString() : '',
        email: user.email || '',
        birth_date: user.birth_date || '',
        password: '',
        photo: null
      })

      // Establecer la vista previa de la foto actual del usuario
      if (user.photo) {
        setPreviewPhoto(`${import.meta.env.VITE_API_URL}/photo/${user.photo}`)
      } else {
        setPreviewPhoto(null) // Si no hay foto, limpiar la vista previa
      }
    }
  }, [user])

  const showSweetAlert = (title, message, icon) => {
    Swal.fire({
      title,
      text: message,
      icon,
      confirmButtonText: 'OK'
    })
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target

    if (type === 'radio' && name === 'gender_id') {
      setFormData({ ...formData, [name]: value })
    } else if (type === 'file' && name === 'photo') {
      // Actualizar vista previa de la foto al seleccionar un nuevo archivo
      setFormData({ ...formData, [name]: files[0] })
      setPreviewPhoto(URL.createObjectURL(files[0]))
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()

    setLoading(true) // Activar el estado de carga

    const formDataToSend = new FormData()
    formDataToSend.append('first_name', formData.first_name)
    formDataToSend.append('last_name', formData.last_name)
    formDataToSend.append('gender_id', formData.gender_id)
    formDataToSend.append('birth_date', formData.birth_date)
    if (formData.password) {
      formDataToSend.append('password', formData.password)
    }
    if (formData.photo) {
      formDataToSend.append('photo', formData.photo)
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/${user.id}`, {
        method: 'PUT',
        body: formDataToSend
      })

      if (!response.ok) {
        throw new Error('Error al guardar los cambios')
      }

      const { password, id, ...updatedUser } = await response.json()
      const modifiedUser = { ...updatedUser, id }
      setUser(modifiedUser.user)

      showSweetAlert('Operación completada', 'Los cambios se guardaron correctamente.', 'success')
    } catch (error) {
      showSweetAlert('Error', error.message, 'error')
    } finally {
      setLoading(false) // Desactivar el estado de carga una vez finalizada la petición
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-4 rounded-lg shadow-md max-w-lg w-full mt-4 mb-4">
        <h2 className="text-3xl font-bold mb-4 text-center">Editar Perfil</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-2">
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Género</label>
            <div className="flex items-center">
              <label className="mr-4">
                <input
                  type="radio"
                  name="gender_id"
                  value="1"
                  checked={formData.gender_id === '1'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Masculino
              </label>
              <label>
                <input
                  type="radio"
                  name="gender_id"
                  value="2"
                  checked={formData.gender_id === '2'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Femenino
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Dirección de correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-200 cursor-not-allowed"
              required
              readOnly
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 flex justify-between items-center">
              Contraseña (Opcional) <span className="text-gray-500 text-xs"></span>
              <span onClick={togglePasswordVisibility} className="cursor-pointer">
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 15h4" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9h.01M9 12h.01M9 15h.01" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Ingrese una nueva contraseña"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="birth_date" className="block text-sm font-medium text-gray-700 mb-1">Fecha de nacimiento</label>
            <input
              type="date"
              id="birth_date"
              name="birth_date"
              value={formData.birth_date}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-200 cursor-not-allowed"
              required
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Foto de perfil actual</label>
            {previewPhoto ? (
              <img
                src={previewPhoto}
                alt="Current Profile"
                className="block rounded-md shadow-sm mb-2 border border-gray-300"
                style={{ maxWidth: '200px', maxHeight: '200px' }}
              />
            ) : user.photo ? (
              <img
                src={`${import.meta.env.VITE_API_URL}/photo/${user.photo}`}
                alt="Current Profile"
                className="block rounded-md shadow-sm mb-2 border border-gray-300"
                style={{ maxWidth: '200px', maxHeight: '200px' }}
              />
            ) : (
              <div className="text-gray-500">No hay foto de perfil</div>
            )}
            <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">Seleccionar nueva foto de perfil</label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className={`bg-gray-800 text-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
              style={{ width: '100%' }} // Añadir estilo inline para controlar el ancho
            >
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
