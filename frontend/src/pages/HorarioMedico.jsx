import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { decodeToken } from 'react-jwt';
import Swal from "sweetalert2";

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
    setDiasSeleccionados(prev => ({
      ...prev,
      [dia]: prev[dia] === 0 ? 1 : 0
    }));
  };

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
      medic_id: userData.id, // Aquí deberías obtener el ID del médico de alguna manera
      start_time: `${horaInicio.toString().padStart(2, '0')}:00:00`,
      end_time: `${horaFin.toString().padStart(2, '0')}:00:00`
    };

    // Aquí puedes manejar la lógica de guardar los horarios
    console.log('Horarios guardados:', horarios);

    // Enviar a un endpoint
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/schedule`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(horarios),
      })
      const data = await response.json()
      console.log('response:', data);

      if (data.error) {
        await Swal.fire({
          icon: 'error',
          title: 'Error registrar horarios de atención',
          text: data.error,
        })
        return;
      }

      await Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: data.message,
      })

    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Error registrar horarios de atención',
        text: error.error,
      })
    }
  };

  return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h1>Modificar Horarios de Atención</h1>
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
              <select
                  value={horaInicio}
                  onChange={(e) => setHoraInicio(Number(e.target.value))}
              >
                {horas.map((hora) => (
                    <option key={hora} value={hora}>{hora}:00</option>
                ))}
              </select>
            </label>
            <label style={{ marginLeft: '20px' }}>
              Hora de fin:
              <select
                  value={horaFin}
                  onChange={(e) => setHoraFin(Number(e.target.value))}
              >
                {horas.map((hora) => (
                    <option key={hora} value={hora}>{hora}:00</option>
                ))}
              </select>
            </label>
          </div>
          <button type="submit">Guardar Horarios</button>
        </form>
      </div>
  );
};

export default HorarioMedico;
