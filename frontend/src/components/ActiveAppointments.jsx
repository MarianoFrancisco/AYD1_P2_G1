import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'

export function ActiveAppointments({ userId }) {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/appointment/patient/pending?user_id=${userId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const data = await response.json()
        setAppointments(data.appointments)
        setLoading(false)
        setError(false)
      } catch (error) {
        console.error('Error fetching appointments:', error)
        setLoading(false)
        setError(true)
      }
    }

    fetchAppointments()
  }, [userId])

  const cancelAppointment = async (appointmentId) => {
    // Confirmación usando SweetAlert2
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede revertir. ¿Quieres cancelar esta cita?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    })

    if (result.isConfirmed) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/appointment/patient/cancelled/${appointmentId}`, {
          method: 'PATCH'
        })
        if (!response.ok) {
          throw new Error('Failed to cancel appointment')
        }

        setAppointments(appointments.filter(appointment => appointment.id !== appointmentId))
        Swal.fire({
          icon: 'success',
          title: 'Cita cancelada',
          text: 'La cita ha sido cancelada exitosamente.'
        })
      } catch (error) {
        console.error('Error cancelling appointment:', error)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al cancelar la cita. Por favor, inténtelo nuevamente.'
        })
      }
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full" style={{ height: '85vh' }}>
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error || appointments.length === 0) {
    return (
      <div className="flex justify-center items-center h-full" style={{ height: '85vh' }}>
        <p className="text-xl text-gray-800">No hay citas activas disponibles</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto mt-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/12 py-2">Fecha</th>
              <th className="w-2/12 py-2">Hora</th>
              <th className="w-3/12 py-2">Médico</th>
              <th className="w-3/12 py-2">Clínica</th>
              <th className="w-3/12 py-2">Motivo</th>
              <th className="w-1/12 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="bg-white border-b border-gray-200">
                <td className="py-2 text-center">{appointment.date}</td>
                <td className="py-2 text-center">{`${appointment.available_time_slot.start_time} - ${appointment.available_time_slot.end_time}`}</td>
                <td className="py-2">
                  <div className="flex items-center">
                    <img
                      src={`${import.meta.env.VITE_API_URL}/photo/${appointment.medic.photo}`}
                      alt={`${appointment.medic.first_name} ${appointment.medic.last_name}`}
                      className="w-10 h-10 rounded-full mr-4"
                    />
                    <div>
                      <p>{`${appointment.medic.first_name} ${appointment.medic.last_name}`}</p>
                      <p className="text-sm text-gray-600">{appointment.medic.email}</p>
                      <p className="text-sm text-gray-600">{appointment.medic.additionalAttribute.specialty.name}</p>
                    </div>
                  </div>
                </td>
                <td className="py-2">{appointment.medic.additionalAttribute.clinicAddress}</td>
                <td className="py-2">{appointment.reason}</td>
                <td className="py-2">
                  <button
                    onClick={() => cancelAppointment(appointment.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                    style={{ fontWeight: 'bold', marginRight: '10px' }}
                  >
                    Cancelar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
