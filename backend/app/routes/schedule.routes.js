/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const express = require('express');
const router = express.Router();
const {
    registerUser,
    updateUser
} = require('../controllers/userController');
const uploadPhoto = require('../utils/photo');

router.post('', uploadPhoto, registerUser);

router.put('/:id', uploadPhoto, updateUser);

module.exports = router;