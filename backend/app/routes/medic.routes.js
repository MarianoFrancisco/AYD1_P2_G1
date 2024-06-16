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
const startUrl = '/patient/:user_id';

router.get(startUrl, getMedicsByPatient);

router.get(startUrl + '/specialty/:specialty', getMedicsBySpecialty);

module.exports = router;