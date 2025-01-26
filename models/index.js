const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize.DataTypes);
db.Profile = require('./profile')(sequelize, Sequelize.DataTypes);
db.Person = require('./person')(sequelize, Sequelize.DataTypes);

module.exports = db;