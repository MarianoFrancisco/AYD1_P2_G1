/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/connectionDB');
const User = require('./User');

const Medic = sequelize.define('Medic', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    specialty_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'specialties',
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

Medic.belongsTo(User, { foreignKey: 'user_id' });
User.hasOne(Medic, { foreignKey: 'user_id' });

module.exports = Medic;
