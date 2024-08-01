import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { deleteCart } from '../redux/apiCalls'
import { useDispatch, useSelector } from 'react-redux'

const Order = () => {
const {type} = useParams()
const dispatch = useDispatch()
const {currentUser} = useSelector(state=>state.user)

useEffect(()=>{
  type === "success" && deleteCart(dispatch, currentUser._id)
}, [type])
  return (
    <div className='w-full h-[100vh] flex justify-center items-center'>
        {type === "success" ? <div className='text-center'>
            <i class="fa-solid fa-circle-check fa-beat fa-2xl text-[#172554]"></i>
            <h1 className='text-2xl my-4 text-[#172554]'>Order Placed Successfully! It's Our Turn to Cook and Deliver</h1>
            <Link to={"/"}><button className='text-white text-xs bg-blue-950 uppercase p-2'>Back to Home</button></Link>
        </div>
        :<div className='text-center'>
            <i class="fa-solid fa-circle-xmark fa-shake fa-2xl text-[#172554]"></i>
            <h1 className='text-2xl my-4 text-[#172554]'>Order Failed! We Process Order After Payments</h1>
            <Link to={"/cart"}><button className='text-white text-xs bg-blue-950 uppercase p-2'>Back to Cart</button></Link>
        </div>}
    </div>
  )
}

export default Order
