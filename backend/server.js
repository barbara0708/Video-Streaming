const express=require('express')
const path=require("path")
const cors=require('cors')
const dotenv=require('dotenv').config()
const db=require('./models')

const router=require('./routes/userRoutes')


const PORT=process.env.PORT||8080
const Role=db.role

const app=express()
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/',router)
app.use(express.static(path.resolve(__dirname,"../client/build")))

db.sequelize.sync().then(()=>{
    console.log('db has been re sync')
    init();
});

function init(){
    Role.findOrCreate({
        where:{
            name:"user"
        },
        defaults:{
        id:1,
        name:'user'
    }});
    Role.findOrCreate(
        {
            where:{
                name:"moderator"
            },
            defaults:{
        id:2,
        name:"moderator"
    }});
    Role.findOrCreate({
        where:{
            name:"admin"
        },
        defaults:{
        id:3,
        name:"admin"
    }});
}

app.listen(PORT,()=>{console.log(`Parser is available on ${PORT}`)})