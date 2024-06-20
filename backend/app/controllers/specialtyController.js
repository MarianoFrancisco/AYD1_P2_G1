/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const Specialty = require('../models/Specialty');

const getSpecialties = async (req, res) => {
    try {
        const specialties = await Specialty.findAll();

        return res.status(200).json({ specialties });
    } catch (error) {
        console.error('Error in getting specialties:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = getSpecialties