import React, { useState } from 'react';

const HorarioMedico = () => {
    const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    const horas = Array.from({ length: 13 }, (_, i) => 8 + i).map(h => h + ':00');

    const [horarios, setHorarios] = useState(
        diasSemana.reduce((acc, dia) => {
            acc[dia] = { inicio: '8:00', fin: '8:00' };
            return acc;
        }, {})
    );

    const handleChange = (dia, tipo, valor) => {
        setHorarios(prev => ({
            ...prev,
            [dia]: {
                ...prev[dia],
                [tipo]: valor
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Horarios guardados:', horarios);
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h1>Modificar Horarios de Atención</h1>
            <form onSubmit={handleSubmit}>
                {diasSemana.map((dia) => (
                    <div key={dia} style={{ marginBottom: '20px' }}>
                        <h3>{dia}</h3>
                        <label>
                            Hora de inicio:
                            <select value={horarios[dia].inicio} onChange={(e) => handleChange(dia, 'inicio', e.target.value)}>
                                {horas.map((hora) => (
                                    <option key={hora} value={hora}>{hora}</option>
                                ))}
                            </select>
                        </label>
                        <label style={{ marginLeft: '20px' }}>
                            Hora de fin:
                            <select value={horarios[dia].fin} onChange={(e) => handleChange(dia, 'fin', e.target.value)}>
                                {horas.map((hora) => (
                                    <option key={hora} value={hora}>{hora}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                ))}
                <button type="submit">Guardar Horarios</button>
            </form>
        </div>
    );
};

export default HorarioMedico;
