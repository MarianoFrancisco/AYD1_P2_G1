/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const {getMedicsWithoutPendingAppointmentsByUser} = require('../helper/medicHelper');

const getMedicsByPatient = async (req, res) => {
    const { user_id } = req.params;

    try {
        const medics = await getMedicsWithoutPendingAppointmentsByUser(user_id);

        return res.status(200).json({ medics });
    } catch (error) {
        console.error('Error in getting medics by patient:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getMedicsByPatient};