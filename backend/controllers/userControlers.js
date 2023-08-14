const bcrypt=require('bcrypt')
const db=require("../models")
const jwt=require('jsonwebtoken')

const User=db.users

const signup=async(req,res)=>{
    try{
        const {username,email,password}=req.body
        const data={
            username,
            email,
            password: await bcrypt.hash(password,10)
        }
        const user=await User.create(data)
        if(user){
            let token=jwt.sign({id:user.id},process.env.secretKey,{expiresIn:1*60*60*24*1000})
            res.cookie('jwt',token,{maxAge:1*60*60*24,httpOnly:true})
            console.log("user",JSON.stringify(user,null,2))
            console.log(token)
            return res.status(201).send(user)
        
        }else{
            return res.status(409).send("Details are incorrect.") 
        }
    }catch(err){
        console.log(err)
    }
};

const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        const user=await User.findOne({
            where:{
                email:email
            }
        });

        if(user){
            
        }else{
            return res.status(401).send("Authentication failed.")
        }

    } catch (error) {
        console.log(error)
    }
}