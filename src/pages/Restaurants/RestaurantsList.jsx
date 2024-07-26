import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { deleteRestaurants, getRestaurants } from '../../redux/apiCalls'
import { useDispatch, useSelector } from 'react-redux'

const RestaurantsList = () => {
  const {restaurants} = useSelector(state=> state.restaurant)
  const dispatch = useDispatch()
  useEffect(()=>{
      getRestaurants(dispatch)
  }, [])
  return (
        <div className='flex flex-col w-full'>
          <div className='px-4 py-8 sm:p-8 w-full text-sm'>
            <div className='flex justify-between mb-2'>
              <h1 className='text-2xl sm:text-4xl'>Restaurants List</h1>
              <Link to="/addrestaurant"><button className='p-2 bg-red-400 rounded-md text-white text-sm sm:text-md'>Add Restaurants</button></Link>
            </div>
            <table className='w-full text-center text-sm sm:text-md'>
              <thead>
              <tr className='border-b'>
                <th className='p-2 sm:px-4 py-2'>Id</th>
                <th className='p-2 sm:px-4 py-2'>Name</th>
                <th className='p-2 sm:px-4 py-2'>Cuisines</th>
                <th className='p-2 sm:px-4 py-2'>Services</th>
                <th className='p-2 sm:px-4 py-2'>Locality</th>
                <th className='p-2 sm:px-4 py-2'>Rating</th>
                <th className='p-2 sm:px-4 py-2'>Buttons</th>
              </tr>
              </thead>
              {restaurants.map((item, i)=>(
              <tbody key={i}>
              <tr className='border-b'>
                <td className='p-2 sm:px-4 py-2'>{item._id}</td>
                <td className='p-2 sm:px-4 py-2'>{item.name}</td>
                <td className='p-2 sm:px-4 py-2'>{item.cuisines?.map((item)=>(<span>{item.toString().split(", ")}<br/></span>))}</td>
                <td className='p-2 sm:px-4 py-2'>{item.services?.map((item)=>(<span>{item.toString().split(", ")}<br/></span>))}</td>
                <td className='p-2 sm:px-4 py-2'>{item.locality?.map((item)=>(<span>{item.toString().split(", ")}<br/></span>))}</td>
                <td className='p-2 sm:px-4 py-2'>{item.rating}</td>
                <td className='space-x-2'><i className="fa-solid fa-trash bg-red-400 text-white rounded p-2" onClick={()=>deleteRestaurants(dispatch, item._id)}></i><Link to={`/updaterestaurant/${item._id}`}><i className="fa-solid fa-pen bg-blue-400 text-white rounded p-2"></i></Link></td>
              </tr>
              </tbody>
              ))}
            </table>
          </div>
        </div>
  )
}

export default RestaurantsList
