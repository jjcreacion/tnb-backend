const { Sequelize } = require('sequelize');
require('dotenv').config();

const data_conf = {
    username: process.env.USERNAME_MYSQL,
    password: process.env.PASSWORD_MYSQL,
    db_name: process.env.DB_NAME,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
}

const sequelize = new Sequelize(data_conf.db_name,data_conf.username,data_conf.password,{
    host: data_conf.host,
    dialect: data_conf.dialect,
});

module.exports = sequelize;