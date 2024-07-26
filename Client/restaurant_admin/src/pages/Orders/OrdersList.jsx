import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getOrders } from '../../redux/apiCalls'
const OrdersList = () => {
  const dispatch = useDispatch()
  const {user} = useSelector(state=>state.admin)
  const {orders} = useSelector(state=>state.order)
  useEffect(()=>{
    getOrders(dispatch, user.restaurantId)
  }, [])
  return (
    <>
        <div className='flex flex-col w-full'>
          <div className='px-4 py-8 sm:p-8 w-full'>
              <h1 className='text-2xl sm:text-4xl'>Orders List</h1>
             <table className='w-full text-center text-sm sm:text-md'>
              <thead>
              <tr className='border-b'>
                <th className='p-2 sm:px-4 py-2'>Id</th>
                <th className='p-2 sm:px-4 py-2'>User Name</th>
                <th className='p-2 sm:px-4 py-2'>Phone</th>
                <th className='p-2 sm:px-4 py-2'>Address</th>
                <th className='p-2 sm:px-4 py-2'>Order</th>
                <th className='p-2 sm:px-4 py-2'>Status</th>
                <th className='p-2 sm:px-4 py-2'>Buttons</th>
              </tr>
              </thead>
              <tbody>
                {orders?.map((item)=>(
                <tr className='border-b' key={item._id}>
                  <td className='p-2 sm:px-4 py-2'>{item._id}</td>
                  <td className='p-2 sm:px-4 py-2'>{item.name}</td>
                  <td className='p-2 sm:px-4 py-2'>{item.phone}</td>
                  <td className='p-2 sm:px-4 py-2'>{`${item.address.line1}, ${item.address.line2}, ${item.address.city}, ${item.address.state}, ${item.address.pin}`}</td>
                  <td className='p-2 sm:px-4 py-2'>{item.items.map((dish)=> <span key={dish.dishId}>{`${dish.dishName} ${dish.qty},`}<br/></span>)}</td>
                  <td className='p-2 sm:px-4 py-2'><button className='bg-red-400 text-white rounded p-2'>{item.status}</button></td>
                  <td className='space-x-2'><Link to={`/updateorder/${item._id}`}><i className="fa-solid fa-pen bg-blue-400 text-white rounded p-2"></i></Link></td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </>
  )
}

export default OrdersList
