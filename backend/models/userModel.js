
module.exports=(sequelize,DataTypes)=>{
    const User=sequelize.define("user",{
        username:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            unique:true,
            allowNull:false,
            isEmail:true,
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        },
    },{timestamps:true});
    return User
}