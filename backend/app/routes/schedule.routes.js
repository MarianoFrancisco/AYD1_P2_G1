/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const express = require('express');
const router = express.Router();
const {
    registerSchedule
} = require('../controllers/scheduleController');

router.post('', registerSchedule);

module.exports = router;