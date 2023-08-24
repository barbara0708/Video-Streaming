const express=require('express')
const dotenv=require('dotenv').config()
const sequelize=require('sequelize')
const cookieParser=require('cookie-parser')
const db=require('./models')
const userRoutes=require('./routes/userRoutes')

const PORT=process.env.PORT||8080
const Role=db.role
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use('/api/users',userRoutes)


db.sequelize.sync({force:true}).then(()=>{
    console.log('db has been re sync')
    init();
});

function init(){
    Role.create({
        id:1,
        name:'user'
    });
    Role.create({
        id:2,
        name:"moderator"
    });
    Role.create({
        id:3,
        name:"admin"
    });
}


app.listen(PORT,()=>{`Parser is available on ${PORT}`})