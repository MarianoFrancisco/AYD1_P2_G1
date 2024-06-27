/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
* Erick
*/
import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

const MedicSchedule = ({ userId }) => {
    const [schedule, setSchedule] = useState(null);
    const [medicInfo, setMedicInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/schedule/medic?medic_id=${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setSchedule(data.schedule);
                    if (data.schedule && data.schedule.message === "No schedule availability found for this medic") {
                        console.log("No se encontró disponibilidad de horarios para este médico.");
                        if (data.schedule.user) {
                            setMedicInfo(data.schedule.user);
                        }
                    }
                } else {
                    console.error('Error fetching doctor schedule:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching doctor schedule:', error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchSchedule();
        }
    }, [userId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (!schedule || schedule.message === "No schedule availability found for this medic") {
        if (medicInfo) {
            return (
                <div className="h-screen flex flex-col items-center">
                    <div className="container mx-auto px-4 py-8">
                        <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 w-full">
                            <div className="p-4">
                                <div className="flex items-center justify-center mb-3">
                                    <div className="w-32 h-32 overflow-hidden rounded-full shadow-md">
                                        <img
                                            src={`${import.meta.env.VITE_API_URL}/photo/${medicInfo.photo}`}
                                            alt={`Foto de ${medicInfo.first_name} ${medicInfo.last_name}`}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                </div>
                                <div className="text-center mb-3">
                                    <h2 className="text-lg font-semibold mb-1">{medicInfo.gender.name === 'Hombre' ? 'Dr.' : 'Dra.'} {`${medicInfo.first_name} ${medicInfo.last_name}`}</h2>
                                    <div className="bg-gray-50 rounded-lg p-3 shadow-inner">
                                        <p className="text-gray-600 text-sm mb-1"><strong>Especialidad:</strong> {medicInfo.additionalAttributeMedic.Specialty.name}</p>
                                        <p className="text-gray-600 text-sm"><strong>Dirección clínica:</strong> {medicInfo.additionalAttributeMedic.clinic_address}</p>
                                    </div>
                                </div>
                                <div className="mt-8 text-center">
                                    <h3 className="text-lg font-semibold mb-3">No se encontró disponibilidad de horarios para este médico.</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }

    const { medic, availability_weekdays, start_time, end_time } = schedule;

    return (
        <div className="h-screen flex flex-col items-center">
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 w-full">
                    <div className="p-4">
                        <div className="flex items-center justify-center mb-3">
                            <div className="w-32 h-32 overflow-hidden rounded-full shadow-md">
                                <img
                                    src={`${import.meta.env.VITE_API_URL}/photo/${medic.photo}`}
                                    alt={`Foto de ${medic.first_name} ${medic.last_name}`}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>
                        <div className="text-center mb-3">
                            <h2 className="text-lg font-semibold mb-1">{medic.gender.name === 'Hombre' ? 'Dr.' : 'Dra.'} {`${medic.first_name} ${medic.last_name}`}</h2>
                            <div className="bg-gray-50 rounded-lg p-3 shadow-inner">
                                <p className="text-gray-600 text-sm mb-1"><strong>Especialidad:</strong> {medic.additionalAttribute.specialty.name}</p>
                                <p className="text-gray-600 text-sm"><strong>Dirección clínica:</strong> {medic.additionalAttribute.clinicAddress}</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold mb-3">Horario de Atención</h3>
                            <div className="grid grid-cols-7 gap-2 text-center mb-4">
                                {availability_weekdays.map((day, index) => (
                                    <div key={index} className={`p-2 rounded-lg ${day.available ? 'bg-green-200 text-green-700' : 'bg-gray-200 text-gray-700'}`}>
                                        <p className="text-sm font-semibold">{day.weekday}</p>
                                        <p className="text-xs">{day.available ? `${start_time} - ${end_time}` : 'No disponible'}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MedicSchedule;
