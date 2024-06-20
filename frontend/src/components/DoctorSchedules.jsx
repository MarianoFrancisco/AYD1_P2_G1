import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Swal from 'sweetalert2';

export function DoctorSchedules({ userId, doctorId }) {
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredSchedules, setFilteredSchedules] = useState(null);
  const [loadingSchedules, setLoadingSchedules] = useState(false);
  const [searchDisabled, setSearchDisabled] = useState(true); // Controla el botón de buscar
  const [medicInfo, setMedicInfo] = useState(null);
  const [appointmentFormVisible, setAppointmentFormVisible] = useState(false);
  const [appointmentReason, setAppointmentReason] = useState('');
  const [scheduleDisabled, setScheduleDisabled] = useState(true); // Controla el botón de programar cita
  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState('');

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/schedule/medic?medic_id=${doctorId}`);
        if (response.ok) {
          const data = await response.json();
          setSchedule(data.schedule);
        } else {
          console.error('Error fetching doctor schedule:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching doctor schedule:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchMedicInfo = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/medic/patient?user_id=${userId}`);
        if (response.ok) {
          const data = await response.json();
          const medic = data.medics.find(m => m.id === doctorId);
          if (medic) {
            setMedicInfo(medic);
          } else {
            console.error(`No information found for doctor with ID ${doctorId}`);
          }
        } else {
          console.error('Error fetching patient doctors list:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching patient doctors list:', error);
      }
    };

    if (doctorId) {
      fetchSchedule();
      fetchMedicInfo();
    }
  }, [userId, doctorId]);

  useEffect(() => {
    setSearchDisabled(!selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    setScheduleDisabled(!appointmentReason);
  }, [appointmentReason]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFilteredSchedules(null);
  };

  const handleSearch = async () => {
    try {
      if (selectedDate) {
        setLoadingSchedules(true);
        const formattedDate = formatDate(selectedDate);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/schedule/date?medic_id=${doctorId}&date=${formattedDate}`);
        if (response.ok) {
          const data = await response.json();
          setFilteredSchedules(data.availableSchedules);
          // Scroll hacia abajo al cargar los horarios
          setTimeout(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
          }, 100); // Retraso para asegurar que el DOM se actualice correctamente
        } else {
          console.error('Error fetching available schedules for date:', response.statusText);
          setFilteredSchedules([]);
        }
      } else {
        console.error('No date selected.');
        setFilteredSchedules(null);
      }
    } catch (error) {
      console.error('Error fetching available schedules:', error);
      setFilteredSchedules(null);
    } finally {
      setLoadingSchedules(false);
    }
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  const getDayOfWeek = (date) => {
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return daysOfWeek[date.getDay()];
  };

  const toggleAppointmentForm = () => {
    setAppointmentFormVisible(!appointmentFormVisible);
    // Scroll hacia abajo al mostrar/ocultar el formulario de cita
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100); // Retraso para asegurar que el DOM se actualice correctamente
  };

  const handleAppointmentReasonChange = (event) => {
    setAppointmentReason(event.target.value);
  };

  const handleAppointmentSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = {
        date: formatDate(selectedDate),
        time_slot_id: document.getElementById('horaCita').value,
        reason: appointmentReason,
        patient_id: userId,
        medic_id: doctorId
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/appointment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Cita programada con éxito',
          text: '¡La cita se ha programado correctamente!',
          confirmButtonText: 'OK',
          didClose: () => {
            window.history.go(-2); // Retrocede 2 páginas al cerrar la alerta
          }
        });
      } else {
        const data = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Error al programar cita',
          text: data.message || 'Hubo un problema al intentar programar la cita.',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Error al programar cita:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error inesperado al intentar programar la cita.',
        confirmButtonText: 'OK',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!schedule || schedule.message) {
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
                    <p className="text-gray-600 text-sm mb-1"><strong>Especialidad:</strong> {medicInfo.additionalAttribute.specialty.name}</p>
                    <p className="text-gray-600 text-sm"><strong>Dirección clínica:</strong> {medicInfo.additionalAttribute.clinicAddress}</p>
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
              <h3 className="text-lg font-semibold mb-3 mt-8">Buscar Disponibilidad por Fecha</h3>
              <div className="flex items-center mb-4">
                <div className="relative">
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    minDate={new Date()}
                    dateFormat="dd/MM/yyyy"
                    className="border border-gray-300 p-2 pl-8 pr-4"
                    placeholderText="Selecciona una fecha"
                  />
                  <FaCalendarAlt className="absolute top-3 left-3 text-gray-400" />
                </div>
                <button
                  onClick={handleSearch}
                  disabled={searchDisabled}
                  className={`ml-2 bg-blue-500 text-white rounded-md py-2 px-4 text-sm font-medium hover:bg-blue-400 ${searchDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Buscar
                </button>
              </div>
              {loadingSchedules && (
                <div className="flex justify-center items-center mt-4">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
                  <p className="ml-2">Buscando disponibilidad...</p>
                </div>
              )}
              {filteredSchedules !== null && filteredSchedules.length > 0 && !loadingSchedules && (
                <div className="mt-4">
                  <p className="text-lg font-semibold mb-2" style={{ marginTop: '2rem' }}>Horarios para {getDayOfWeek(selectedDate)}, {selectedDate.toLocaleDateString('es-ES')}</p>
                  <div className="flex items-center mb-4">
                    <div className="rounded-full h-6 w-6 bg-green-200 mr-2 mt-1"></div>
                    <span className="text-sm">Disponible</span>
                    <div className="rounded-full h-6 w-6 bg-gray-200 ml-4 mr-2 mt-1"></div>
                    <span className="text-sm">No Disponible</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {filteredSchedules.map((schedule) => (
                      <div
                        key={schedule.id}
                        className={`p-2 rounded-lg ${schedule.available === 1 ? 'bg-green-200 text-green-700 text-center' : 'bg-gray-200 text-gray-700 text-center'}`}
                      >
                        <p className="text-sm font-semibold">{schedule.start_time} - {schedule.end_time}</p>
                      </div>
                    ))}
                  </div>

                  {/* Formulario de programación de cita */}
                  <div className={`mt-4 ${appointmentFormVisible ? 'block' : 'hidden'}`}>
                    <p className="text-lg font-semibold mb-2" style={{ marginTop: '2rem' }}>Programar una cita</p>
                    <form onSubmit={handleAppointmentSubmit}>
                      <div className="flex mb-4">
                        <div className="w-1/3">
                          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fechaCita">Fecha de la cita</label>
                          <input
                            type="text"
                            id="fechaCita"
                            name="date" // Nombre del campo para la fecha
                            className="border border-gray-300 p-2 w-full"
                            value={selectedDate.toLocaleDateString('es-ES')} // Formato DD/MM/YYYY
                            readOnly
                          />
                        </div>
                        <div className="w-1/3 pl-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="horaCita">Hora de la cita</label>
                          <select
                            id="horaCita"
                            name="time_slot_id" // Nombre del campo para el id del slot de tiempo seleccionado
                            className="border border-gray-300 p-2 w-full"
                            onChange={(e) => setSelectedTimeSlotId(e.target.value)} // Guarda el id seleccionado
                            // value={selectedTimeSlotId}
                            required
                          >
                            {filteredSchedules
                              .filter((schedule) => schedule.available === 1) // Filtra solo los horarios disponibles
                              .map((schedule) => (
                                <option key={schedule.id} value={schedule.id}>
                                  {schedule.start_time} - {schedule.end_time}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div className="w-1/3 pl-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="motivoCita">Motivo de la cita</label>
                          <input
                            type="text"
                            id="motivoCita"
                            name="reason" // Nombre del campo para el motivo de la cita
                            className="border border-gray-300 p-2 w-full"
                            value={appointmentReason}
                            onChange={handleAppointmentReasonChange}
                            required
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className={`bg-blue-500 text-white rounded-md py-2 px-4 text-sm font-medium hover:bg-blue-400 ${scheduleDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={scheduleDisabled}
                      >
                        Programar cita
                      </button>
                    </form>
                  </div>
                  {/* Opción para mostrar/ocultar el formulario */}
                  <div className="mt-4">
                    <p
                      onClick={toggleAppointmentForm}
                      className="cursor-pointer text-gray-700 font-semibold flex items-center hover:text-gray-900"
                    >
                      {appointmentFormVisible ? (
                        <>
                          <FaChevronUp className="mr-2" /> Ocultar formulario
                        </>
                      ) : (
                        <>
                          <FaChevronDown className="mr-2" /> Programar una cita
                        </>
                      )}
                    </p>
                  </div>
                </div>
              )}
              {filteredSchedules !== null && filteredSchedules.length === 0 && !loadingSchedules && (
                <div className="mt-4 p-4 rounded-lg bg-gray-100 text-center">
                  <p className="text-lg font-semibold">No hay horarios disponibles para {getDayOfWeek(selectedDate)}, {selectedDate.toLocaleDateString('es-ES')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
