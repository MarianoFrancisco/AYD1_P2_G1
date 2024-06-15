/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const {getAppointments} = require('../helper/appointmentHelper');

const getAppointmentsByPatient = async (req, res) => {
    const { user_id } = req.params;

    try {
        const appointments = await getAppointments("Patient", user_id);

        return res.status(200).json({ appointments });
    } catch (error) {
        console.error('Error in getting appointments by patient:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getAppointmentsByPatient};