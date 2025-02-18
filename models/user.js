const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        validate_email: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        validate_phone: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        fk_profile: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        fk_person: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE, 
            allowNull: false, 
            defaultValue: DataTypes.NOW 
        },
        updatedAt: {
            type: DataTypes.DATE, 
            allowNull: false, 
            defaultValue: DataTypes.NOW 
        }
    },
    { 
        tableName: 'users',
        hooks: {
          beforeCreate: async (user) => {
            const saltRounds = 10; 
            const hashedPassword = await bcrypt.hash(user.password, saltRounds);
            user.password = hashedPassword;
          },
        }
    },
    
);
    const Person = require('./person')(sequelize, DataTypes); 
    const Profile = require('./profile')(sequelize, DataTypes); 

    User.belongsTo(Person, { as: 'person', foreignKey: 'fk_person' });
    User.belongsTo(Profile, { as: 'profile', foreignKey: 'fk_profile' });

    return User;
};
