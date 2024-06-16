/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const sequelize = require('../../config/connectionDB');
const { getScheduleAndDays } = require('../helper/medicAvailabilityHelper');
const MedicAvailability = require('../models/MedicAvailability');
const MedicAvailabilityWeekday = require('../models/MedicAvailabilityWeekday');
const AvailableTimeSlot = require('../models/AvailableTimeSlot');
const Appointment = require('../models/Appointment');
const { Op } = require('sequelize');
const moment = require('moment');

const registerSchedule = async (req, res) => {
    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday,
        medic_id, start_time, end_time } = req.body;

    const days = [monday, tuesday, wednesday, thursday, friday, saturday, sunday];

    try {
        const transaction = await sequelize.transaction();

        const medic_availability = await MedicAvailability.create(
            {
                medic_id,
                start_time,
                end_time
            },
            { transaction }
        );

        for (let i = 0; i < days.length; i++) {
            const available = days[i] === 1 ? 1 : 0;

            await MedicAvailabilityWeekday.create(
                {
                    availability_id: medic_availability.id,
                    weekday_id: i + 1,
                    available: available
                },
                { transaction }
            );
        }

        await transaction.commit();

        res.status(201).json({ message: 'Schedule registered successfully' });
    } catch (error) {
        if (transaction) await transaction.rollback();
        res.status(500).json({ error: error.message });
    }
};

const getScheduleByMedic = async (req, res) => {
    const { medic_id } = req.query;

    try {
        const schedule = await getScheduleAndDays(medic_id);

        return res.status(200).json({ schedule });
    } catch (error) {
        console.error('Error in getting schedule by medic:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getSchedulesByDate = async (req, res) => {
    const { medic_id, date } = req.query;

    const weekdayId = moment(date).isoWeekday();

    try {

        const medic_availability = await MedicAvailability.findOne({
            where: { medic_id }
        });

        if (!medic_availability) {
            return res.status(404).json({ message: 'No medic availability for this doctor on this date' });
        }

        const medic_availability_weekday = await MedicAvailabilityWeekday.findOne({
            where: {
                availability_id : medic_availability.id,
                weekday_id: weekdayId,
                available: 1
            }
        });

        if (!medic_availability_weekday) {
            return res.status(404).json({ message: 'No medic availability weekday for this doctor on this date' });
        }

        const availableTimeSlots = await AvailableTimeSlot.findAll({
            where: {
                start_time: {
                    [Op.gte]: medic_availability.start_time,
                    [Op.lt]: medic_availability.end_time
                }
            }
        });

        const availableSchedules = [];
        for (let i = 0; i < availableTimeSlots.length; i++) {
            const timeSlot = availableTimeSlots[i];
            const appointment = await Appointment.findOne({
                where: {
                    medic_id,
                    date,
                    time_slot_id: timeSlot.id
                }
            });
            let is_available = 1;
            if (appointment) {
                is_available = 0;
            }

            availableSchedules.push({
                id: timeSlot.id,
                start_time: timeSlot.start_time,
                end_time: timeSlot.end_time,
                available: is_available
            });
        }

        if (availableSchedules.length === 0) {
            return res.status(404).json({ message: 'No available schedules on this date' });
        }

        return res.status(200).json({ availableSchedules });
    } catch (error) {
        console.error('Error in getting schedule by date:', error.message);
        return res.status(500).json({ message: 'Error retrieving schedules by date' });
    }
};

const updateSchedule = async (req, res) => {
    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday, start_time, end_time } = req.body;
    
    const { medic_id } = req.params

    const days = [monday, tuesday, wednesday, thursday, friday, saturday, sunday];

    try {
        const transaction = await sequelize.transaction();

        let medic_availability = await MedicAvailability.findOne({
            where: { medic_id },
            transaction
        });

        if (!medic_availability) {
            await transaction.rollback();
            return res.status(404).json({ error: 'Schedule must be registered before updating' });
        }

        medic_availability.start_time = start_time;
        medic_availability.end_time = end_time;
        await medic_availability.save({ transaction });

        for (let i = 0; i < days.length; i++) {
            const weekday_id = i + 1;
            const available = days[i] === 1 ? 1 : 0;

            let availabilityWeekday = await MedicAvailabilityWeekday.findOne({
                where: {
                    availability_id: medic_availability.id,
                    weekday_id
                },
                transaction
            });

            if (!availabilityWeekday) {
                await transaction.rollback();
                return res.status(404).json({ error: `Availability entry for weekday ${weekday_id} does not exist` });
            }

            availabilityWeekday.available = available;
            await availabilityWeekday.save({ transaction });
        }

        await transaction.commit();

        res.status(200).json({ message: 'Schedule updated successfully' });
    } catch (error) {
        console.error(error);
        if (transaction) await transaction.rollback();
        res.status(500).json({ error: 'Error updating schedule' });
    }
};

module.exports = {
    registerSchedule,
    getScheduleByMedic,
    getSchedulesByDate,
    updateSchedule
};