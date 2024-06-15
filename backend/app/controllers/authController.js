/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUserResponse } = require('../helper/userHelper');
const {getUserByEmail} = require('../helper/userHelper');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const tokenPayload = createUserResponse(user);

        const token = jwt.sign(tokenPayload, process.env.SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = login;