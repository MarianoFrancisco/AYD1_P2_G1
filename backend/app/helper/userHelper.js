/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const User = require('../models/User');
const Medic = require('../models/Medic');
const Patient = require('../models/Patient');
const Gender = require('../models/Gender');
const Role = require('../models/Role');

const createUserResponse = (user) => {
    const userResponse = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        gender: {
            id: user.Gender.id,
            name: user.Gender.name
        },
        email: user.email,
        birth_date: user.birth_date,
        photo: user.photo,
        role: {
            id: user.Role.id,
            name: user.Role.name
        },
        additionalInfo: {}
    };

    if (user.Patient) {
        //userResponse.additionalInfo.patientId = user.Patient.id;
    } else if (user.Medic) {
        userResponse.additionalInfo.specialtyId = user.Medic.specialty_id;
        userResponse.additionalInfo.clinicAddress = user.Medic.clinic_address;
    }

    return userResponse;
};

const getUser = async (id) => {
    try {
        const user = await User.findOne({
            where: { id },
            include: [
                { model: Medic, attributes: ['id', 'specialty_id', 'clinic_address'], required: false },
                { model: Patient, attributes: ['id'], required: false },
                { model: Gender, attributes: ['id', 'name'], required: true },
                { model: Role, attributes: ['id', 'name'], required: true }
            ]
        });

        if (!user) {
            return null;
        }

        const userResponse = createUserResponse(user);

        return userResponse;
    } catch (error) {
        console.error('Error in getUser:', error);
        return null;
    }
};

module.exports = {getUser, createUserResponse};
