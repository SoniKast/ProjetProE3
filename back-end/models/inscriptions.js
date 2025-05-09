module.exports = (sequelize, DataTypes) => {  
    const Inscriptions = sequelize.define(
        "inscriptions", 
        {
        nom: {      
            type: DataTypes.STRING,
            allowNull: false,
        },    
        email: {      
            type: DataTypes.STRING,   
            allowNull: false,    
            validate: {
                isEmail: true,
            },
        }, 
        date_creation: {      
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,    
        },  
    });  
    Inscriptions.associate = function (models) {
        Inscriptions.belongsTo(models.Evenements);
    };
    return Inscriptions;
};