/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (err) {
        console.error('Error al encriptar la contraseña:', err);
        throw new Error('Error al encriptar la contraseña');
    }
};

module.exports = {
    hashPassword,
};