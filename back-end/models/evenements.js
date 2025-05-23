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
        description_detail: {
            type: DataTypes.TEXT,
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
    }, {
        timestamps: true,
        createdAt: 'date_creation',
        updatedAt: 'date_modification',
    }); 
    Evenements.associate = function (models) {
        Evenements.hasMany(models.inscriptions, {
            foreignKey: 'id_evenement', foreignKeyConstraint: true 
        });
    };
    return Evenements;
};