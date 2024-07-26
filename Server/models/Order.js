const { Schema, default: mongoose } = require("mongoose");

const orderSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    restaurantId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    items: [
        {
            dishId:{
                type: String,
                required: true
            },
            dishName:{
                type: String,
                required: true
            },
            qty:{
                type: Number,
                default: 1
            },
            amount: {
                type: Number,
                required: true
            }
        }
    ],
    total: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        default: "Pending"
    }
},{timestamps: true})

module.exports = mongoose.model("Order", orderSchema)