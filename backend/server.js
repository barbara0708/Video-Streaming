const express=require('express')
const cors=require('cors')
const dotenv=require('dotenv').config()
const sequelize=require('sequelize')
const db=require('./models')
const router=require('./routes/userRoutes')

const PORT=8080
const Role=db.role
const app=express()

 var corsOptions = {
     origin: "http://localhost:8081"
   };
  
 app.use(cors(corsOptions));
 app.use(function(req,res,next){
     res.header(
         "Access-Control-Allow-Headers",
         "x-access-token, Origin, Content-Type, Accept"
     );
     next();
 });
app.use(express.urlencoded({extended:true}))
//app.use(cookieParser())

app.use("/",router)

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

app.listen(PORT,()=>console.log(`Parser is available on ${PORT}`))