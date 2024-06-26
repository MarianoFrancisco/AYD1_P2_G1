import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { decodeToken } from 'react-jwt';
import Swal from 'sweetalert2';

const HorarioMedico = () => {
  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const horas = Array.from({ length: 24 }, (_, i) => i);

  const getUserData = () => {
    const token = Cookies.get('token');
    if (token) {
      const decodedUser = decodeToken(token);
      return decodedUser;
    } else {
      console.log('No se encontró ningún token en las cookies.');
      return null;
    }
  };

  const [diasSeleccionados, setDiasSeleccionados] = useState(
      diasSemana.reduce((acc, dia) => {
        acc[dia] = 0;
        return acc;
      }, {})
  );
  const [horaInicio, setHoraInicio] = useState(0);
  const [horaFin, setHoraFin] = useState(0);

  const handleDiaChange = (dia) => {
    setDiasSeleccionados((prev) => ({
      ...prev,
      [dia]: prev[dia] === 0 ? 1 : 0,
    }));
  };

  useEffect(() => {
    const fetchHorarios = async () => {
      const userData = getUserData();
      if (userData) {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/schedule/medic?medic_id=${userData.id}`);
          const data = await response.json();
          console.log('Horarios cargados:', data);

          if (data.schedule && data.schedule.id) {
            const { start_time, end_time, availability_weekdays } = data.schedule;

            setHoraInicio(parseInt(start_time.split(':')[0], 10));
            setHoraFin(parseInt(end_time.split(':')[0], 10));

            const newDiasSeleccionados = diasSemana.reduce((acc, dia) => {
              const weekdayData = availability_weekdays.find((d) => d.weekday === dia);
              acc[dia] = weekdayData ? weekdayData.available : 0;
              return acc;
            }, {});

            setDiasSeleccionados(newDiasSeleccionados);
          }
        } catch (error) {
          console.error('Error al cargar los horarios:', error);
          await Swal.fire({
            icon: 'error',
            title: 'Error al cargar horarios de atención',
            text: error.message,
          });
        }
      }
    };

    fetchHorarios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = getUserData();
    console.log('datos del usuario:', userData);

    const horarios = {
      monday: diasSeleccionados['Lunes'],
      tuesday: diasSeleccionados['Martes'],
      wednesday: diasSeleccionados['Miércoles'],
      thursday: diasSeleccionados['Jueves'],
      friday: diasSeleccionados['Viernes'],
      saturday: diasSeleccionados['Sábado'],
      sunday: diasSeleccionados['Domingo'],
      medic_id: userData.id,
      start_time: `${horaInicio.toString().padStart(2, '0')}:00:00`,
      end_time: `${horaFin.toString().padStart(2, '0')}:00:00`,
    };

    console.log('Horarios guardados:', horarios);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/schedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(horarios),
      });
      const data = await response.json();
      console.log('response:', data);

      if (data.error) {
        await Swal.fire({
          icon: 'error',
          title: 'Error registrar horarios de atención',
          text: data.error,
        });
        return;
      }

      if (data.create) {
        await Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: data.message,
        });
      } else {
        const updateResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/schedule/medic/${userData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(horarios),
        });
        const updateData = await updateResponse.json();
        console.log('update response:', updateData);

        if (updateData.error) {
          await Swal.fire({
            icon: 'error',
            title: 'Error al actualizar horarios de atención',
            text: updateData.error,
          });
        } else {
          await Swal.fire({
            icon: 'success',
            title: 'Actualización exitosa',
            text: updateData.message,
          });
        }
      }

    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Error registrar horarios de atención',
        text: error.message,
      });
    }
  };

  return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="sm:w-full sm:max-w-md bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=black" alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Establecer horario de atención</h2>
            <form onSubmit={handleSubmit}>
              <br/>
              <h3>Seleccione días de la semana:</h3>
            <div style={{ marginBottom: '20px', display: 'ruby' }}>

              {diasSemana.map((dia) => (
                  <div key={dia} className="relative flex items-start py-4 ml-2">
                    <input
                        className="hidden peer" name="preferred_activities[]"
                        id={dia}
                        type="checkbox"
                        checked={diasSeleccionados[dia] === 1}
                        onChange={() => handleDiaChange(dia)}
                    />
                    <label htmlFor={dia} className="inline-flex items-center justify-between w-auto p-2 font-medium tracking-tight border rounded-lg cursor-pointer bg-brand-light text-brand-black border-gray-800 peer-checked:border-gray-800 peer-checked:bg-gray-800 peer-checked:text-white peer-checked:font-semibold  peer-checked:decoration-brand-dark decoration-2">
                      {dia}
                    </label>
                  </div>
              ))}
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label>
                Hora de inicio:
                <select value={horaInicio} onChange={(e) => setHoraInicio(Number(e.target.value))}
                        className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                >
                  {horas.map((hora) => (
                      <option key={hora} value={hora}>
                        {hora}:00
                      </option>
                  ))}
                </select>
              </label>
              <label>
                Hora de fin:
                <select value={horaFin} onChange={(e) => setHoraFin(Number(e.target.value))}
                        className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                >
                  {horas.map((hora) => (
                      <option key={hora} value={hora}>
                        {hora}:00
                      </option>
                  ))}
                </select>
              </label>
            </div>
            <button type="submit"
                    className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
            >Guardar Horario</button>
        </form>
      </div>
    </div>
  );
};

export default HorarioMedico;
