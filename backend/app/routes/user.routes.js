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
const pathId = '/:id';

router.post('', uploadPhoto, registerUser);

// PUT /value
router.put(pathId, uploadPhoto, updateUser);

module.exports = router;