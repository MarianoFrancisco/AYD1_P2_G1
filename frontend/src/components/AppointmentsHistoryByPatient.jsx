import { useState, useEffect } from 'react'

export function AppointmentsHistoryByPatient({ userId }) {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const pendingResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/appointment/patient/pending?user_id=${userId}`)
        if (!pendingResponse.ok) {
          throw new Error('Failed to fetch pending appointments')
        }
        const pendingData = await pendingResponse.json()
        const pendingAppointments = pendingData.appointments.map(appointment => ({
          ...appointment,
          appointment_status: { id: 1, name: 'Pendiente' }
        }))

        const historyResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/appointment/patient?user_id=${userId}`)
        if (!historyResponse.ok) {
          throw new Error('Failed to fetch history appointments')
        }
        const historyData = await historyResponse.json()
        const historyAppointments = historyData.appointments.map(appointment => ({
          ...appointment,
          appointment_status: appointment.appointment_status
        }))

        setAppointments([...pendingAppointments, ...historyAppointments])
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
    <div className="container mx-auto mt-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-900 text-white uppercase">
            <tr>
              <th className="py-3 px-4 text-left">Fecha</th>
              <th className="py-3 px-4 text-left">Hora</th>
              <th className="py-3 px-4 text-left">Médico</th>
              <th className="py-3 px-4 text-left">Motivo</th>
              <th className="py-3 px-4 text-left">Estado</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr
                key={appointment.id}
                className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'} transition-colors`}
              >
                <td className="py-3 px-4 whitespace-nowrap">{appointment.date}</td>
                <td className="py-3 px-4">{`${appointment.available_time_slot.start_time} - ${appointment.available_time_slot.end_time}`}</td>
                <td className="py-3 px-4">{`${appointment.medic?.first_name} ${appointment.medic?.last_name}`}</td>
                <td className="py-3 px-4">{appointment.reason}</td>
                <td className="py-3 px-4">{appointment.appointment_status.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
