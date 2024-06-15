/**
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const User = require('../models/User');
const Medic = require('../models/Medic');
const Patient = require('../models/Patient');
const Gender = require('../models/Gender');
const Role = require('../models/Role');
const Specialty = require('../models/Specialty');

const createUserResponse = (user) => {
    const userResponse = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        gender: {
            id: user.gender.id,
            name: user.gender.name
        },
        email: user.email,
        birth_date: user.birth_date,
        photo: user.photo,
        role: {
            id: user.role.id,
            name: user.role.name
        },
        additionalAttribute: {}
    };

    if (user.additionalAttributePatient) {
        // userResponse.additionalAttribute.patientId = user.additionalAttributePatient.id;
    } else if (user.additionalAttributeMedic) {
        if (user.additionalAttributeMedic.Specialty) {
            const specialty = {
                specialty_id: user.additionalAttributeMedic.Specialty.id,
                name: user.additionalAttributeMedic.Specialty.name
            }
            userResponse.additionalAttribute.specialty = specialty;
        }
        userResponse.additionalAttribute.clinicAddress = user.additionalAttributeMedic.clinic_address;
    }

    return userResponse;
};

const getUserById = async (id) => {
    try {
        const user = await User.findOne({
            where: { id },
            include: [
                {
                    model: Medic,
                    as: 'additionalAttributeMedic',
                    attributes: ['id', 'specialty_id', 'clinic_address'],
                    include: [
                        {
                            model: Specialty,
                            attributes: ['id', 'name']
                        }
                    ],
                    required: false
                },
                { model: Patient, as: 'additionalAttributePatient', attributes: ['id'], required: false },
                { model: Gender, as: 'gender', attributes: ['id', 'name'], required: true },
                { model: Role, as: 'role', attributes: ['id', 'name'], required: true }
            ]
        });
        if (!user) {
            return null;
        }
        
        const userResponse = createUserResponse(user);

        return userResponse;
    } catch (error) {
        console.error('Error in getting user:', error);
        return null;
    }
};

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({
            where: { email },
            include: [
                {
                    model: Medic,
                    as: 'additionalAttributeMedic',
                    attributes: ['id', 'specialty_id', 'clinic_address'],
                    include: [
                        {
                            model: Specialty,
                            attributes: ['id', 'name']
                        }
                    ],
                    required: false
                },
                { model: Patient, as: 'additionalAttributePatient', attributes: ['id'], required: false },
                { model: Gender, as: 'gender', attributes: ['id', 'name'], required: true },
                { model: Role, as: 'role', attributes: ['id', 'name'], required: true }
            ]
        });
        if (!user) {
            return null;
        } else {
            return user;
        }
    } catch (error) {
        console.error('Error in getting user:', error);
        return null;
    }
};

module.exports = { getUserById, getUserByEmail, createUserResponse };
