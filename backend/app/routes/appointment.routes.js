/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const express = require('express');
const router = express.Router();
const {getAppointmentsByPatient, getAppointmentsByMedic} = require('../controllers/appointmentController');

router.get('/patient/:user_id', getAppointmentsByPatient);

router.get('/medic/:user_id', getAppointmentsByMedic);

module.exports = router;