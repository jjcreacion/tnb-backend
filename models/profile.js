module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,    
        },
        role: {
            type: DataTypes.INTEGER,
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
