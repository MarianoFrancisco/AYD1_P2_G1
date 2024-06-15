const sequelize = require('../../config/connectionDB');
const User = require('../models/User');
const Medic = require('../models/Medic');
const Patient = require('../models/Patient');
const { hashPassword } = require('../utils/encryption');
const {getUser} = require('../helper/userHelper');
const path = require('path');
const fs = require('fs');

const registerUser = async (req, res) => {
    if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
    }
    if (!req.body.role_id || !req.body.email || !req.body.password) {
        return res.status(400).json({ error: 'You must provide a role_id, email, and password for the user.' });
    }
    const { first_name, last_name, gender_id, email, password, birth_date, role_id } = req.body;
    const photo = req.file;

    try {
        const transaction = await sequelize.transaction();

        try {
            if (role_id == 2 && (!photo || !photo.filename)) {
                return res.status(400).json({ message: 'You must provide a photo for the user.' });
            }
            const newUser = await User.create(
                {
                    first_name,
                    last_name,
                    gender_id,
                    email,
                    password: await hashPassword(password),
                    birth_date,
                    photo: photo ? photo.filename : null,
                    role_id
                },
                { transaction }
            );

            if (role_id == 1) {
                await Patient.create(
                    {
                        user_id: newUser.id
                    },
                    { transaction }
                );
            } else if (role_id == 2) {
                await Medic.create(
                    {
                        user_id: newUser.id,
                        specialty_id: req.body.specialty_id,
                        clinic_address: req.body.clinic_address
                    },
                    { transaction }
                );
            }
            await transaction.commit();

            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            await transaction.rollback();
            if (error.name === 'SequelizeUniqueConstraintError') {
                res.status(409).json({ error: 'The user is already registered.' });
            } else {
                console.error('Error in registration user:', error.message);
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    } catch (error) {
        console.error('Error in registration user:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateUser = async (req, res) => {
    if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
    }

    const { first_name, last_name, gender_id, password, birth_date } = req.body;
    const photo = req.file;
    let lastPhoto = null;

    try {
        const transaction = await sequelize.transaction();

        try {
            const updatedUser = await User.findByPk(req.params.id);

            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found.' });
            }

            const role_id = updatedUser.role_id;

            if (updatedUser.photo) {
                lastPhoto = updatedUser.photo;
            }

            updatedUser.first_name = first_name;
            updatedUser.last_name = last_name;
            updatedUser.gender_id = gender_id;
            updatedUser.birth_date = birth_date;

            if (password) {
                updatedUser.password = await hashPassword(password);
            }

            if (photo && photo.filename) {
                updatedUser.photo = photo.filename;
            }

            await updatedUser.save({ transaction });

            if (role_id == 1) {
                const patient = await Patient.findOne({ where: { user_id: updatedUser.id } });
                if (patient) {
                    // Realiza alguna operación si es necesario
                }
            } else if (role_id == 2) {
                const medic = await Medic.findOne({ where: { user_id: updatedUser.id } });
                if (medic) {
                    medic.specialty_id = req.body.specialty_id;
                    medic.clinic_address = req.body.clinic_address;
                    await medic.save({ transaction });
                }
            }

            if (photo && photo.filename && lastPhoto) {
                const lastPhotoRoute = path.join(__dirname, '..', '..', 'photo', lastPhoto);
                fs.unlinkSync(lastPhotoRoute);
            }

            await transaction.commit();

            const updatedUserResponse = await getUser(updatedUser.id);

            res.status(200).json({ message: 'User updated successfully', user: updatedUserResponse });
        } catch (error) {
            await transaction.rollback();
            console.error('Error in update user:', error.message);
            res.status(500).json({ error: 'Internal server error' });
        }
    } catch (error) {
        console.error('Error in update user:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { registerUser, updateUser };