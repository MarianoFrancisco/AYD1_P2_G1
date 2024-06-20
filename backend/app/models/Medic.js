/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/connectionDB');
const Specialty = require('./Specialty');

const Medic = sequelize.define('Medic', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    specialty_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Specialty,
            key: 'id'
        }
    },
    clinic_address: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'medics',
    timestamps: false
});

Medic.belongsTo(Specialty, { foreignKey: 'specialty_id' });

module.exports = Medic;
