const {verifySignUp}=require("../middlewares/index")
const {authJwt}=require("../middlewares/index");
const controller=require("../controllers/authControllers");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.post(
      "/api/auth/signup",
      (req,res)=>{
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted
        controller.signup
      }
    );
  
    app.post("/api/auth/signin",(req,res)=>{ controller.signin});
    app.get("/api/test/all", (req,res)=>{controller.allAccess});

  app.get(
    "/api/test/user",
    (req,res)=>{
    authJwt.verifyToken,
    controller.userBoard
    }
  );

  app.get(
    "/api/test/mod",
    (req,res)=>{
        authJwt.verifyToken, authJwt.isModerator,
    controller.moderatorBoard
    }
    );

  app.get(
    "/api/test/admin",
    (req,res)=>{
    authJwt.verifyToken, authJwt.isAdmin,
    controller.adminBoard
    }
  );
  };
    