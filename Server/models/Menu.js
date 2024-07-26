const { Schema, default: mongoose } = require("mongoose");

const menuSchema = new Schema({
    restaurantId: {
        type: String,
        required: true
    },
    dish: {
        type: String,
        required: true,
        unique: true
    },
    image:{
        type: String,
    },
    category: {
        type: Array,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating:{
        type: Number,
    },
},{timestamps: true})

module.exports = mongoose.model("MenuItem", menuSchema) 