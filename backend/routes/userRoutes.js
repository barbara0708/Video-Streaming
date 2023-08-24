const express=require('express')
const userController=require("../controllers/userControlers")
const {signup,login}=userController
const userAuth=require('../middlewares/userAuth')

const router=express.Router()

router.post('/signup',userAuth.saveUser,signup)
router.post('/login',login)
router.get('/main',(req,res)=>{
    res.send({message:"Welcome to Video-Streaming Platform"})
})

module.exports=router
