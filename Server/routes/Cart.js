const { verifyTokenAndUser } = require("./VerifyToken")
const Cart = require("../models/Cart")
const Router = require("express").Router()

// ADD TO CART

Router.post("/:id", verifyTokenAndUser, async(req, res)=>{
    const cartExist = await Cart.findOne({userId: req.params.id})
    try {
        if(cartExist){
            if(req.body.items.length > 1){
                const userCart = await Cart.findOneAndUpdate({userId: req.params.id}, {$set : {items: req.body.items}, total: req.body.total}, {new: true})
                res.status(200).json(userCart)
            }
            const userCart = await Cart.findOneAndUpdate({userId: req.params.id}, {$push : {items: req.body.items}, total: req.body.total}, {new: true})
            res.status(200).json(userCart)
        }else{
            const userCart = new Cart({
                userId: req.params.id,
                items: req.body.items,
                total: req.body.total
            })
            const cart = await userCart.save()
            res.status(200).json(cart)
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

// ADD TO CART

Router.post("/add/:id", verifyTokenAndUser, async(req, res)=>{
    const cartExist = await Cart.findOne({userId: req.params.id})
    try {
        if(cartExist){
            const userCart = await Cart.findOneAndUpdate({userId: req.params.id}, {$set : {items: req.body.items}, total: req.body.total}, {new: true})
            res.status(200).json(userCart)
        }else{
            const userCart = new Cart({
                userId: req.params.id,
                items: req.body.items,
                total: req.body.total
            })
            const cart = await userCart.save()
            res.status(200).json(cart)
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

// UPDATE CART ITEMS

Router.put("/:id", verifyTokenAndUser, async(req, res)=>{
    const cartItems = await Cart.findOne({userId: req.params.id})
    const filterProducts = cartItems.items.filter((item)=> item.dishId !== req.body.dishId)
    try {
        const updateCart = await Cart.findOneAndUpdate({userId: req.params.id}, {$set: {items: [...filterProducts, {dishId: req.body.dishId, qty: req.body.qty, amount: req.body.price * req.body.qty}], total: req.body.total}}, {new: true})
        res.status(200).json(updateCart)
    } catch (error) {
        res.status(500).json(error)
    }
})

// DELETE CART ITEMS

Router.put("/delete/:id", verifyTokenAndUser, async(req, res)=>{
    try {
        await Cart.findOneAndUpdate({userId: req.params.id}, {$pull: {items: {dishId: req.body.dishId}}, total: req.body.total})
        res.status(200).json("Item Removed Successfully")
    } catch (error) {
        res.status(500).json(error)
    }
})

// DELETE CART

Router.delete("/:id", verifyTokenAndUser, async(req, res)=>{
    try {
        await Cart.findOneAndDelete({userId: req.params.id})
        res.status(200).json("Cart Removed Successfully")
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET CART

Router.get("/:id", verifyTokenAndUser, async(req, res)=>{
    try {
        const cart = await Cart.find({userId: req.params.id})
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = Router