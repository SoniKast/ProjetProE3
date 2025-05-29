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
        date_inscription: {      
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,    
        },  
        token_inscription: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        confirmation: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        }
    }, {
        timestamps: false,
    });
    Inscriptions.associate = function (models) {
        Inscriptions.belongsTo(models.evenements, {
            foreignKey: 'id_evenement'
        });
    };
    return Inscriptions;
};