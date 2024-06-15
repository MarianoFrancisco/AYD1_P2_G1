/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/connectionDB');

const Appointment = sequelize.define('Appointment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'patients',
            key: 'id'
        }
    },
    doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'doctors',
            key: 'id'
        }
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    reason: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'appointment_statuses',
            key: 'id'
        }
    }
}, {
    tableName: 'appointments',
    timestamps: false
});

module.exports = Appointment;