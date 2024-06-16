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
const medic = '/medic';
const date = '/date';
const pathMedicId = '/:medic_id';



// GET /medics?medic_id=value
router.get(medic, getScheduleByMedic);

// GET /date?medic_id=value&date=value
router.get(date, getSchedulesByDate);

router.post('', registerSchedule);

router.put(medic + pathMedicId, updateSchedule);

module.exports = router;