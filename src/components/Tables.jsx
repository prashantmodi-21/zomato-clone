import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { publicMethod, userMethod } from '../requestMethod'

const Tables = () => {
  const [restaurant, setRestaurant] = useState([])
  const [prevRevenue, setPrevRevenue] = useState([])
  const recentRestaurants = async()=>{
    try {
      const res = await publicMethod.get("/restaurant?new=true")
      setRestaurant(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  const revenue = async()=>{
    try {
      const res = await userMethod.get("/order/revenue/monthly")
      setPrevRevenue(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    recentRestaurants()
    revenue()
  }, [])
  return (
    <section id='tables' className='flex flex-col lg:flex-row m-4 sm:m-0'>
      <table className='w-full h-fit text-center m-4 shadow-md'>
        <thead>
        <tr className='px-4'>
          <th colSpan={2}>Recent Added Restaurants</th>
          <th><Link to="/restaurants"><button className='bg-zinc-500 text-white text-sm p-1 rounded font-medium'>View All</button></Link></th>
        </tr>
        <tr className='border-b text-sm'>
            <th className='px-4 py-2'>Name</th>
            <th className='px-4 py-2'>Cuisine</th>
            <th className='px-4 py-2'>Locality</th>
        </tr>
        </thead>
        <tbody>
          {restaurant.map((item, i)=>(
          <tr className='border-b text-sm' key={i}>
              <td className='px-4 py-2'>{item.name}</td>
              <td className='px-4 py-2'>{item.cuisines[0]}</td>
              <td className='px-4 py-2'>{item.locality[item.locality.length - 1]}</td>
          </tr>
          ))}
        </tbody>
      </table>
      <table className='w-full text-center m-4 shadow-md'>
        <thead>
        <tr>
          <th colSpan={2}>Recent Months Revenue</th>
          <th><Link to="/revenue"><button className='bg-zinc-500 text-white text-sm p-1 rounded font-medium'>View All</button></Link></th>
        </tr>
        <tr className='border-b text-sm'>
            <th className='px-4 py-2'>Month</th>
            <th className='px-4 py-2'>Change (in %)</th>
            <th className='px-4 py-2'>Amount (in ₹)</th>
        </tr>
        </thead>
        <tbody>
          {prevRevenue.map((item, i)=>(
          <tr className='border-b text-sm' key={i}>
              <td className='px-4 py-2'>{item.monthYear}</td>
              <td className='px-4 py-2'>{item.total === 0 || prevRevenue[i + 1]?.total === 0 ? prevRevenue[i + 1] ? (item.total - prevRevenue[i + 1]?.total)+"%" : "0%" : Math.round((((item.total - prevRevenue[i + 1]?.total)/prevRevenue[i + 1]?.total)*100))+"%"}</td>
              <td className='px-4 py-2'>{item.total}</td>
          </tr>
          ))}
        </tbody>
      </table>
      </section>
  )
}

export default Tables
