import React, { useState } from 'react';

const HorarioMedico = () => {
  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const horas = Array.from({ length: 24 }, (_, i) => i);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const horarios = {
      diasSeleccionados,
      horaInicio,
      horaFin
    };
    // Aquí puedes manejar la lógica de guardar los horarios
    console.log('Horarios guardados:', horarios);
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