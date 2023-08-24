const express=require('express')
const dotenv=require('dotenv').config()
const sequelize=require('sequelize')
const cookieParser=require('cookie-parser')
const db=require('./models')
const userRoutes=require('./routes/userRoutes')

const PORT=8080
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use('/api/users',userRoutes)


db.sequelize.sync({force:true}).then(()=>{
    console.log('db has been re sync')
});


app.listen(PORT,()=>{`Parser is available on ${PORT}`})