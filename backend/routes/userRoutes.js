const path=require('path')
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
  
  router.post("/api/auth/login",login);

  router.get("/api/test/all", allAccess);
  router.get("/api",(req,res)=>{
    res.json({message:"Welcome to the Video-Streaming Platform"})
  })
  router.get(
    "/api/test/user",
    [authJwt.verifyToken],
    userBoard
  );

  router.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    moderatorBoard
    );

  router.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    adminBoard
  );

module.exports=router;