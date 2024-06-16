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
const patient = '/patient';
const medic = '/medic';
const pending = '/pending';
const cancelled = '/cancelled';

// GET /patient/pending?user_id=value
router.get(patient + pending, getAppointmentsPendingByPatient);

// GET /medic/pending?user_id=value
router.get(medic + pending, getAppointmentsPendingByMedic);

// GET /patient?user_id=value
router.get(patient, getAppointmentsAttendAndCancelledByPatient);

// GET /medic?user_id=value
router.get(medic, getAppointmentsAttendAndCancelledByMedic);

router.post('', registerAppointment);

router.patch('/patient/cancelled/:id', cancelAppointmentByPatient);

router.patch('/medic/attended/:id', attendAppointment);

router.patch('/medic/cancelled/:id', cancelAppointmentByMedic);

module.exports = router;