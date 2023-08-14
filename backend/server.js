const express=require('express')
const dotenv=require('dotenv').config()
const sequelize=require('sequelize')
const cookieParser=require('cookie-parser')
const db=require('./models')
const userRoutes=require('./routes/userRoutes')

const PORT=process.env.PORT||8080
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

db.sequelize.sync({force:true}).then(()=>{
    console.log('db has been re sync')
});

app.use('api/users',userRoutes)

app.listen(PORT,()=>{`Parser is available on ${PORT}`})