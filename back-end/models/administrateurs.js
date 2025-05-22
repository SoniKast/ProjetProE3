module.exports = (sequelize, DataTypes) => {  
    const Administrateurs = sequelize.define(
        "administrateurs", 
        {    
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        nom: {      
            type: DataTypes.STRING,
        },    
        email: {      
            type: DataTypes.STRING,   
            allowNull: false,    
            validate: {
                isEmail: true,
            },
            unique: true, 
        },    
        mot_de_passe: {      
            type: DataTypes.STRING,
            allowNull: false,    
            validate: {
              is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/,
            },
        }, 
    }, {
        timestamps: false,
    });
    return Administrateurs;
};