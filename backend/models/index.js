const Sequelize=require('sequelize')
const config=require("../config/db.config")

const sequelize=new Sequelize(config.DB,config.USER,config.PASSWORD,{
    host:config.HOST,
    dialect:config.dialect,
    pool:{
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
    }
})

const db={}

db.Sequelize=Sequelize
db.sequelize=sequelize

db.users=require('./userModel')(sequelize,Sequelize)
db.role=require('./roleModel')(sequelize,Sequelize)


sequelize.authenticate().then(()=>{
    console.log("Database is connected")
}).catch((err)=>{
    console.log(err)
})


module.exports=db