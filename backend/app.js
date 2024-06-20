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
const medic = api + '/medic';
const appointment = api + '/appointment';
const schedule = api + '/schedule';
const specialty = api + '/specialty';

const authRouter = require('./app/routes/auth.routes.js');
const userRouter = require('./app/routes/user.routes.js');
const medicRouter = require('./app/routes/medic.routes.js');
const appointmentRouter = require('./app/routes/appointment.routes.js');
const scheduleRouter = require('./app/routes/schedule.routes.js');
const specialtyRouter = require('./app/routes/specialty.routes.js');

app.use(auth, authRouter);
app.use(user, userRouter);
app.use(medic, medicRouter);
app.use(appointment, appointmentRouter);
app.use(schedule, scheduleRouter);
app.use(specialty, specialtyRouter);

module.exports = app;
