/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/connectionDB');
const MedicAvailability = require('./MedicAvailability');
const Weekday = require('./Weekday');

const MedicAvailabilityWeekday = sequelize.define('MedicAvailabilityWeekday', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    availability_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: MedicAvailability,
            key: 'id'
        }
    },
    weekday_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Weekday,
            key: 'id'
        }
    },
    available: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 0
    },
}, {
    tableName: 'medic_availability_weekdays',
    timestamps: false
});

MedicAvailabilityWeekday.belongsTo(Weekday, { foreignKey: 'weekday_id', as: 'weekday' });
MedicAvailabilityWeekday.belongsTo(MedicAvailability, { foreignKey: 'availability_id' });

module.exports = MedicAvailabilityWeekday;
