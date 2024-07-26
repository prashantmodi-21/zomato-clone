const { Schema, default: mongoose } = require("mongoose");


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    restaurantId: {
        type : String,
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        unique: true
    },
    password: {
        type: String,
    },
    gid:{
        type: String,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
},
{timestamps: true}
)

module.exports = mongoose.model('User', userSchema)