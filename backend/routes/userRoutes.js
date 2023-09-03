const path=require('path')
const {verifySignUp}=require("../middlewares/index")
const {authJwt}=require("../middlewares/index");
const {login,signup}=require("../controllers/userControllers");
const router=require("express").Router()
const {allAccess,userBoard,adminBoard,moderatorBoard}=require("../controllers/authControllers")

const filePath='./videos/SampleVideo_1280x720_1mb.mp4'
const fs=require('fs')

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
  router.get("/display-video",(req, res) => {
    res.setHeader("content-type", "video/mp4");
    
    fs.stat(filePath, (err, stat) => {
        if (err) {
            console.error(`File stat error for ${filePath}.`);
            console.error(err);
            res.sendStatus(500);
            return;
        }

        res.setHeader("content-length", stat.size);

        const fileStream = fs.createReadStream(filePath);
        fileStream.on("error", error => {
            console.log(`Error reading file ${filePath}.`);
            console.log(error);
            res.sendStatus(500);
        });

        fileStream.pipe(res)
    });
});

module.exports=router;