const express =require('express')
const db=require('../models')
const User=db.users

const saveUser=async(res,req,next)=>{

    try{
        const username=await User.FindOne({
            where:{
                'username':req.body.username
            }
        })
        if(username){
            res.json(404).send("This username already exists.")
        }
        const emailCheck=await User.FindOne({
            where:{
                email:req.body.email
            }
        })
        if(emailCheck){
            res.json(409).send("Authentication failed.")
        }
        next();
    }catch(error){
        console.log(error);
    }

};

module.exports={
    saveUser,
}