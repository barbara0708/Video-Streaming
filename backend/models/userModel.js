
module.exports=(sequelize,Sequelize)=>{
    const User=sequelize.define("user",{
        username:{
            type:Sequelize.STRING,
            allowNull:false
        },
        email:{
            type:Sequelize.STRING,
            unique:true,
            allowNull:false,
            isEmail:true,
        },
        password:{
            type:Sequelize.STRING,
            allowNull:false
        },
    });
    return User
}