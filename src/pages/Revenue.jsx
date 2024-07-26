import React, { useEffect, useState } from 'react'
import { userMethod } from '../requestMethod'

const Revenue = () => {
  const [filter, setFilter] = useState("monthly")
  const [monthRevenue, setMonthRevenue] = useState([])
  const [daysRevenue, setDaysRevenue] = useState([])
  const getMonthlyRevenue = async()=>{
    const res = await userMethod.get(`/order/revenue/monthly`)
      setMonthRevenue(res.data)
    }

    const getDaysRevenue = async()=>{
      const res = await userMethod.get("/order/revenue/days")
      setDaysRevenue(res.data)
    }
    
  useEffect(()=>{
    filter === "monthly" ? getMonthlyRevenue() : getDaysRevenue()
  }, [filter])
  return (
    <>
        <div className='flex flex-col w-full'>
          <div className='p-8 w-full'>
            <div className='flex justify-between'>
              <h1 className='text-4xl mb-2'>{filter === "monthly" ? "Monthly Revenue" : "30 Days Revenue"}</h1>
              <select name="" id="" onChange={(e)=> setFilter(e.target.value)} className='p-2 border border-black rounded-md'><option value="monthly">Monthly</option><option value="days">Days</option></select>
              </div>
            {filter === "monthly" ?<table className='w-full text-center'>
              <thead>
              <tr className='border-b'>
                <th className='p-2 sm:p-4'>Month</th>
                <th className='p-2 sm:p-4'>Change(in %)</th>
                <th className='p-2 sm:p-4'>Revenue (in ₹)</th>
              </tr>
              </thead>
              <tbody>
                {monthRevenue.map((item, i)=>(
                <tr className='border-b' key={i}>
                  <td className='p-2 sm:p-4'>{item.monthYear}</td>
                  <td className='p-2 sm:p-4'>{item.total === 0 || monthRevenue[i + 1]?.total === 0 ? monthRevenue[i + 1] ? (item.total - monthRevenue[i + 1]?.total)+"%" : "0%" : (((item.total - monthRevenue[i + 1]?.total)/monthRevenue[i -1]?.total)*100)+"%"}</td>
                  <td className='p-2 sm:p-4'>{item.total}</td>
                </tr>
                ))}
               </tbody>
            </table>: <table className='w-full text-center'>
              <thead>
              <tr className='border-b'>
                <th className='p-2 sm:p-4'>Date</th>
                <th className='p-2 sm:p-4'>Change(in %)</th>
                <th className='p-2 sm:p-4'>Revenue (in ₹)</th>
              </tr>
              </thead>
              <tbody>
              {daysRevenue.map((item, i)=>(
                <tr className='border-b' key={i}>
                  <td className='p-2 sm:p-4'>{item._id}</td>
                  <td className='p-2 sm:p-4'>{item.totalAmount === 0 || daysRevenue[i - 1]?.totalAmount === 0 ? daysRevenue[i - 1] ? (item.totalAmount - daysRevenue[i - 1]?.totalAmount)+"%" : "0%" : (((item.totalAmount - daysRevenue[i - 1]?.totalAmount)/daysRevenue[i -1]?.totalAmount)*100)+"%"}</td>
                  <td className='p-2 sm:p-4'>{item.totalAmount}</td>
                </tr>
                ))}
               </tbody>
            </table>}
          </div>
        </div>
    </>
  )
}

export default Revenue
