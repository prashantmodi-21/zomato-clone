const { verifyTokenAndRestAdmin, verifyTokenAndAdmin } = require("./VerifyToken")
const Menu = require("../models/Menu")
const Router = require("express").Router()

// ADD MENUITEM

Router.post("/", verifyTokenAndAdmin, async(req, res)=>{
    const item = new Menu({
        restaurantId: req.body.restId,
        dish: req.body.dish,
        image: req.body.image,
        category: req.body.category,
        price: req.body.price,
        rating: req.body.rating
    })

    try {
        const newItem = await item.save()
        res.status(200).json(newItem)
    } catch (error) {
        res.status(500).json(error)
    }
})

// UPDATE MENUITEM

Router.put("/:id", verifyTokenAndAdmin, async(req, res)=>{
    try {
        const updatedItem = await Menu.findByIdAndUpdate(req.params.id, {$set: req.body}, {timestamps: true});
        res.status(200).json(updatedItem)
    } catch (error) {
        res.status(500).json(error)
    }
})

// DELETE MENUITEM

Router.delete("/:id", verifyTokenAndAdmin, async(req, res)=>{
    try {
        const deleteItem = await Menu.findByIdAndDelete(req.params.id)
        res.status(200).json("User Deleted Successfully")
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET RESTAURANT MENUITEMS

Router.get("/:id", async(req, res)=>{
    try {
        const menuItems = await Menu.find({restaurantId: req.params.id})
        res.status(200).json(menuItems)
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET ALL MENUITEMS

Router.get("/", async(req, res)=>{
    const query = req.query.new
    try {
        const menuItems = query ? await Menu.find().sort({_id: -1}) : await Menu.find()
        res.status(200).json(menuItems)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = Router