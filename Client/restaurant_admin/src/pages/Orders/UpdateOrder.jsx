import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateStatus } from '../../redux/apiCalls'

const UpdateOrder = () => {
  const dispatch = useDispatch()
  const {id} = useParams()
  const {orders} = useSelector(state=>state.order)
  const selectedOrder = orders.find(item=> item._id === id)
  const [orderStatus, setOrderStatus] = useState()
  
  useEffect(()=>{
    selectedOrder && setOrderStatus(selectedOrder.status)
  }, [selectedOrder])
  console.log(selectedOrder)
  return (
    <>
        <div className='p-8 w-1/2'>
          <h1 className='text-4xl pb-4'>Update Order</h1>
          <div id='form w-full'>
            <select name="status" id="" value={orderStatus} onChange={(e)=> setOrderStatus(e.target.value)} className='my-2 p-2 border-2 border-black rounded-md'>
              <option value="Pending">Pending</option>
              <option value="Fullfilled">Fullfilled</option>
              <option value="Rejected">Rejected</option>
            </select>
            <button className='p-2 bg-red-400 text-white block rounded my-2' onClick={()=> updateStatus(dispatch, {id: selectedOrder._id, status: orderStatus})}>Submit</button>
          </div>
        </div>
        </>
  )
}

export default UpdateOrder
