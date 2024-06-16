/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const express = require('express');
const router = express.Router();
const {
    getAppointmentsByPatient,
    getAppointmentsByMedic,
    attendAppointments
} = require('../controllers/appointmentController');

router.get('/patient/:user_id', getAppointmentsByPatient);

router.get('/medic/:user_id', getAppointmentsByMedic);

router.patch('/patient/canceled/:id', getAppointmentsByMedic);

router.patch('/medic/attended/:id', attendAppointments);

router.patch('/medic/canceled/:id', getAppointmentsByMedic);

module.exports = router;