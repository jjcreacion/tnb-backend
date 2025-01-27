const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tnb-db','root','',{
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;