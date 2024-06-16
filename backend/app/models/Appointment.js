/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/connectionDB');
const User = require('./User');
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
            model: User,
            key: 'id'
        }
    },
    medic_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
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

Appointment.belongsTo(User, { foreignKey: 'patient_id', as: 'patient' });
Appointment.belongsTo(User, { foreignKey: 'medic_id', as: 'medic' });
Appointment.belongsTo(AvailableTimeSlot, { foreignKey: 'time_slot_id', as: 'available_time_slot' });
Appointment.belongsTo(AppointmentStatus, { foreignKey: 'status_id', as: 'appointment_status' });

module.exports = Appointment;
