const express = require("express")
const app = express()
require('dotenv').config()
const cors = require("cors")
const { default: mongoose } = require("mongoose")
const Auth = require("./routes/Auth")
const User = require("./routes/User")
const Restaurants = require("./routes/Restaurants")
const MenuItems = require("./routes/MenuItems")
const Cart = require("./routes/Cart")
const Order = require("./routes/Order")
const Payment = require("./routes/Payment")
const bodyParser = require("body-parser")

mongoose.connect(process.env.DB_URI).then(()=>{
    console.log("DB Connected Successfully")
}).catch((error)=>{
    console.log(error)
})
app.use(cors())
app.use(
    bodyParser.json({
        verify: function(req, res, buf) {
            req.rawBody = buf;
        }
    })
);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use("/auth", Auth)
app.use("/user", User)
app.use("/restaurant", Restaurants)
app.use("/menu", MenuItems)
app.use("/cart", Cart)
app.use("/order", Order)
app.use("/payment", Payment)

app.listen(process.env.PORT || 5000, ()=>{
    console.log(`Server Running on Port: ${process.env.PORT}`)
})