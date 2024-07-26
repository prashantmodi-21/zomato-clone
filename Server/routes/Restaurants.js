const { verifyTokenAndAdmin } = require("./VerifyToken")
const Restaurant = require("../models/Restaurants")
const Router = require("express").Router()

// ADD RESTAURANT

Router.post("/", verifyTokenAndAdmin, async(req, res)=>{
    const restaurant = new Restaurant({
        name: req.body.name,
        image: req.body.image,
        cuisines: req.body.cuisines,
        services: req.body.services,
        locality: req.body.locality,
        rating: req.body.rating
    })
    try {
        const newRestaurant = await restaurant.save()
        res.status(201).json(newRestaurant)
    } catch (error) {
        res.status(500).json(error)
    }
})

// UPDATE RESTAURANT

Router.put("/:id", verifyTokenAndAdmin, async(req, res)=>{
    try {
        const updateRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true})
        res.status(201).json(updateRestaurant)
    } catch (error) {
        res.status(500).json(error)
    }
})

// DELETE RESTAURANT

Router.delete("/:id", verifyTokenAndAdmin, async(req, res)=>{
    try {
        const deleteRestaurant = await Restaurant.findByIdAndDelete(req.params.id)
        res.status(200).json("Restaurant Removed Successfully")
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET ALL RESTAURANT

Router.get("/", async(req, res)=>{
    const {query, sort} = req.query
    try {
        if(sort === "newest"){
            const restaurant = await Restaurant.find().sort({createdAt: -1})
            res.status(200).json(restaurant)
        }else if(sort === "rating"){
            const restaurant = await Restaurant.find().sort({rating: -1})
            res.status(200).json(restaurant)
        }else{
            const restaurant = query ? await Restaurant.find().sort({_id: -1}).limit(5) : await Restaurant.find()
            res.status(200).json(restaurant)
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET A RESTAURANT

Router.get("/:id", verifyTokenAndAdmin, async(req, res)=>{
    try {
        const restaurants = await Restaurant.findById(req.params.id)
        res.status(200).json(restaurants)
        
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = Router