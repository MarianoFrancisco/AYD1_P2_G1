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
const attended = '/attended';
const pathId = '/:id';


// GET /patient/pending?user_id=value
router.get(patient + pending, getAppointmentsPendingByPatient);

// GET /medic/pending?user_id=value
router.get(medic + pending, getAppointmentsPendingByMedic);

// GET /patient?user_id=value
router.get(patient, getAppointmentsAttendAndCancelledByPatient);

// GET /medic?user_id=value
router.get(medic, getAppointmentsAttendAndCancelledByMedic);

router.post('', registerAppointment);

// PUT /patient/cancelled/value
router.patch(patient + cancelled + pathId, cancelAppointmentByPatient);

// PUT /medic/attended/value
router.patch(medic + attended + pathId, attendAppointment);

// PUT /medic/cancelled/value
router.patch(medic + cancelled + pathId, cancelAppointmentByMedic);

module.exports = router;