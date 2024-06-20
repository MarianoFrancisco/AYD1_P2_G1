/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/connectionDB');
const Gender = require('./Gender');
const Role = require('./Role');
const Medic = require('./Medic');
const Patient = require('./Patient');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    first_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    gender_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Gender,
            key: 'id'
        }
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    birth_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    photo: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Role,
            key: 'id'
        }
    }
}, {
    tableName: 'users',
    timestamps: false
});

User.belongsTo(Gender, { foreignKey: 'gender_id', as: 'gender' });
User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });
User.hasOne(Medic, { foreignKey: 'user_id', as: 'additionalAttributeMedic' });
User.hasOne(Patient, { foreignKey: 'user_id', as: 'additionalAttributePatient' });

module.exports = User;