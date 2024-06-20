/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const User = require('../models/User');
const Medic = require('../models/Medic');
const Gender = require('../models/Gender');
const Role = require('../models/Role');
const MedicAvailabilityWeekday = require('../models/MedicAvailabilityWeekday');
const MedicAvailability = require('../models/MedicAvailability');
const Specialty = require('../models/Specialty');
const Weekday = require('../models/Weekday');
const { createUserResponse } = require('./userHelper');

const getScheduleAndDays = async (medic_id) => {
    try {
        const medic_availability = await MedicAvailability.findOne({
            where: { medic_id },
            include: [
                {
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
                    model: MedicAvailabilityWeekday,
                    as: 'medic_availability_weekdays',
                    attributes: { exclude: ['availability_id', 'weekday_id'] },
                    include: [
                        {
                            model: Weekday,
                            as: 'weekday',
                            attributes: ['id', 'name']
                        }
                    ]
                }
            ]
        });

        if (!medic_availability) {
            return { message: 'No schedule availability found for this medic' };
        }

        const medicAvailabilityResponse = {
            id: medic_availability.id,
            medic: createUserResponse(medic_availability.medic),
            start_time: medic_availability.start_time,
            end_time: medic_availability.end_time,
            availability_weekdays: medic_availability.medic_availability_weekdays.map(day => ({
                weekday: day.weekday.name,
                available: day.available
            }))
        };

        return medicAvailabilityResponse;
    } catch (error) {
        console.error(error);
        throw new Error('Error retrieving schedule and days');
    }
};

module.exports = { getScheduleAndDays };
