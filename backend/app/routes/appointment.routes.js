/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const express = require('express');
const router = express.Router();
const {
    getAppointmentsByPatient,
    getAppointmentsByMedic,
    attendAppointment,
    cancelAppointmentByPatient,
    cancelAppointmentByMedic
} = require('../controllers/appointmentController');

router.get('/patient/:user_id', getAppointmentsByPatient);

router.get('/medic/:user_id', getAppointmentsByMedic);

router.patch('/patient/cancelled/:id', cancelAppointmentByPatient);

router.patch('/medic/attended/:id', attendAppointment);

router.patch('/medic/cancelled/:id', cancelAppointmentByMedic);

module.exports = router;