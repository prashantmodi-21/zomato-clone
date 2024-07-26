const jwt = require("jsonwebtoken")
const admin = require("../firebase")

const verifyToken = (req, res, next)=>{
    const authToken = req.headers.token
    if(authToken){
        const token = authToken.split(" ")[1]
        jwt.verify(token, process.env.JWT_KEY, (err, user)=>{
            if(err) return res.status(403).json("Enter Valid Token");
            req.user = user;
            next();
        })
    }else{
        res.status(401).json("You are not Authenticated")
    }
}

const verifyTokenAndAuthorization = (req, res, next)=>{
    verifyToken(req, res, ()=>{    
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            res.status(403).json("You are not not a Valid User")
        }
    })
}

const verifyTokenAndUser = (req, res, next)=>{
    verifyToken(req, res, ()=>{    
        if(req.user.id === req.params.id){
            next();
        }else{
            res.status(403).json("You are not a Valid User")
        }
    })
}
const verifyTokenAndRestAdmin = (req, res, next)=>{
    verifyToken(req, res, ()=>{   
        if(req.user.id === req.body.userId && req.user.isAdmin){
            next();
        }else{
            res.status(403).json("You are not a Valid User")
        }
    })
}

const verifyTokenAndAdmin = (req, res, next)=>{
    verifyToken(req, res, ()=>{    
        if(req.user.isAdmin){
            next();
        }else{
            res.status(403).json("You are not Admin Authorised")
        }
    })
}

const verifyGoogleToken = async(req, res, next)=>{
    const idToken = req.headers.authorization;
  
    if (!idToken) {
      return res.status(401).send("Unauthorized");
    }
  
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.user = decodedToken;
      next();
    } catch (error) {
      return res.status(401).send("Unauthorized");
    }
  }

module.exports = {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyTokenAndUser, verifyTokenAndRestAdmin, verifyGoogleToken};