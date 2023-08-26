const express=require('express')
const cors=require('cors')
const dotenv=require('dotenv').config()
const sequelize=require('sequelize')
const cookieParser=require('cookie-parser')
const db=require('./models')
const userRoutes=require('./routes/userRoutes')

const PORT=process.env.PORT||8080
const Role=db.role
let app=express()

var corsOptions = {
    origin: "http://localhost:8081"
  };
  
app.use(cors(corsOptions));

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
// app.use('/api/users',userRoutes)

app.get("/",(req,res)=>{
    res.json({message:"Welcome to the Video Streaming platform"})
})
require('./routes/userRoutes')(app)

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