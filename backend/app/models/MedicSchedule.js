/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/connectionDB');

const MedicSchedule = sequelize.define('MedicSchedule', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    medic_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'medics',
            key: 'id'
        }
    },
    weekday_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'weekdays',
            key: 'id'
        }
    },
    start_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    end_time: {
        type: DataTypes.TIME,
        allowNull: false
    }
}, {
    tableName: 'medic_schedules',
    timestamps: false
});

module.exports = MedicSchedule;