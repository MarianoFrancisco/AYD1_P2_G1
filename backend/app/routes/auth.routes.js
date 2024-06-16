/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const express = require('express');
const router = express.Router();
const authentication = require('../controllers/authController');
const login = '/login';

router.post(login, authentication);

module.exports = router;