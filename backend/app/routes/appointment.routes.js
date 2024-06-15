/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const express = require('express');
const router = express.Router();
const {getAppointmentsByPatient} = require('../controllers/appointmentController');

router.get('/patient/:user_id', getAppointmentsByPatient);

module.exports = router;