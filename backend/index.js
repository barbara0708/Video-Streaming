const express=require('express')
const dotenv=require('dotenv').config()
const sequelize=require('sequelize')
const cookieParser=require('cookie-parser')

const PORT=process.env.PORT||8080
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.listen(PORT,()=>{`Parser is available on ${PORT}`})