import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addCartItems, deleteCartItems, getMenuItems, updateCartItems } from '../redux/apiCalls'
import { addToCartSuccess, deleteCartSuccess, updateCartSuccess } from '../redux/cartRedux'

const RestaurantMenu = () => {
  const [qty, setQty] = useState(0)
  const {currentUser} = useSelector(state=>state.user)
  const {menuItems} = useSelector(state=>state.menu)
  const {cartItems, total} = useSelector(state=>state.cart)
  const dispatch = useDispatch()
  const {id} = useParams()
  const {restaurants} = useSelector(state=>state.restaurant)
  const selectedRestaurant = restaurants.find(item=> item._id === id)
  useEffect(()=>{
    getMenuItems(dispatch, id)
  }, [])
  return (
    <>
    <div className='px-6 sm:px-20 mb-10'>
      <Navbar />
      <section id='restaurant-menu'>
      <div className='banner mb-2'>
        <img src={selectedRestaurant.image} alt="restaurant-banner" className='w-full h-full object-cover'/>
      </div>
      <div className='flex justify-between mb-2'>
        <h2 className='text-4xl'>{selectedRestaurant.name}</h2>
        <div className={`flex items-center space-x-1 font-semibold bg-green-${(Math.ceil(selectedRestaurant.rating)+2)*100} rounded-lg text-white text-xs p-2`}><span>{selectedRestaurant.rating}</span><i className="fa-solid fa-star"></i></div>
      </div>
      <div className='flex flex-col mb-2 space-y-1 text-gray-500'>
        <span>{selectedRestaurant.cuisines.toString().split(", ")}</span>
        <span>{selectedRestaurant.locality.toString().split(", ")}</span>
      </div>
      <div id='food-menu' className='border-b'>
        <h3 className='text-2xl p-2 text-[#EF4F5F] border-b border-[#EF4F5F] inline-block'>Order Online</h3>
      </div>
      <div className='m-2'>
        {menuItems.map((item, i)=>(
        <div key={item._id} className='flex justify-between mt-2 space-y-2'>
                <div className='flex flex-col text-gray-500'>
                    <h4 className='text-xl text-black'>{item.dish}</h4>
                    <span className='text-sm'>₹{item.price}</span>
                </div>
                {!currentUser ? cartItems?.find(i=> i.dishId === item._id) ? <button className='text-[#EF4F5F] border border-[#EF4F5F] text-sm px-2 py-1 rounded space-x-2'><span onClick={()=> cartItems[cartItems.findIndex(i=> i.dishId === item._id)].qty === 1 ? dispatch(deleteCartSuccess({dishId: item._id, price: item.price})) : dispatch(updateCartSuccess({dishId: item._id, qty: cartItems[cartItems.findIndex(i=> i.dishId === item._id)].qty -1, price: item.price, total: total - item.price}))}>-</span><span>{cartItems[cartItems.findIndex(i=> i.dishId === item._id)].qty}</span><span onClick={()=> dispatch(updateCartSuccess({dishId: item._id, qty: cartItems[cartItems.findIndex(i=> i.dishId === item._id)].qty + 1, price: item.price, total: total + item.price}))}>+</span></button> : <button className='text-[#EF4F5F] border border-[#EF4F5F] text-sm px-2 py-1 rounded' onClick={()=> dispatch(addToCartSuccess({dishId: item._id, qty: 1, amount: item.price}))}>Add</button> :
                cartItems?.find(i=> i.dishId === item._id) ? <button className='text-[#EF4F5F] border border-[#EF4F5F] text-sm px-2 py-1 rounded space-x-2'><span onClick={()=> cartItems[cartItems.findIndex(i=> i.dishId === item._id)].qty === 1 ? deleteCartItems(dispatch, currentUser._id, {dishId: item._id, price: item.price, total: total - item.price}) : updateCartItems(dispatch, currentUser._id, {dishId: item._id, qty: cartItems[cartItems.findIndex(i=> i.dishId === item._id)].qty - 1, price: item.price, total: total - item.price})}>-</span><span>{cartItems[cartItems.findIndex(i=> i.dishId === item._id)].qty}</span><span onClick={()=>updateCartItems(dispatch, currentUser._id, {dishId: item._id, qty: cartItems[cartItems.findIndex(i=> i.dishId === item._id)].qty + 1, price: item.price, total: total + item.price})}>+</span></button> : <button className='text-[#EF4F5F] border border-[#EF4F5F] text-sm px-2 py-1 rounded' onClick={()=> addCartItems(dispatch, currentUser._id, {items: {dishId: item._id, qty: 1, amount: item.price}, total: total + item.price})}>Add</button>}
        </div>
        ))}
        </div>      
      </section>
    </div>
      <Footer />
    </>
  )
}

export default RestaurantMenu
