module.exports = (sequelize, DataTypes) => {
const Service = sequelize.define('Service', {
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
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    fk_category: {
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
    tableName: 'services',
}
);

const Category = require('./category')(sequelize, DataTypes); 
Service.belongsTo(Category, { as: 'category', foreignKey: 'fk_category' });

return Service;
};