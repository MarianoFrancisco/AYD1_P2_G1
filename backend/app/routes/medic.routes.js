/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const express = require('express');
const router = express.Router();
const {
    getMedicsByPatient,
    getMedicsBySpecialty
} = require('../controllers/medicController');
const patient = '/patient';
const search = '/search';

// GET /patient?user_id=value
router.get(patient, getMedicsByPatient);

// GET /patient/search?user_id=value&specialty=value
router.get(patient + search, getMedicsBySpecialty);

module.exports = router;