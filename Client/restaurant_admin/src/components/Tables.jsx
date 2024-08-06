import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { userMethod } from '../../requestMethod'
import { useSelector } from 'react-redux'

const Tables = () => {
  const {user} = useSelector(state=>state.admin)
  const [recentOrders, setRecentOrders] = useState([])
  const [recentMonthSales, setRecentMonthSales] = useState([])

  // GET LAST FEW ORDERS

  const getRecentOrders = async()=>{
    try {
      const res = await userMethod.get(`/order/restaurant/${user.restaurantId}?new=true`)
      setRecentOrders(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  // GET THIS MONTH SALES AMOUNT

  const getRecentMonthSales = async()=>{
    try {
      const res = await userMethod.get(`/order/sales/monthly/${user.restaurantId}`)
      setRecentMonthSales(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getRecentOrders()
    getRecentMonthSales()
  }, [])
  return (
    <section id='tables' className='flex flex-col lg:flex-row m-4 sm:m-0'>
      <table className='w-full h-fit text-center m-4 shadow-md'>
        <thead>
        <tr>
          <th colSpan={2}>Recent Orders</th>
          <th><Link to="/orders"><button className='bg-zinc-500 text-white text-sm p-1 rounded font-medium'>View All</button></Link></th>
        </tr>
        <tr className='border-b text-sm'>
            <th className='p-1'>Name</th>
            <th className='p-1'>Phone</th>
            <th className='p-1'>Address</th>
        </tr>
        </thead>
        <tbody>
          {recentOrders.map((item, i)=>(
          <tr className='border-b text-sm' key={i}>
              <td className='p-1'>{item.name}</td>
              <td className='p-1'>{item.phone}</td>
              <td className='p-1'>{`${item.address.line1}, ${item.address.city}`}</td>
          </tr>
          ))}
        </tbody>
      </table>
      <table className='w-full text-center m-4 shadow-md'>
        <thead>
        <tr>
          <th colSpan={2}>Recent Month Sales</th>
          <th><Link to="/sales"><button className='bg-zinc-500 text-white text-sm p-1 rounded font-medium'>View All</button></Link></th>
        </tr>
        <tr className='border-b text-sm'>
            <th className='p-1'>Month & Year</th>
            <th className='p-1'>Change (in %)</th>
            <th className='p-1'>Total (in ₹)</th>
        </tr>
        </thead>
        <tbody>
          {recentMonthSales.map((item, i)=>(
          <tr className='border-b text-sm' key={i}>
              <td className='p-1'>{item.monthYear}</td>
              <td className='p-1'>{item.total === 0 || recentMonthSales[i + 1]?.total === 0 ? recentMonthSales[i + 1] ? (item.total - recentMonthSales[i + 1]?.total)+"%" : "0%" : Math.round((((item.total - recentMonthSales[i + 1]?.total)/item.total)*100))+"%"}</td>
              <td className='p-1'>{item.total}</td>
          </tr>
          ))}
        </tbody>
      </table>
      </section>
  )
}

export default Tables
