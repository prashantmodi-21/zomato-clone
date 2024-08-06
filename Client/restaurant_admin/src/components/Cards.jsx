import React, { useEffect, useState } from 'react'
import { userMethod } from '../../requestMethod'
import { useDispatch, useSelector } from 'react-redux'
import { userAutoLogout } from '../../../admin/src/redux/userRedux'

const Cards = () => {
  const dispatch = useDispatch()
  const {user} = useSelector(state=>state.admin)
  const [noOfDishListed, setNoOfDishListed] = useState(0)
  const [noOfOfOrders, setNoOfOfOrders] = useState(0)
  const [totalSalesFigure, setTotalSalesFigure] = useState(0)
  const [monthlySalesFigure, setMonthlySalesFigure] = useState(0)
  const [sixMonthlySales, setSixMonthlySales] = useState(0)
  const [sixMonthSalesFigure, setSixMonthSalesFigure] = useState(0)
  const [monthlyOrders, setMonthlyOrders] = useState(0)

  // GET TOTAL NUMBERS OF DISH LISTED

  const getDishNumbers = async()=>{
    try {
      const res = await userMethod.get(`/menu/${user.restaurantId}`)
      setNoOfDishListed(res.data.length)
    } catch (error) {
      dispatch(userAutoLogout())
      console.log(error)
    }
  }

  // GET TOTAL NUMBER OF ORDERS

  const getOrdersNumber = async()=>{
    try {
      const res = await userMethod.get(`/order/restaurant/${user.restaurantId}`)
      setNoOfOfOrders(res.data.length)
    } catch (error) {
      dispatch(userAutoLogout())
      console.log(error)
    }
  }

  // GET TOTAL SALES AMOUNT

  const getTotalSales = async()=>{
    try {
      const res = await userMethod.get(`/order/sales/${user.restaurantId}`)
      setTotalSalesFigure(res.data.length < 1 ? 0 : res.data[0]?.amount)
    } catch (error) {
      dispatch(userAutoLogout())
      console.log(error)
    }
  }

  // GET TOTAL MONTHLY SALES

  const getMonthlySales = async()=>{
    try {
      const res = await userMethod.get(`/order/sales/monthly/${user.restaurantId}`)
      setMonthlySalesFigure(res.data[0]?.total)
    } catch (error) {
      dispatch(userAutoLogout())
      console.log(error)
    }
  }

  // GET TOTAL ORDERS RECEIVED IN THIS MONTH

  const getMonthlyOrders = async()=>{
    try {
      const res = await userMethod.get(`/order/monthly/${user.restaurantId}`)
      setMonthlyOrders(res.data)
    } catch (error) {
      dispatch(userAutoLogout())
      console.log(error)
    }
  }

  // GET LAST SIX MONTHS SALES

  const getSixMonthSales = async()=>{
    try {
      const res = await userMethod.get(`/order/sales/monthly/${user.restaurantId}`)
      setSixMonthlySales(res.data[0].total)
      let total = 0
      for(let i = 0; i < res.data.length; i++){
        total += res.data[i].total
        i > 4 && setSixMonthSalesFigure(total)
      }
    } catch (error) {
      dispatch(userAutoLogout())
      console.log(error)
    }
  }
  useEffect(()=>{
    getDishNumbers()
    getOrdersNumber()
    getTotalSales()
    getMonthlySales()
    getMonthlyOrders()
    getSixMonthSales()
  }, [])
  return (
    <section id='cards' className='m-4 sm:m-0'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center items-center text-white w-full text-2xl'>
      <div className='bg-red-400 py-6 p-4 rounded-md h-fit space-y-4 text-center w-full'>
        <span>No. of Dishes Listed</span>
        <h3>{noOfDishListed}</h3>
      </div>
      <div className='bg-green-400 py-6 p-4 rounded-md h-fit space-y-4 text-center w-full'>
        <span>Total Orders Received</span>
        <h3>{noOfOfOrders}</h3>
      </div>
      <div className='bg-blue-400 py-6 p-4 rounded-md h-fit space-y-4 text-center w-full'>
        <span>Total Sales Figure</span>
        <h3>{totalSalesFigure} (in ₹)</h3>
      </div>
      <div className='bg-yellow-400 py-6 p-4 rounded-md h-fit space-y-4 text-center w-full'>
        <span>This Month Orders</span>
        <h3>{monthlyOrders}</h3>
      </div>
      <div className='bg-lime-400 py-6 p-4 rounded-md h-fit space-y-4 text-center w-full'>
        <span>This Month Sales Figure</span>
        <h3>{monthlySalesFigure} (in ₹)</h3>
      </div>
      <div className='bg-violet-400 py-6 p-4 rounded-md h-fit space-y-4 text-center w-full'>
        <span>Total Sales of Last Six Months</span>
        <h3>{sixMonthSalesFigure} (in ₹)</h3>
      </div>
      </div>
    </section>
  )
}

export default Cards
