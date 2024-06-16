/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const { getAppointments } = require('../helper/appointmentHelper');
const Appointment = require('../models/Appointment');

const getAppointmentsByPatient = async (req, res) => {
    const { user_id } = req.params;

    try {
        const appointments = await getAppointments("Patient", user_id);

        return res.status(200).json({ appointments });
    } catch (error) {
        console.error('Error in getting appointments by patient:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAppointmentsByMedic = async (req, res) => {
    const { user_id } = req.params;

    try {
        const appointments = await getAppointments("Medic", user_id);

        return res.status(200).json({ appointments });
    } catch (error) {
        console.error('Error in getting appointments by medic:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const attendAppointments = async (req, res) => {
    const { id } = req.params;

    try {
        const appointment = await Appointment.findByPk(id);

        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        appointment.status_id = 2;
        await appointment.save();

        return res.status(200).json({ appointment });
    } catch (error) {
        console.error('Error when changing status to attend an appointment:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    getAppointmentsByPatient,
    getAppointmentsByMedic,
    attendAppointments
};