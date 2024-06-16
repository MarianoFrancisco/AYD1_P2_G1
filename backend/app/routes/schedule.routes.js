/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const express = require('express');
const router = express.Router();
const {
    registerSchedule,
    getScheduleByMedic,
    getSchedulesByDate,
    updateSchedule
} = require('../controllers/scheduleController');


router.get('/medic/:user_id', getScheduleByMedic);

router.get('/date/:user_id', getSchedulesByDate);

router.post('', registerSchedule);

router.put('/:user_id', updateSchedule);

module.exports = router;