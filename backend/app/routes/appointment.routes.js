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
    cancelAppointmentByMedic,
    pendingAppointment
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

// PATCH /patient/cancelled/value
router.patch(patient + cancelled + pathId, cancelAppointmentByPatient);

// PATCH /medic/attended/value
router.patch(medic + attended + pathId, attendAppointment);

// PATCH /medic/cancelled/value
router.patch(medic + cancelled + pathId, cancelAppointmentByMedic);

// PATCH /medic/cancelled/value
router.patch(pending + pathId, pendingAppointment);

module.exports = router;