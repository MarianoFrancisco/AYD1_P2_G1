/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const {getMedicsWithoutPendingAppointments} = require('../helper/medicHelper');

const getMedicsByPatient = async (req, res) => {
    const { user_id } = req.params;

    try {
        const medics = await getMedicsWithoutPendingAppointments(user_id);

        return res.status(200).json({ medics });
    } catch (error) {
        console.error('Error in getting medics by patient:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getMedicsByPatient};