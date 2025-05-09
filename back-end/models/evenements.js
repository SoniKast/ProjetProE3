module.exports = (sequelize, DataTypes) => {  
    const Evenements = sequelize.define(
        "evenements", 
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
        date_debut: {      
            type: DataTypes.DATE,
            allowNull: false,    
        },   
        date_fin: {      
            type: DataTypes.DATE,
            allowNull: false,    
        },  
        categorie: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date_creation: {      
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,    
        },  
        date_modification: {      
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,    
        },    
    });  
    Evenements.associate = function (models) {
        Evenements.hasMany(models.inscriptions);
    };
    return Evenements;
};