import React, { useState, useEffect } from 'react'

export function AppointmentsHistoryByPatient({ userId }) {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/appointment/patient?user_id=${userId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch appointments')
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
        <p className="text-xl text-gray-800">No hay citas disponibles</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-2/12 py-2">Fecha</th>
            <th className="w-2/12 py-2">Hora</th>
            <th className="w-3/12 py-2">Médico</th>
            <th className="w-3/12 py-2">Motivo</th>
            <th className="w-2/12 py-2">Estado</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => (
            <tr key={appointment.id} className="border-b">
              <td className="py-2 text-center">{appointment.date}</td>
              <td className="py-2 text-center">{`${appointment.available_time_slot.start_time} - ${appointment.available_time_slot.end_time}`}</td>
              <td className="py-2">
                <div className="flex items-center">
                  <img src={`${import.meta.env.VITE_API_URL}/photo/${appointment.medic.photo}`} alt={`${appointment.medic.first_name} ${appointment.medic.last_name}`} className="w-10 h-10 rounded-full mr-4" />
                  <div>
                    <p>{`${appointment.medic.first_name} ${appointment.medic.last_name}`}</p>
                    <p className="text-sm text-gray-600">{appointment.medic.email}</p>
                    <p className="text-sm text-gray-600">{appointment.medic.additionalAttribute.specialty.name}</p>
                  </div>
                </div>
              </td>
              <td className="py-2">{appointment.reason}</td>
              <td className="py-2 text-center">{appointment.appointment_status.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
