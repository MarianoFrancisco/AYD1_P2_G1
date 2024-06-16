/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const Medic = require('../models/Medic');
const Patient = require('../models/Patient');
const Gender = require('../models/Gender');
const Role = require('../models/Role');
const Specialty = require('../models/Specialty');
const AppointmentStatus = require('../models/AppointmentStatus');
const AvailableTimeSlot = require('../models/AvailableTimeSlot');

const getAppointments = async (type, id_user, status_id) => {
    try {
        let appointments = [];
        if (type === "Patient") {
            appointments = getAppointmentsByCondition({patient_id: id_user, status_id: status_id});
        } else if (type === "Medic") {
            appointments = getAppointmentsByCondition({medic_id: id_user, status_id: status_id});
        }

        return appointments;
    } catch (error) {
        console.error('Error in getting appointments:', error);
        throw error;
    }
};

const getAppointmentsByCondition = async (whereCondition) => {
    try {
        const appointments = await Appointment.findAll({
            where: whereCondition,
            attributes: { exclude: ['patient_id', 'medic_id', 'time_slot_id', 'status_id'] },
            include: [
                {
                    model: User,
                    as: 'patient',
                    attributes: { exclude: ['password'] },
                    include: [
                        { model: Patient, as: 'additionalAttributePatient', attributes: ['id'], required: true },
                        { model: Gender, as: 'gender', attributes: ['id', 'name'], required: true },
                        { model: Role, as: 'role', attributes: ['id', 'name'], required: true }
                    ]
                }, {
                    model: User,
                    as: 'medic',
                    attributes: { exclude: ['password'] },
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
                },
                {
                    model: AvailableTimeSlot,
                    as: 'available_time_slot'
                },
                {
                    model: AppointmentStatus,
                    as: 'appointment_status',
                }
            ]
        });
        return appointments;
    } catch (error) {
        console.error('Error in getting appointments by patient:', error);
        throw error;
    }
};

module.exports = { getAppointments };
