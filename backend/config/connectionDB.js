/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
  port: process.env.MYSQL_PORT,
  logging: false
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database established successfully.');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
})();

module.exports = sequelize;