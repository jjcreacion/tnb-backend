
/* 
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
    dialectOptions: {
        ssl: false, 
    },
});

module.exports = sequelize; */

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.USERNAME_MYSQL,
    process.env.PASSWORD_MYSQL,
    {
        host: process.env.HOST,
        dialect: process.env.DIALECT,
    }
);

module.exports = sequelize;