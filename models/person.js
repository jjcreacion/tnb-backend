module.exports = (sequelize, DataTypes) => {
    const Person = sequelize.define('Person', {
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
        tableName: 'person',
    });
    return Person;
};
