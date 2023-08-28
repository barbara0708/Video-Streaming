const {verifySignUp}=require("../middlewares/index")
const {authJwt}=require("../middlewares/index");
const {login,signup}=require("../controllers/userControllers");
const router=require("express").Router()
const {allAccess,userBoard,adminBoard,moderatorBoard}=require("../controllers/authControllers")

    router.post(
      "/api/auth/signup",
      [verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted],
      signup
      
    );
  
    router.post("/api/auth/signin",login);
    router.get("/api/test/all", (req,res)=>{controller.allAccess});

  router.get(
    "/api/test/user",
    (req,res)=>{
    authJwt.verifyToken,
    controller.userBoard
    }
  );

  router.get(
    "/api/test/mod",
    (req,res)=>{
        authJwt.verifyToken, authJwt.isModerator,
    controller.moderatorBoard
    }
    );

  router.get(
    "/api/test/admin",
    (req,res)=>{
    authJwt.verifyToken, authJwt.isAdmin,
    controller.adminBoard
    }
  );

module.exports=router;