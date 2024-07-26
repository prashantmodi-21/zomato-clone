const { body, validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const Router = require("express").Router()
const CryptoJS = require("crypto-js");
const { verifyGoogleToken } = require("./VerifyToken");
const admin = require("../firebase")


// REGISTER

Router.post("/register", [body('username').isLength({min: 6}), body('email').isEmail(), body('password').isLength({min: 6})], async(req, res)=>{
    const result = validationResult(req)

    if(!result.isEmpty()){
        res.status(400).json("Enter Valid Values")
    }else{
        const encrypted = CryptoJS.AES.encrypt(req.body.password.toString(), process.env.PASS_KEY).toString();
        const user = new User({username: req.body.username, restaurantId: req.body.restId, name: req.body.name, phone: req.body.phone, email: req.body.email, password: encrypted, isAdmin: req.body.isAdmin})
        try {
            const newUser = await user.save()
            const token = jwt.sign({id: newUser._id}, process.env.JWT_KEY, {expiresIn: "1d"})
            const {password, ...usr} = newUser._doc
            res.status(201).json({...usr, token})
        } catch (error) {
            res.status(500).json(error)
        }
    }
})

// LOGIN

Router.post("/login", async(req, res)=>{
        try {
            const user = await User.findOne({$or: [{username: req.body.userId}, {email: req.body.userId}]})
            const realPass = CryptoJS.AES.decrypt(user.password, process.env.PASS_KEY).toString(CryptoJS.enc.Utf8)
            
            if(!user){res.status(401).json('Enter Valid Username or Email'); return}

            if(req.body.password.toString() !== realPass){ res.status(401).json('Enter Correct Password'); return}

            const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_KEY, {expiresIn: "1d"})
            
            const {password, ...others} = user._doc
            admin.auth().createCustomToken(user._id.toString())
            .then((customToken) => {

              res.status(200).json({...others, token, customToken})
            });
            
            }
        catch (error) {
            res.status(500).json(error)
        }
})
  
  Router.post("/google", verifyGoogleToken, async (req, res) => {
    const {name, email, uid } = req.user;
  
    let userExist = await User.findOne({ gid: uid });
  
    if (!userExist) {
      const newUser = new User({ username: email.slice(0, email.indexOf("@")), name, email, gid: uid });
      const result = await newUser.save();
      const token = jwt.sign({id: newUser._id}, process.env.JWT_KEY, {expiresIn: "1d"})
      const {...user} = result._doc
      res.status(200).json({...user, token})
    }else{
      const token = jwt.sign({id: userExist._id}, process.env.JWT_KEY, {expiresIn: "1d"})
      const {...user} = userExist._doc
      res.status(200).json({...user, token})
    }
  });



module.exports = Router