import React, { useState, useEffect } from 'react';

const AppointmentsHistoryTable = ({userId}) => {
    const [appointments, setAppointments] = useState([]);
    


    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/appointment/medic?user_id=${userId}`);
                console.log(`${import.meta.env.VITE_API_URL}/api/appointment/medic?user_id=${userId}`);
                const data = await response.json();
                setAppointments(data.appointments);
                console.log(data.appointments);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchAppointments();
    }, [userId]);

    return (
        <div className="container mx-auto p-4">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="w-1/12 py-2">ID</th>
                        <th className="w-2/12 py-2">Date</th>
                        <th className="w-3/12 py-2">Patient</th>
                        <th className="w-3/12 py-2">Medic</th>
                        <th className="w-1/12 py-2">Time Slot</th>
                        <th className="w-1/12 py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.id} className="border-b">
                            <td className="py-2 text-center">{appointment.id}</td>
                            <td className="py-2 text-center">{appointment.date}</td>
                            <td className="py-2">
                                <div className="flex items-center">
                                    <img src={`${import.meta.env.VITE_API_URL}/photo/${appointment.medic.photo}`} alt={appointment.patient.first_name} className="w-10 h-10 rounded-full mr-4" />
                                    <div>
                                        <p>{appointment.patient.first_name} {appointment.patient.last_name}</p>
                                        <p className="text-sm text-gray-600">{appointment.patient.email}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="py-2">
                                <div className="flex items-center">
                                    <img src={`${import.meta.env.VITE_API_URL}/photo/${appointment.medic.photo}`} alt={appointment.medic.first_name} className="w-10 h-10 rounded-full mr-4" />
                                    <div>
                                        <p>{appointment.medic.first_name} {appointment.medic.last_name}</p>
                                        <p className="text-sm text-gray-600">{appointment.medic.email}</p>
                                        <p className="text-sm text-gray-600">{appointment.medic.additionalAttribute.specialty.name}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="py-2 text-center">{appointment.available_time_slot.start_time} - {appointment.available_time_slot.end_time}</td>
                            <td className="py-2 text-center">{appointment.appointment_status.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AppointmentsHistoryTable;
