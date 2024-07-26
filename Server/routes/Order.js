const Router = require("express").Router()
const Order = require("../models/Order")
const {verifyTokenAndUser, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./VerifyToken")
const Menu = require("../models/Menu")

// ADD ORDER

Router.post("/:id", verifyTokenAndUser, async(req, res)=>{
    let restId;
    const {items} = req.body
    try {
    for(const i in items){
        const {restaurantId} = await Menu.findById(items[i].dishId)
        const order = await Order.findOne({restaurantId})
        if(restId === restaurantId || order){
            await Order.findOneAndUpdate({restaurantId}, {$set: {items: [...order.items, {dishId: items[i].dishId, dishName: items[i].dishName, qty: items[i].qty, price: items[i].price}]}})
        }else{
            const newOrder = new Order({
                userId: req.params.id,
                restaurantId: restaurantId,
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                items: req.body.items[i],
                total: req.body.total,
                address: req.body.address
            })
            await newOrder.save()
        }
        restId = restaurantId
    }
                res.status(200).json("Order Placed Successfully")
            } catch (error) {
                res.status(500).json(error)
            }
    
})

// UPDATE ORDER

Router.put("/:id", verifyTokenAndUser, async(req, res)=>{
    const order = await Order.findById(req.body.id)
    const filterItems = order.items.filter((item)=> item.dishId !== req.body.dishId)
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.body.id, {$set: {items: [...filterItems, {dishId: req.body.dishId, dishName: req.body.dishaName, qty: req.body.qty, price: req.body.price}]}}, {new: true})
        res.status(200).json(updatedOrder)
    } catch (error) {
        res.status(500).json(error)
    }
})

// UPDATE ORDER STATUS

Router.put("/restaurant/:id", verifyTokenAndAdmin, async(req, res)=>{
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, {status: req.body.status}, {new: true})
    res.status(200).json(order)
  } catch (error) {
    res.status(500).json(error)
  }
})

// DELETE ORDER

Router.delete("/:id", verifyTokenAndAuthorization, async(req, res)=>{
    try {
        const deleteOrder = await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order Deleted Successfully")
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET ORDERS

Router.get("/:id", verifyTokenAndUser, async(req, res)=>{
    try {
        const userOrder = await Order.find({userId: req.params.id})
        res.status(200).json(userOrder)
    } catch (error) {
        res.status(500).json(error)
    }
})
// GET RESTAURANTS ORDERS

Router.get("/restaurant/:id", verifyTokenAndAdmin, async(req, res)=>{
  const query = req.query.new
    try {
        const userOrder = query ? await Order.find({restaurantId: req.params.id}).limit(5) : await Order.find({restaurantId: req.params.id})
        res.status(200).json(userOrder)
    } catch (error) {
        res.status(500).json(error)
    }
})

// DELETE RESTAURANTS ORDERS

Router.delete("/restaurant/:id", verifyTokenAndAdmin, async(req, res)=>{
    try {
        const userOrder = await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order Deleted Successfully")
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET ALL ORDERS

Router.get("/", verifyTokenAndAdmin, async(req, res)=>{
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET ALL ORDERS REVENUE

Router.get("/revenue/total", verifyTokenAndAdmin, async(req, res)=>{
    try {
        const revenue = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    amount: {$sum: `$total`}
                }
            }
        ])
        res.status(200).json(revenue)
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET MONTHLY REVENUE

Router.get("/revenue/monthly", verifyTokenAndAdmin, async(req, res)=>{
  const currentDate = new Date();
  const promises = [];
  
  
    try {
      async function getTotalOrderAmountForMonth(month, year) {
        const startDate = new Date(year, month - 1);
        const endDate = new Date(year, month, 0);
      
        const totalAmount = await Order.aggregate([
          {
            $match: {
              createdAt: {
                $gte: startDate,
                $lte: endDate
              }
            }
          },
          {
            $group: {
              _id: null,
              totalAmount: { $sum: '$total' }
            }
          }
        ]);
      
        return totalAmount.length > 0 ? totalAmount[0].totalAmount : 0;
      }

      for (let i = 0; i < 6; i++) {
        const month = currentDate.getMonth() - i;
        const year = currentDate.getFullYear() + (month < 0 ? -1 : 0);
        const adjustedMonth = month < 0 ? 12 + month : month + 1;
      
        promises.push(getTotalOrderAmountForMonth(adjustedMonth, year));
      }

      Promise.all(promises)
      .then(results => {
        let result = []
        for (let i = 0; i < results.length; i++) {
          const monthYear = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1).toLocaleString('default', { month: 'long', year: 'numeric' });
          result.push({monthYear, total: results[i]});
          i > 4 && res.status(200).json(result)
        }
      })
      .catch(err => console.error(err));
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET 30 DAYS REVENUE

Router.get("/revenue/days", verifyTokenAndAdmin, async(req, res)=>{
  async function getDateWiseOrdersTotal() {
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
  
    try {
      const result = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: thirtyDaysAgo, $lte: today }
          }
        },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
            },
            totalAmount: { $sum: "$total" },
            count: { $sum: 1 }
          }
        },
      ]);
  
      // Fill in missing dates with zero totals
      const filledResult = fillMissingDates(result, thirtyDaysAgo, today);
  
      return filledResult;
    } catch (error) {
      console.error('Error fetching date-wise orders total:', error);
      throw error;
    }
  }
  
  function fillMissingDates(result, startDate, endDate) {
    const filledResult = [];
    let currentDate = new Date(startDate);
  
    while (currentDate <= endDate) {
      const dateString = currentDate.toISOString().split('T')[0];
      const existingEntry = result.find(entry => entry._id === dateString);
  
      if (existingEntry) {
        filledResult.push(existingEntry);
      } else {
        filledResult.push({
          _id: dateString,
          totalAmount: 0,
          count: 0
        });
      }
  
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return filledResult;
  }
  
  // Usage
  getDateWiseOrdersTotal()
    .then(result => {
      res.status(200).json(result);
    })
  })

//GET ALL ORDERS SALES

Router.get("/sales/:id", verifyTokenAndAdmin, async(req, res)=>{
    try {
        const sales = await Order.aggregate([
            {$match: {restaurantId: req.params.id}},
            {$group: {
                _id: null,
                amount: {$sum: "$total"}
            }}
        ])
        res.status(200).json(sales)
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET SALES OF LAST SIX MONTHS

Router.get("/sales/monthly/:id", verifyTokenAndAdmin, async(req, res)=>{
  const currentDate = new Date();
  const promises = [];
  
  
    try {
      async function getTotalOrderAmountForMonth(month, year) {
        const startDate = new Date(year, month - 1);
        const endDate = new Date(year, month, 0);
      
        const totalAmount = await Order.aggregate([
          {
            $match: {
              restaurantId: req.params.id,
              createdAt: {
                $gte: startDate,
                $lte: endDate
              }
            }
          },
          {
            $group: {
              _id: null,
              totalAmount: { $sum: '$total' }
            }
          }
        ]);
      
        return totalAmount.length > 0 ? totalAmount[0].totalAmount : 0;
      }

      for (let i = 0; i < 6; i++) {
        const month = currentDate.getMonth() - i;
        const year = currentDate.getFullYear() + (month < 0 ? -1 : 0);
        const adjustedMonth = month < 0 ? 12 + month : month + 1;
      
        promises.push(getTotalOrderAmountForMonth(adjustedMonth, year));
      }

      Promise.all(promises)
      .then(results => {
        let result = []
        for (let i = 0; i < results.length; i++) {
          const monthYear = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1).toLocaleString('default', { month: 'long', year: 'numeric' });
          result.push({monthYear, total: results[i]});
          i > 4 && res.status(200).json(result)
        }
      })
      .catch(err => console.error(err));
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET SALES OF LAST 30 DAYS

Router.get("/sales/days/:id", verifyTokenAndAdmin, async(req, res)=>{

async function getDateWiseOrdersTotal() {
  const today = new Date();
  const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

  try {
    const result = await Order.aggregate([
      {
        $match: {
          restaurantId: req.params.id,
          createdAt: { $gte: thirtyDaysAgo, $lte: today }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          totalAmount: { $sum: "$total" },
          count: { $sum: 1 }
        }
      },
    ]);

    // Fill in missing dates with zero totals
    const filledResult = fillMissingDates(result, thirtyDaysAgo, today);

    return filledResult;
  } catch (error) {
    console.error('Error fetching date-wise orders total:', error);
    throw error;
  }
}

function fillMissingDates(result, startDate, endDate) {
  const filledResult = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dateString = currentDate.toISOString().split('T')[0];
    const existingEntry = result.find(entry => entry._id === dateString);

    if (existingEntry) {
      filledResult.push(existingEntry);
    } else {
      filledResult.push({
        _id: dateString,
        totalAmount: 0,
        count: 0
      });
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return filledResult;
}

// Usage
getDateWiseOrdersTotal()
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    res.status(500)('Error:', error);
  });
})

Router.get("/monthly/:id", verifyTokenAndAdmin, async(req, res)=>{
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // months are zero-indexed

  // Create a start date and end date for the current month
  const startOfMonth = new Date(currentYear, currentMonth - 1, 1);
  const endOfMonth = new Date(currentYear, currentMonth, 1);
    Order.aggregate([
      {
        $match: {
          restaurantId: req.params.id,
          createdAt: {
            $gte: startOfMonth,
            $lt: endOfMonth
          }
        }
      },
      {
        $count: 'totalOrders'
      }
    ])
    .then(result => {
      res.status(200).json(result[0] ? result[0].totalOrders : 0)
    })
    .catch(err => {
      res.status(500).json(err);
    });
  
})

module.exports = Router