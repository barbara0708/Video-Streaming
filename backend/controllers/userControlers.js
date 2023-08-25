var bcrypt=require('bcrypt')
const config=require('../config/auth.config')
const db=require("../models")
var jwt=require('jsonwebtoken')
const Role=db.role
const User=db.user
const Op=db.Sequelize.Op


exports.signup=(req,res)=>{
   
        User.create({
            username:req.body.username,
            email:req.body.email,
            password:bcrypt.hash(req.body.password,10)
        })
        .then(user=>{
            if(req.body.roles){
                Role.findAll({
                    where:{
                        name:{
                            [Op.or]:req.body.roles
                        }
                    }
                }).then(roles=>{
                    user.setRoles(roles).then(()=>{
                        res.send({message:"User was registered successfully!"})
                    });
                });
            }else{
                user.setRoles([1]).then(()=>{
                    res.send({message:"User was registered successfully!"});
                });
            }
        })
        .catch(err=>{
            res.status(500).send({ message: err.message });
        });
};

exports.login=(req,res)=>{
        User.findOne({
            where:{
                email:req.body.email
            }
        }).then(user=>{
            if(!user){
                return res.status(404).send({message: "User Not found."});
            }
        

        var passwordIsValid=bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if(!passwordIsValid){
            return res.status(401).send({
                accessToken:null,
                message:"Invalid Password!"
            });
        }
        const token=jwt.sign(
            {id:user.id},
            config.secret,
            {
                algorithm:'HS256',
                allowInsecureKeySizes:true,
                expiresIn:86400
            })
        res.cookie('jwt',token,{maxAge:1*60*60*24,httpOnly:true})
        var authorities=[];
        user.getRoles().then(roles=>{
            for(let i=0;i<roles.length;i++){
                authorities.push("ROLE_"+roles[i].name.toUpperCase());
            }
            res.status(200).send({
                id:db.user.id,
                username:user.username,
                email:user.email,
                roles:authorities,
                accessToken:token
            })
        })
    })
    .catch(err=>{
        res.status(500).send({ message: err.message });
    })
           
}
