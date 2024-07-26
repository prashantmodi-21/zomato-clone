import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCartSuccess, updateCartSuccess } from '../redux/cartRedux'
import { deleteCartItems, updateCartItems } from '../redux/apiCalls'
import { userMethod } from '../requestMethod'

const Cart = () => {
  const dispatch = useDispatch()
  const {currentUser} = useSelector(state=>state.user)
  const {cartItems, total} = useSelector(state=>state.cart)
  const {menuItems} = useSelector(state=> state.menu)
  const items = menuItems.filter(item=> cartItems.find(i=> i.dishId === item._id))

  const handleCart = async()=>{
    const res = await userMethod.post("payment/checkout", {cartItems, total, userId: currentUser._id})
    location.assign(res.data)
  }
  return (
    <>
    <div className='px-10 sm:px-20'>
      <Navbar/>
      <section id='cart' className='flex items-center mb-8'>
      <div className='w-full lg:w-4/5'>
        <div id='food-menu' className='border-b'>
          <h3 className='text-2xl p-2 text-[#EF4F5F] border-b border-[#EF4F5F] inline-block'>Order Summary</h3>
        </div>
        <div className='border-b pb-2'>
          {items.map((item)=>(
        <div className='flex justify-between items-center' key={item._id}> 
          <div className='text-gray-700 space-y-2 mt-2'>
              <h4 className='text-xl'>{item.dish}</h4>
              <div className='flex font-thin text-xs space-x-1'>
              <span className='border border-green-500 text-green-500 rounded-md px-2'>{cartItems[cartItems.findIndex(i=> i.dishId === item._id)].qty}</span>
              <span>X {item.price}</span>
              </div>
          </div>
          <div>
          <div className='p-2 text-sm space-x-1 border-2 border-[#EF4F5F] text-[#EF4F5F] rounded'>
              <button onClick={()=> currentUser ? cartItems[cartItems.findIndex(i=> i.dishId === item._id)].qty === 1 ? deleteCartItems(dispatch, currentUser._id, {dishId: item._id, price: item.price, total: total - item.price}) : updateCartItems(dispatch, currentUser._id, {dishId: item._id, qty: cartItems[cartItems.findIndex(i=> i.dishId === item._id)].qty - 1, price: item.price, total: total - item.price}) : cartItems[cartItems.findIndex(i=> i.dishId === item._id)].qty === 1 ? dispatch(deleteCartSuccess({dishId: item._id, price: item.price})) : dispatch(updateCartSuccess({dishId: item._id, qty: cartItems[cartItems.findIndex(i=> i.dishId === item._id)].qty -1, price: item.price, total: total - item.price}))}>-</button>
              <span>{cartItems[cartItems.findIndex(i=> i.dishId === item._id)].qty}</span>
              <button onClick={()=> currentUser ? updateCartItems(dispatch, currentUser._id, {dishId: item._id, qty: cartItems[cartItems.findIndex(i=> i.dishId === item._id)].qty + 1, price: item.price, total: total + item.price}) : dispatch(updateCartSuccess({dishId: item._id, qty: cartItems[cartItems.findIndex(i=> i.dishId === item._id)].qty + 1, price: item.price, total: total + item.price}))}>+</button>
          </div>
          </div>
          <div>
              <span className='font-thin text-xl'>₹{cartItems[cartItems.findIndex(i=> i.dishId === item._id)].amount}</span>
          </div>
        </div>
          ))}
        
      </div>
      <div id='total' className='my-4 w-full lg:hidden'>
        <h3 className='text-xl text-center pb-2 border-b'>Order Total</h3>
        <div className='flex flex-col space-y-2 border-b pb-2'>
            <div className='flex justify-between'>
                <span className='font-medium'>Price</span>
                <span className='font-medium'>₹{!total ? 0 : total}</span>
            </div>
            <div className='flex justify-between'>
                <span className='font-medium'>Delivery Chg</span>
                <span className='font-medium'>₹{!total ? 0 :99}</span>
            </div>
            <div className='flex justify-between'>
                <span className='font-medium'>Discount</span>
                <span className='font-medium'>₹{!total ? 0 :99}</span>
            </div>
        </div>
            <div className='flex justify-between'>
                <span className='font-medium'>Total</span>
                <span className='font-medium'>₹{!total ? 0 : total}</span>
            </div>
      </div>
      <div className='flex justify-between mt-2 text-sm'>
        <Link to="/"><button className='p-2 bg-gray-100 rounded'>Back to Home</button></Link>
        <button className='p-2 bg-[#EF4F5F] text-white rounded' onClick={()=> handleCart()}>Checkout</button>
      </div>
      </div>
      <div id='total' className='m-8 w-1/5 hidden lg:block'>
        <h3 className='text-xl text-center pb-2 border-b'>Order Total</h3>
        <div className='flex flex-col space-y-2 border-b pb-2'>
            <div className='flex justify-between'>
                <span className='font-medium'>Price</span>
                <span className='font-medium'>₹{!total ? 0 : total}</span>
            </div>
            <div className='flex justify-between'>
                <span className='font-medium'>Delivery Chg</span>
                <span className='font-medium'>₹{!total ? 0 :99}</span>
            </div>
            <div className='flex justify-between'>
                <span className='font-medium'>Discount</span>
                <span className='font-medium'>₹{!total ? 0 :99}</span>
            </div>
        </div>
            <div className='flex justify-between'>
                <span className='font-medium'>Total</span>
                <span className='font-medium'>₹{!total ? 0 : total}</span>
            </div>
      </div>
      </section>
    </div>
      <Footer/>
    </>
  )
}

export default Cart
