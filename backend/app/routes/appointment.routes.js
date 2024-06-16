/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const express = require('express');
const router = express.Router();
const {
    getAppointmentsPendingByPatient,
    getAppointmentsPendingByMedic,
    getAppointmentsAttendAndCancelledByPatient,
    getAppointmentsAttendAndCancelledByMedic,
    registerAppointment,
    attendAppointment,
    cancelAppointmentByPatient,
    cancelAppointmentByMedic
} = require('../controllers/appointmentController');

router.get('/patient/pending/:user_id', getAppointmentsPendingByPatient);

router.get('/medic/pending/:user_id', getAppointmentsPendingByMedic);

router.get('/patient/history/:user_id', getAppointmentsAttendAndCancelledByPatient);

router.get('/medic/history/:user_id', getAppointmentsAttendAndCancelledByMedic);

router.post('', registerAppointment);

router.patch('/patient/cancelled/:id', cancelAppointmentByPatient);

router.patch('/medic/attended/:id', attendAppointment);

router.patch('/medic/cancelled/:id', cancelAppointmentByMedic);

module.exports = router;