import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutSuccess, userAutoLogout } from '../redux/userRedux'
import { getAuth, signOut } from 'firebase/auth'
import { app } from '../firebaseConfig'
import { useEffect } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '@mui/material';


const Navbar = () => {
  const dispatch = useDispatch()
  const {currentUser, loginTime} = useSelector(state=>state.user)
  const {cities, selectedCity} = useSelector(state=>state.location)
  const {cartItems} = useSelector(state=>state.cart)
  const [search, setSearch] = useState()
  const handleLogout = ()=>{
    const auth = getAuth(app);
    signOut(auth).then(() => {
      dispatch(logoutSuccess())
    }).catch((error) => {
      console.log(error)
    });
  }
  useEffect(()=>{
    const intFunction = setInterval(() => {
      if (loginTime && Date.now() - loginTime >  24 * 60 * 60 * 1000) {
        // 24 hours have passed
        dispatch(userAutoLogout());
      }
    }, 60000);

    return ()=> clearInterval(intFunction)
    
  }, [])
  return (
    <nav className='flex justify-between items-center h-20'>
        <div className='flex items-center space-x-8 lg:w-4/5'>
          <Link to="/"><img src="/img/logo-black.png" alt="zomato-logo" className='ixsoFB'/></Link>
          <div className='hidden lg:flex items-center text-gray-500 text-sm bg-white px-4 rounded w-full border border-gray-200 shadow-md'>
          <i className="fa-solid fa-location-dot fa-lg px-2 pt-1" style={{color: "#da626e"}}></i>
            <select name="" id="" className='outline-0 p-4' defaultValue={selectedCity} onChange={(e)=> dispatch(selectedCity(e.target.value))}>
              <option value="">Select Your City</option>
              {cities.map((item)=>(
                <option key={item.city} value={item.city}>{item.city.substring(0,1).toUpperCase()+item.city.slice(1)}</option>
              ))}
            </select>
            <div className='border h-6 mx-4 border-gray-300'></div>
            <Link to={`/restaurants/${search}`}><i className="fa-solid fa-magnifying-glass fa-lg pt-1 pr-4"></i></Link>
            <input type="search" name="" id="" className='outline-0 w-full' placeholder='Search for restaurants, cuisines or a dish' onChange={(e)=>setSearch(e.target.value)}/>
        </div>
        </div>
        
        <div className='space-x-4 sm:space-x-12 flex justify-center'>
            {currentUser ? currentUser?.gid ? <span className='text-sm sm:text-lg' onClick={()=> handleLogout()}>Logout</span> : <span className='text-sm sm:text-lg' onClick={()=> dispatch(logoutSuccess())}>Logout</span> : <div><Link to="/login"><span className='text-sm sm:text-lg mr-4'>Log In</span></Link>
            <Link to="/register"><span className='text-sm sm:text-lg'>Sign Up</span></Link></div>}
            <Badge badgeContent={cartItems?.length} color="primary">
              <Link to="/cart"><ShoppingCartIcon /></Link>
            </Badge>
        </div>
      </nav>
  )
}

export default Navbar
