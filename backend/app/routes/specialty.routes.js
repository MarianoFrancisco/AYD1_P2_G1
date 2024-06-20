/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const express = require('express');
const router = express.Router();
const getSpecialties = require('../controllers/specialtyController');

// GET
router.get('', getSpecialties);

module.exports = router;