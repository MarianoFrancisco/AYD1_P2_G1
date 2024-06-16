/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/connectionDB');
const User = require('./User');
const MedicAvailabilityWeekday = require('./MedicAvailabilityWeekday');

const MedicAvailability = sequelize.define('MedicAvailability', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    medic_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
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
    tableName: 'medic_availabilities',
    timestamps: false
});

MedicAvailability.belongsTo(User, { foreignKey: 'medic_id', as: 'medic' });
MedicAvailability.hasMany(MedicAvailabilityWeekday, { foreignKey: 'availability_id', as: 'medic_availability_weekdays' });

module.exports = MedicAvailability;
