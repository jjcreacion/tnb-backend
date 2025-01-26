const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nombre de la bd','usuario','password',{
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;