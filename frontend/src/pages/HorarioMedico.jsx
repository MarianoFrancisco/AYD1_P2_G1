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
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h1>Establecer horario de atención</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <h3>Días de la semana:</h3>
            {diasSemana.map((dia) => (
                <div key={dia}>
                  <label>
                    <input
                        type="checkbox"
                        checked={diasSeleccionados[dia] === 1}
                        onChange={() => handleDiaChange(dia)}
                    />
                    {dia}
                  </label>
                </div>
            ))}
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>
              Hora de inicio:
              <select value={horaInicio} onChange={(e) => setHoraInicio(Number(e.target.value))}>
                {horas.map((hora) => (
                    <option key={hora} value={hora}>
                      {hora}:00
                    </option>
                ))}
              </select>
            </label>
            <label style={{ marginLeft: '20px' }}>
              Hora de fin:
              <select value={horaFin} onChange={(e) => setHoraFin(Number(e.target.value))}>
                {horas.map((hora) => (
                    <option key={hora} value={hora}>
                      {hora}:00
                    </option>
                ))}
              </select>
            </label>
          </div>
          <button type="submit">Guardar Horario</button>
        </form>
      </div>
  );
};

export default HorarioMedico;
