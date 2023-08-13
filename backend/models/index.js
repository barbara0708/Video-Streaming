const {Sequelize, DataTypes}=require('sequelize')

const sequelize=new Sequelize('postgresql://localhost/Video-Streaming-Platform?user=postgres&password=Kalambur0708',{dialect: "postgres"})

sequelize.authenticate().then(()=>{
    console.log("Database is connected")
}).catch((err)=>{
    console.log(err)
})

const db={}
db.Sequelize=Sequelize
db.sequelize=sequelize

db.users=require('./userModel')(sequelize,DataTypes)
module.exports=db