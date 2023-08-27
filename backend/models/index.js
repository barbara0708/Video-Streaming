const Sequelize=require('sequelize')
const config=require("../config/db.config")

const sequelize=new Sequelize(config.DB,config.USER,config.PASSWORD,{
    host:config.HOST,
    dialect:config.dialect
})

const db={}

db.Sequelize=Sequelize
db.sequelize=sequelize

db.user=require('./userModel')(sequelize,Sequelize)
db.role=require('./roleModel')(sequelize,Sequelize)

db.role.belongsToMany(db.user,{
    through:"user_roles"
});
db.user.belongsToMany(db.role,{
    through:"user_roles"
});

db.ROLES=['user','admin','moderator']

// sequelize.authenticate().then(()=>{
//     console.log("Database is connected")
// }).catch((err)=>{
//     console.log(err)
// })


module.exports=db