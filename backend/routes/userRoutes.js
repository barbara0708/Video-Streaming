const {verifySignUp}=require("../middlewares/index")
const {authJwt}=require("../middlewares/index");
const controller=require("../controllers/authControllers");
const router=require("express").Router()


    router.post("/api/auth/signup",function(req,res){
        
       verifySignUp.checkDuplicateUsernameOrEmail
       verifySignUp.checkRolesExisted  
       controller.signup
       console.log(req.body)
        res.json(req.body)
    }
    );
    router.post("/api/auth/login",function(req,res){controller.login});

    router.get("/api/test/all",controller.allAccess);
    router.get("/api/test/user",[authJwt.verifyToken],
    controller.userBoard
    );
    router.get(
        "api/test/mod",
        [authJwt.verifyToken,authJwt.isModerator],
        controller.moderatorBoard
    );
    router.get(
        "api/test/admin",
        [authJwt.verifyToken,authJwt.isAdmin],
        controller.adminBoard
    );
module.exports=router;