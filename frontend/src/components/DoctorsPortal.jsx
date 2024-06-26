import React, { useState, useEffect } from 'react'
import { DoctorSchedules } from './DoctorSchedules'

export function DoctorsPortal({ userId }) {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [selectedDoctorId, setSelectedDoctorId] = useState(null)
  const [specialties, setSpecialties] = useState([])
  const [selectedSpecialty, setSelectedSpecialty] = useState('')

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/medic/patient?user_id=${userId}`)
        if (response.ok) {
          const data = await response.json()
          setDoctors(data.medics)
          const uniqueSpecialties = [...new Set(data.medics.map(doctor => doctor.additionalAttribute.specialty.name))]
          setSpecialties(uniqueSpecialties)
        } else {
          console.error('Error al obtener datos de médicos:', response.statusText)
        }
      } catch (error) {
        console.error('Error en la solicitud de médicos:', error)
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchDoctors()
    }
  }, [userId])

  const handleViewSchedule = (medicId) => {
    setSelectedComponent('DoctorSchedule')
    setSelectedDoctorId(medicId)
  }

  const handleSpecialtyChange = async (e) => {
    const specialty = e.target.value
    setSelectedSpecialty(specialty)
    setLoading(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/medic/patient/search?user_id=${userId}&specialty=${specialty}`)
      if (response.ok) {
        const data = await response.json()
        setDoctors(data.medics)
      } else {
        console.error('Error al obtener datos de médicos por especialidad:', response.statusText)
      }
    } catch (error) {
      console.error('Error en la solicitud de médicos por especialidad:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancelFilter = () => {
    setSelectedSpecialty('')
    setLoading(true)
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/medic/patient?user_id=${userId}`)
        if (response.ok) {
          const data = await response.json()
          setDoctors(data.medics)
        } else {
          console.error('Error al obtener datos de médicos:', response.statusText)
        }
      } catch (error) {
        console.error('Error en la solicitud de médicos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDoctors()
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen" style={{ height: '90vh' }}>
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (selectedComponent === 'DoctorSchedule') {
    return <DoctorSchedules userId={userId} doctorId={selectedDoctorId} />
  }

  return (
    <div className="h-screen flex flex-col items-center" style={{ height: '90vh' }}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4 flex justify-center">
          <select
            className="bg-white border border-gray-300 rounded-md py-2 px-3 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={selectedSpecialty}
            onChange={handleSpecialtyChange}
          >
            <option value="">Seleccionar especialidad</option>
            {specialties.map(specialty => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>
          {selectedSpecialty && (
            <button
              onClick={handleCancelFilter}
              className="ml-4 bg-red-500 text-white rounded-md py-2 px-4 text-sm font-medium hover:bg-red-600"
              style={{
                borderRadius: '0.375rem',
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'background-color 0.3s ease-in-out, transform 0.3s ease-in-out',
                margin: '0.1rem',
                marginLeft: '5px'
              }}
            >
              Cancelar
            </button>
          )}
        </div>
        {doctors.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl"
                style={{ transition: 'transform 0.3s ease-in-out' }}
              >
                <div className="p-4">
                  <div className="flex items-center justify-center mb-3">
                    <img
                      src={`${import.meta.env.VITE_API_URL}/photo/${doctor.photo}`}
                      alt={`Foto de ${doctor.first_name} ${doctor.last_name}`}
                      className="rounded-full w-24 h-24 object-cover shadow-md"
                      style={{
                        borderRadius: '9999px',
                        width: '6rem',
                        height: '6rem',
                        objectFit: 'cover',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)'
                      }}
                    />
                  </div>
                  <div className="text-center mb-3">
                    <h2 className="text-lg font-semibold mb-1" style={{ fontWeight: '700' }}>
                      {doctor.gender.name === 'Hombre' ? 'Dr.' : 'Dra.'} {`${doctor.first_name} ${doctor.last_name}`}
                    </h2>
                    <div className="bg-gray-50 rounded-lg p-3 shadow-inner">
                      <p className="text-gray-600 text-sm mb-1"><strong>Especialidad:</strong> {doctor.additionalAttribute.specialty.name}</p>
                      <p className="text-gray-600 text-sm"><strong>Dirección clínica:</strong> {doctor.additionalAttribute.clinicAddress}</p>
                    </div>
                  </div>
                  <div className="flex justify-center mt-3 space-x-4">
                    <button
                      onClick={() => handleViewSchedule(doctor.id)}
                      className="bg-blue-500 text-white rounded-md py-2 px-4 text-sm font-medium hover:bg-blue-600 flex items-center"
                      style={{
                        borderRadius: '0.375rem',
                        padding: '0.5rem 1rem',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        transition: 'background-color 0.3s ease-in-out, transform 0.3s ease-in-out',
                        margin: '0.1rem',
                      }}
                    >
                      <i className="fas fa-calendar-alt mr-2"></i>Horarios de atención
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-grow items-center justify-center" style={{ height: '90vh' }}>
            <div className="text-center">
              <p className="text-gray-600 text-lg mb-4">No hay médicos disponibles para mostrar</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
