module.exports=(sequelize,DataTypes)=>{

    const User=sequelize.define("User",{
        
        username:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        password_hash:{
            type:DataTypes.STRING,
            allowNull:false,

        }
    });
    User.associate=(models)=>{
    User.hasMany(models.Posts,{
            onDelete:"cascade",
        });
    User.hasMany(models.Likes,{
            onDelete:"cascade",
        })
    };
    return User;
};
