module.exports = (sequelize, DataTypes) => {  
    const News = sequelize.define(
        "news", 
        {  
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        titre: {      
            type: DataTypes.STRING,
            allowNull: false,
        },    
        description: {      
            type: DataTypes.STRING,      
            allowNull: false,    
        },    
        date_creation: {      
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,    
        },  
    }, {
        timestamps: false,
    });
    return News;
};
