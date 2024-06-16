/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const express = require('express');
const router = express.Router();
const {
    registerSchedule,
    getScheduleByMedic,
    getSchedulesByDate
} = require('../controllers/scheduleController');

router.post('', registerSchedule);

router.get('/medic/:user_id', getScheduleByMedic);

router.get('/date/:user_id', getSchedulesByDate);

module.exports = router;