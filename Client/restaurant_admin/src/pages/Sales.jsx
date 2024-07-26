import React, { useEffect, useState } from 'react'
import { userMethod } from '../../requestMethod'
import { useSelector } from 'react-redux'

const Sales = () => {
    const {user} = useSelector(state=>state.admin)
    const [type, setType] = useState("monthly")
    const [monthlySales, setMonthlySales] = useState([])
    const [daysSales, setDaysSales] = useState([])

    const getMonthlySales = async()=>{
        try {
            const res = await userMethod.get(`/order/sales/monthly/${user.restaurantId}`)
            setMonthlySales(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    const getDaysSales = async()=>{
        try {
            const res = await userMethod.get(`/order/sales/days/${user.restaurantId}`)
            setDaysSales(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        type === "monthly" ? getMonthlySales() : getDaysSales()
    }, [type])
  return (
    <div className='flex flex-col w-full'>
          <div className='p-8 w-full'>
            <div className='flex justify-between'>
              <h1 className='text-4xl mb-2'>{type === "monthly" ? "Monthly Sales" : "30 Days Sales"}</h1>
              <select name="" id="" className='p-2 border-2 border-black rouded-md' onChange={(e)=> setType(e.target.value)}>
                <option value="monthly">Monthly</option>
                <option value="days">Days</option>
              </select>
            </div>
            {type === "monthly" ?<table className='w-full text-center'>
            <thead>
              <tr className='border-b'>
                <th className='p-2 sm:px-4 py-2'>Month</th>
                <th className='p-2 sm:px-4 py-2'>Change(in %)</th>
                <th className='p-2 sm:px-4 py-2'>Sales (in ₹)</th>
              </tr>
              </thead>
              <tbody>
                {monthlySales.map((item, i)=>(
                <tr className='border-b' key={item.monthYear}>
                    <td className='p-2 sm:px-4 py-2'>{item.monthYear}</td>
                    <td className='p-2 sm:px-4 py-2'>{item.total === 0 || monthlySales[i + 1]?.total === 0 ? monthlySales[i + 1] ? (item.total - monthlySales[i + 1]?.total)+"%" : "0%" : (((item.total - recentMonthSales[i + 1]?.total)/item.total)*100)+"%"}</td>
                    <td className='p-2 sm:px-4 py-2'>{item.total}</td>
                </tr>
                ))}
               </tbody>
            </table> : <table className='w-full text-center'>
                <thead>
                <tr className='border-b'>
                    <th className='p-2 sm:px-4 py-2'>Date</th>
                    <th className='p-2 sm:px-4 py-2'>Change(in %)</th>
                    <th className='p-2 sm:px-4 py-2'>Sales (in ₹)</th>
                </tr>
                </thead>
                <tbody>
                    {daysSales.map((item, i)=>(                        
                    <tr className='border-b' key={item._id}>
                        <td className='p-2 sm:px-4 py-2'>{item._id}</td>
                        <td className='p-2 sm:px-4 py-2'>{item.totalAmount === 0 || daysSales[i - 1]?.totalAmount === 0 ? daysSales[i - 1] ? (item.totalAmount - daysSales[i -1]?.totalAmount)+"%" : "0%" : (((item.totalAmount - daysSales[i - 1]?.totalAmount)/daysSales[i - 1]?.totalAmount)*100)+"%"}</td>
                        <td className='p-2 sm:px-4 py-2'>{item.totalAmount}</td>
                    </tr>
                    ))}
                </tbody>
            </table> }
          </div>
        </div>
  )
}

export default Sales
