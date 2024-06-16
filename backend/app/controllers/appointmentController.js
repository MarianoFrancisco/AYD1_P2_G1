/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const { getAppointments } = require('../helper/appointmentHelper');
const Appointment = require('../models/Appointment');

const getAppointmentsPendingByPatient = async (req, res) => {
    const { user_id } = req.query;

    try {
        const appointments = await getAppointments("Patient", user_id, 1);

        return res.status(200).json({ appointments });
    } catch (error) {
        console.error('Error in getting appointments pending by patient:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAppointmentsPendingByMedic = async (req, res) => {
    const { user_id } = req.query;

    try {
        const appointments = await getAppointments("Medic", user_id, 1);

        return res.status(200).json({ appointments });
    } catch (error) {
        console.error('Error in getting appointments pending by medic:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAppointmentsAttendAndCancelledByPatient = async (req, res) => {
    const { user_id } = req.query;

    try {
        const appointments = await getAppointments("Patient", user_id, [2, 3, 4]);

        return res.status(200).json({ appointments });
    } catch (error) {
        console.error('Error in getting appointments attended and cancelled by patient:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const registerAppointment = async (req, res) => {
    const { patient_id, medic_id, date, time_slot_id, reason } = req.body;

    try {
        const newAppointment = await Appointment.create(
            {
                patient_id,
                medic_id,
                date,
                time_slot_id,
                reason,
                status_id: 1
            }
        );

        return res.status(200).json({ newAppointment });
    } catch (error) {
        console.error('Error in creating an appointment:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAppointmentsAttendAndCancelledByMedic = async (req, res) => {
    const { user_id } = req.query;

    try {
        const appointments = await getAppointments("Medic", user_id, [2, 3, 4]);

        return res.status(200).json({ appointments });
    } catch (error) {
        console.error('Error in getting appointments attended and cancelled by medic:', error.message);
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
    getAppointmentsPendingByPatient,
    getAppointmentsPendingByMedic,
    getAppointmentsAttendAndCancelledByPatient,
    getAppointmentsAttendAndCancelledByMedic,
    registerAppointment,
    attendAppointment,
    cancelAppointmentByPatient,
    cancelAppointmentByMedic,
};