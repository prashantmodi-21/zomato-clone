const { Schema, default: mongoose } = require("mongoose");

const restaurantSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true,
    },
    cuisines: {
        type: Array,
        required: true,
    },
    services: {
        type: Array,
        required: true,
    },
    locality: {
        type: Array,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

module.exports = mongoose.model("Restaurant", restaurantSchema)