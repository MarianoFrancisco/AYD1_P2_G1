/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const User = require('../models/User');
const Medic = require('../models/Medic');
const Gender = require('../models/Gender');
const Role = require('../models/Role');
const Appointment = require('../models/Appointment');
const Specialty = require('../models/Specialty');
const { createUserResponse } = require('../helper/userHelper');

const getMedicsWithoutPendingAppointmentsByUser = async (user_id, whereCondition) => {
    try {
        const users = await User.findAll({
            where: whereCondition,
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
                    required: true
                },
                { model: Gender, as: 'gender', attributes: ['id', 'name'], required: true },
                { model: Role, as: 'role', attributes: ['id', 'name'], required: true }
            ]
        });

        if (!users || users.length === 0) {
            return [];
        }

        const medic_ids = users.map(user => user.id);

        const appointments = await Appointment.findAll({
            where: {
                patient_id: user_id,
                status_id: 1,
                medic_id: medic_ids
            }
        });

        const filteredUsers = users.filter(user => {
            return !appointments.some(appointment => appointment.medic_id === user.id);
        });

        const userResponses = filteredUsers.map(createUserResponse);

        return userResponses;
    } catch (error) {
        console.error('Error in gettings medics without pending appointments by user:', error);
        return [];
    }
};

module.exports = { getMedicsWithoutPendingAppointmentsByUser };
