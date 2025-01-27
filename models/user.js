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
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        validate_email: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING,
            unique: true,
        },
        validate_phone: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
        },
        fk_profile: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
        },
        fk_person: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
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
    }
);
    return User;
};
