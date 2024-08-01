const express = require('express')
const Router = express.Router()
const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);
const Menu = require('../models/Menu');
const Order = require('../models/Order');
const endpointSecret = process.env.SECRET_KEY;


Router.post("/checkout", async(req, res)=>{
    const dishesItems = await Menu.find()
    const session = await stripe.checkout.sessions.create({
        line_items: 
            req.body.cartItems.map((item)=>{
                return {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                          name: dishesItems[dishesItems.findIndex(i=> i._id.toString().includes(item.dishId))]?.dish,
                        },
                        unit_amount: (item.amount/item.qty) * 100,
                      },
                      quantity: item.qty,
                }
            }
            ),
        metadata: {
          userId: req.body?.userId,
          cartItems: JSON.stringify(req.body.cartItems)
        },
        phone_number_collection: {
            enabled: true,
          },
        mode: 'payment',
        shipping_address_collection: {
            allowed_countries: ['IN'],
          },
        success_url: `${process.env.YOUR_DOMAIN}/order/success`,
        cancel_url: `${process.env.YOUR_DOMAIN}/order/canceled`,
      });
      res.json(session.url);
})

const fulfillOrder = async(session) => {
  const parsedItems = JSON.parse(session.metadata.cartItems)
  const menuItems = await Menu.find()
  const items = menuItems.filter(item=> parsedItems.find(i=> item._id.toString().includes(i.dishId)))
  
   // Group items by restaurantId
   const itemsByRestaurant = items.reduce((acc, item) => {
    if (!acc[item.restaurantId]) {
      acc[item.restaurantId] = [];
    }
    acc[item.restaurantId].push(item);
    return acc;
  }, {});

  // Create an order for each restaurant
  for (const [restaurantId, restaurantItems] of Object.entries(itemsByRestaurant)) {
    const order = new Order({
      userId: session.metadata.userId,
      restaurantId: restaurantId,
      name: session.customer_details.name,
      email: session.customer_details.email,
      phone: session.customer_details.phone,
      items: restaurantItems.map((item, index) => {
        const lineItem = parsedItems.find(li => item._id.toString().includes(li.dishId));
        return {
          dishId: item._id,
          dishName: item.dish,
          qty: lineItem.qty,
          amount: lineItem.amount
        };
      }),
      total: restaurantItems.reduce((sum, item) => {
        const lineItem = parsedItems.find(li => item._id.toString().includes(li.dishId));
        return sum + lineItem.amount;
      }, 0),
      address: {
        line1: session.customer_details.address.line1,
        line2: session.customer_details.address.line2,
        city: session.customer_details.address.city,
        state: session.customer_details.address.state,
        pin: session.customer_details.address.postal_code
      }
    });

    const result = await order.save()
  }
}

Router.post('/webhook', async(req, res) => {
  const payload = req.rawBody;
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
    const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
      event.data.object.id,
      {expand: ['line_items'],}
    );

    // Fulfill the purchase...
    fulfillOrder(sessionWithLineItems);
  }

  res.status(200).end();
});

module.exports = Router