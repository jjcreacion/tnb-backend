module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define('Profile', {
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
        tableName: 'profile',
    }
);
    return Profile;
};
