import { useState, useEffect } from 'react'

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full" style={{ height: '90vh' }}>
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error || appointments.length === 0) {
    return (
      <div className="flex justify-center items-center h-full" style={{ height: '90vh' }}>
        <p className="text-xl text-gray-800">No hay citas activas disponibles</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto mt-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-blue-500 text-white uppercase">
            <tr>
              <th className="py-3 px-4 text-left">Fecha de la cita</th>
              <th className="py-3 px-4 text-left">Hora</th>
              <th className="py-3 px-4 text-left">Médico</th>
              <th className="py-3 px-4 text-left">Clínica</th>
              <th className="py-3 px-4 text-left">Motivo</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr
                key={appointment.id}
                className={`${index % 2 === 0 ? 'bg-blue-50' : 'bg-blue-100'} transition-colors`}
              >
                <td className="py-4 px-4 whitespace-nowrap">{appointment.date}</td>
                <td className="py-4 px-4">{`${appointment.available_time_slot.start_time} - ${appointment.available_time_slot.end_time}`}</td>
                <td className="py-4 px-4">{`${appointment.medic?.first_name} ${appointment.medic?.last_name}`}</td>
                <td className="py-4 px-4">{appointment.medic?.additionalAttribute.clinicAddress}</td>
                <td className="py-4 px-4">{appointment.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
