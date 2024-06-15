/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const express = require('express');
const router = express.Router();
const {getMedicsByPatient} = require('../controllers/medicController');

router.get('/:user_id', getMedicsByPatient);

module.exports = router;