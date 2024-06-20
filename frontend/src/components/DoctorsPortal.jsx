import React, { useState, useEffect } from 'react'

export function DoctorsPortal({ user_id }) {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/medic/patient?user_id=${user_id}`)
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

    if (user_id) {
      fetchDoctors()
    }
  }, [user_id])

  const handleScheduleAppointment = (medicId) => {
    // Implementa la lógica para programar una cita con el médico específico
    console.log(`Programando cita con el médico ${medicId}`)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen" style={{ height: '90vh' }}>
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col items-center" style={{ height: '90vh' }}>
      {doctors.length > 0 ? (
        <div className="container mx-auto px-4 py-8">
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
                    <h2 className="text-lg font-semibold mb-1" style={{ fontWeight: '700' }}>{`${doctor.first_name} ${doctor.last_name}`}</h2>
                    <div className="bg-gray-50 rounded-lg p-3 shadow-inner">
                      <p className="text-gray-600 text-sm mb-1"><strong>Especialidad:</strong> {doctor.additionalAttribute.specialty.name}</p>
                      <p className="text-gray-600 text-sm"><strong>Dirección clínica:</strong> {doctor.additionalAttribute.clinicAddress}</p>
                    </div>
                  </div>
                  <div className="flex justify-center mt-3">
                    <button
                      onClick={() => handleScheduleAppointment(doctor.id)}
                      className="bg-gray-700 text-white rounded-md py-2 px-4 text-sm font-medium hover:bg-gray-600"
                      style={{
                        borderRadius: '0.375rem',
                        padding: '0.5rem 1rem',
                        fontSize: '0.875rem', // Tamaño ligeramente más pequeño que el original
                        fontWeight: '500',
                        transition: 'background-color 0.3s ease-in-out, transform 0.3s ease-in-out',
                        margin: '0.1rem', // Ajuste mínimo al margen
                      }}
                    >
                      Programar cita
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-grow items-center justify-center" style={{ height: '90vh' }}>
          <div className="text-center">
            <p className="text-gray-600 text-lg mb-4">No hay médicos disponibles para mostrar.</p>
          </div>
        </div>
      )}
    </div>
  )
}