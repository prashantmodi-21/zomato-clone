import React, { useEffect, useState } from 'react'
import { publicMethod, userMethod } from '../requestMethod'
import { useDispatch } from 'react-redux'
import { userAutoLogout } from '../redux/userRedux'

const Cards = () => {
  const dispatch = useDispatch()
  const [noOfRestaurants, setNoOfRestaurants] = useState(0)
  const [noOfUsers, setNoOfUsers] = useState(0)
  const [totalSales, setTotalSales] = useState(0)
  const listedRestaurants = async()=>{
    try {
      const res = await publicMethod.get("/restaurant")
      setNoOfRestaurants(res.data.length)
    } catch (error) {
      dispatch(userAutoLogout())
      console.log(error)
    }
  }
  const usersRegistered = async()=>{
    try {
      const res = await userMethod.get("/user")
      setNoOfUsers(res.data.length)
    } catch (error) {
      dispatch(userAutoLogout())
      console.log(error)
    }
  }
  const totalRevenue = async()=>{
    try {
      const res = await userMethod.get("/order/revenue/total")
      setTotalSales(res.data[0].amount)
    } catch (error) {
      dispatch(userAutoLogout())
      console.log(error)
    }
  }
  useEffect(()=>{
    listedRestaurants()
    usersRegistered()
    totalRevenue()
  }, [])
  return (
    <section id='cards' className='m-4 sm:m-0'>
      <div className='flex flex-col lg:flex-row justify-center items-center text-white w-full text-2xl'>
      <div className='bg-red-400 py-6 p-4 rounded-md h-fit space-y-4 text-center m-4 w-full'>
        <span>No. of Restaurants Listed</span>
        <h3>{noOfRestaurants}</h3>
      </div>
      <div className='bg-green-400 py-6 p-4 rounded-md h-fit space-y-4 text-center m-4 w-full'>
        <span>No. of Users Registered</span>
        <h3>{noOfUsers}</h3>
      </div>
      <div className='bg-blue-400 py-6 p-4 rounded-md h-fit space-y-4 text-center m-4 w-full'>
        <span>Total Sales Figure of Restaurants</span>
        <h3>{totalSales} (in ₹)</h3>
      </div>
      </div>
    </section>
  )
}

export default Cards
