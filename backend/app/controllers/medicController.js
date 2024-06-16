/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const { getMedicsWithoutPendingAppointmentsByUser } = require('../helper/medicHelper');
const { Op } = require('sequelize');

const getMedicsByPatient = async (req, res) => {
    const { user_id } = req.params;

    try {
        const medics = await getMedicsWithoutPendingAppointmentsByUser(user_id, { role_id: 2 });

        return res.status(200).json({ medics });
    } catch (error) {
        console.error('Error in getting medics by patient:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getMedicsBySpecialty = async (req, res) => {
    const { user_id, specialty } = req.params;

    try {
        let whereClause = { role_id: 2 };

        if (specialty) {
            whereClause = {
                ...whereClause,
                '$additionalAttributeMedic.Specialty.name$': {
                    [Op.like]: `%${specialty}%`
                }
            };
        }
        const medics = await getMedicsWithoutPendingAppointmentsByUser(user_id, whereClause);

        return res.status(200).json({ medics });
    } catch (error) {
        console.error('Error in getting medics by patient:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getMedicsByPatient,
    getMedicsBySpecialty
};