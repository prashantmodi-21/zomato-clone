const { Schema, default: mongoose } = require("mongoose");

const cartSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    items: [
        {
            dishId:{
                type: String,
                required: true
            },
            qty:{
                type: Number,
                default: 1
            },
            amount:{
                type: Number,
                required: true
            }
        }
    ],
    total: {
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model("Cart", cartSchema)