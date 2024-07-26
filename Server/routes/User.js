const Router = require("express").Router()
const CryptoJS = require("crypto-js")
const User = require("../models/User")
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./VerifyToken")

// ADD USER

Router.post("/", verifyTokenAndAdmin, async(req, res)=>{
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password.toString(), process.env.PASS_KEY).toString()
    }
    try {
        const user = new User({
            username: req.body.username,
            name: req.body.name,
            restaurantId: req.body.restaurantId,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            isAdmin: req.body.isAdmin
        })
        const {password, ...addedUser} = await user.save()
        res.status(201).json(addedUser)
    } catch (error) {
        res.status(500).json(error)
    }
})
// UPDATE USER

Router.put("/:id", verifyTokenAndAuthorization, async(req, res)=>{
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password.toString(), process.env.PASS_KEY).toString()
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(201).json(updatedUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

// DELETE USER

Router.delete("/:id", verifyTokenAndAuthorization, async(req, res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User Deleted Successfully")
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET ALL USERS

Router.get("/", verifyTokenAndAdmin, async(req, res)=>{
    const query = req.query.new
    try {
        const users = query ? await User.find({}).sort({_id: -1}).limit(5) : await User.find({})
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET USERS STATS

Router.get("/stats", verifyTokenAndAdmin, async(req, res)=>{
    const lastSixMonths = new Date()
    lastSixMonths.setMonth(lastSixMonths.getMonth() - 6)
    try {
        const data = await User.aggregate([
            {$match: {
                createdAt: {$gte: lastSixMonths},
            }},
            {
                $project: {
                    month: {$month: "$createdAt"},
                }
            },
            {
                $group: {
                    _id: "$month",
                    totalUsers: {$sum: 1}
                }
            }
        ])
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET A USER

Router.get("/:id", verifyTokenAndAdmin, async(req, res)=>{
    try {
        const user = await User.findById(req.params.id)
        const {password, ...other} = user._doc
        res.status(200).json(other)
    } catch (error) {
        res.status(500).json(error)
    }
})



module.exports = Router