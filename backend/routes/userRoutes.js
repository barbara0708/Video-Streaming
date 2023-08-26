const {verifySignUp}=require("../middlewares/index")
const {authJwt}=require("../middlewares/index");
const controller=require("../controllers/authControllers");


module.exports=function(app){
    
    app.post("/api/auth/signup",function(req,res){
        
      //verifySignUp.checkDuplicateUsernameOrEmail
      //verifySignUp.checkRolesExisted  
      controller.signup
    
    }
    );
    app.post("/api/auth/login",function(req,res){controller.login});

    app.get("/api/test/all",controller.allAccess);
    app.get("/api/test/user",[authJwt.verifyToken],
    controller.userBoard
    );
    app.get(
        "api/test/mod",
        [authJwt.verifyToken,authJwt.isModerator],
        controller.moderatorBoard
    );
    app.get(
        "api/test/admin",
        [authJwt.verifyToken,authJwt.isAdmin],
        controller.adminBoard
    );
};