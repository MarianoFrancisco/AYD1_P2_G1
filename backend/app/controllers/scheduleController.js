/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const MedicAvailability = require('../models/MedicAvailability');
const MedicAvailabilityWeekday = require('../models/MedicAvailabilityWeekday');
const sequelize = require('../../config/connectionDB');

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

module.exports = { registerSchedule };