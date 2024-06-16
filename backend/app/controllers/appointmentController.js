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

const changeAppointmentStatus = async (req, res, statusId) => {
    const { id } = req.params;

    try {
        const appointment = await Appointment.findByPk(id);

        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        appointment.status_id = statusId;
        await appointment.save();

        return res.status(200).json({ appointment });
    } catch (error) {
        console.error(`Error when changing status to ${statusId} for an appointment:`, error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const attendAppointment = async (req, res) => {
    return changeAppointmentStatus(req, res, 2); // 2 "attended"
};

const cancelAppointmentByPatient = async (req, res) => {
    return changeAppointmentStatus(req, res, 3); // 3 "cancelled by patient"
};

const cancelAppointmentByMedic = async (req, res) => {
    return changeAppointmentStatus(req, res, 4); // 4 "cancelled by medic"
};

module.exports = {
    getAppointmentsByPatient,
    getAppointmentsByMedic,
    attendAppointment,
    cancelAppointmentByPatient,
    cancelAppointmentByMedic
};