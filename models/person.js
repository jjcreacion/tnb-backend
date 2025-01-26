module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        first_name: {
            type: DataTypes.STRING,
        },
        middle_name: {
            type: DataTypes.STRING,
        },
        last_name: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
        },
        date_of_birth: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        created_at: {
            type: DataTypes.STRING,
        },
        updated_at: {
            type: DataTypes.STRING,
        },
    });
    return User;
};
