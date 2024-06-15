/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json());
app.use(bodyParser.json({ limit: '15mb' }));
app.use(cors());
app.use('/photo',express.static(path.join(`${__dirname}/photo`)));

const api = '/api';
const auth = api + '/auth';
const user = api + '/user';

const authRouter = require('./app/routes/auth.routes.js');
const userRouter = require('./app/routes/user.routes.js');

app.use(auth, authRouter)
app.use(user, userRouter)

module.exports = app;
