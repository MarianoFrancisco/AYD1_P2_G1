/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/connectionDB');
const AvailableTimeSlot = require('./AvailableTimeSlot');
const AppointmentStatus = require('./AppointmentStatus');

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
    medic_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'medics',
            key: 'id'
        }
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    time_slot_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: AvailableTimeSlot,
            key: 'id'
        }
    },
    reason: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: AppointmentStatus,
            key: 'id'
        }
    }
}, {
    tableName: 'appointments',
    timestamps: false
});

Appointment.belongsTo(AvailableTimeSlot, { foreignKey: 'time_slot_id' });
Appointment.belongsTo(AppointmentStatus, { foreignKey: 'status_id' });

module.exports = Appointment;
