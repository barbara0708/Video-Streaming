const {Sequelize, DataTypes}=require('sequelize')

const sequelize=new Sequelize('Video-Streaming-Platform','postgres','Kalambur0708',{
    host:'localhost',
    dialect:'postgres'
})

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