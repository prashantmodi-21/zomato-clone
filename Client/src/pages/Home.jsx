import React, { useRef } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess, userAutoLogout } from '../redux/userRedux';
import { useEffect, useState } from 'react';
import { addItemsToCart, getAllMenuItems, getCartItems, getRestaurants } from '../redux/apiCalls';
import Collections from '../components/Collections';
import { addCitiesSuccess, selectedLocation } from '../redux/locationRedux';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../firebaseConfig';

const Home = () => {
  const dispatch = useDispatch()
  const {loginTime} = useSelector(state=>state.user)
  const initialized = useRef(false)

  const [search, setSearch] = useState()

  const { currentUser } = useSelector(state => state.user)
  const { restaurants } = useSelector(state => state.restaurant)
  const { cartItems, total } = useSelector(state => state.cart)
  const {cities, selectedCity} = useSelector(state=>state.location)

  const location = []
  const locality = []

  
  const auth = getAuth(app);

  for (const value of restaurants) {
    const exist = location.find(item => item.city === value.locality[value.locality.length - 1])
    let places = restaurants.filter(i=> i.locality.includes(value.locality[value.locality.length - 1]))
    exist ? null : location.push({city: value.locality[value.locality.length - 1], places: places.length})
  }

  const filteredRestaurants = restaurants.filter(item=> item.locality[item.locality.length -1] === selectedCity)

  for (const value of filteredRestaurants){
    const localityExist = locality.find(i=> i.area === value.locality[0])
    const places = filteredRestaurants.filter(i=> i.locality.includes(value.locality[0]))
    localityExist ? null : locality.push({area: value.locality[0], places: places.length})
  }

  const handleLogout = ()=>{
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
        signOut(auth).then(() => {
          dispatch(userAutoLogout());
        }).catch((error) => {
          console.log(error)
        });
      }
    }, 60000);

    return ()=> clearInterval(intFunction)
    
  }, [])

  useEffect(() => {
    getRestaurants(dispatch)
  }, [])

  useEffect(() => {
    dispatch(addCitiesSuccess(location))
  }, [getRestaurants])
  
  useEffect(()=>{
    currentUser && getAllMenuItems(dispatch)
  }, [currentUser])

  useEffect(()=>{
    currentUser && getCartItems(dispatch, currentUser._id)
  }, [currentUser])

  useEffect(()=>{
    if (!initialized.current) {
      initialized.current = true
      currentUser && cartItems.length > 0 && addItemsToCart(dispatch, currentUser._id, {items: cartItems, total})
    }
  }, [currentUser])
  return (
    <>
      <header className='bg-[url("/img/bg.png")] h-[70vh] px-4 sm:px-20 text-white'>
        <nav className='flex justify-between items-center h-20'>
          <div>
            <a href=""><span className='font-semibold'>Get the app</span></a>
          </div>
          <div className='space-x-4 sm:space-x-12 flex'>
            {currentUser ? currentUser?.gid ? <span className='text-sm sm:text-lg' onClick={() => handleLogout()}>Logout</span> : <span className='text-sm sm:text-lg' onClick={() => dispatch(logoutSuccess())}>Logout</span> : <div><Link to="/login"><span className='text-sm sm:text-lg mr-6'>Log In</span></Link>
              <Link to="/register"><span className='text-sm sm:text-md'>Sign Up</span></Link></div>}
            <Badge badgeContent={cartItems?.length} color="primary">
              <Link to="/cart"><ShoppingCartIcon /></Link>
            </Badge>
          </div>
        </nav>
        <div className='flex flex-col items-center justify-center h-full'>
          <img src="/img/bg-logo.png" alt="zomato-logo" className='w-52 sm:w-72' />
          <h1 className='text-2xl sm:text-4xl py-5 text-center'>Discover the best food & drinks in {selectedCity ? selectedCity.slice(0, 1).toUpperCase() + selectedCity.substring(1) : "India"}</h1>
          <div className='hidden sm:flex items-center text-gray-500 text-sm bg-white px-4 rounded w-2/3'>
            <i className="fa-solid fa-location-dot fa-lg px-2 pt-1" style={{ color: "#da626e" }}></i>
            <select name="" id="" className='outline-0 p-4' defaultValue={selectedCity} onChange={(e) => dispatch(selectedLocation(e.target.value))}>
              <option value="">Select Your City</option>
              {location.map((item) => (
                <option key={item.city} value={item.city}>{`${item.city.substring(0, 1).toUpperCase()}${item.city.slice(1)}`}</option>
              ))}

            </select>
            <div className='border h-6 mx-4 border-gray-300'></div>
            <Link to={`restaurants/${search}`}><i className="fa-solid fa-magnifying-glass fa-lg pt-1 pr-4"></i></Link>
            <input type="search" name="search" id="" className='outline-0 w-full' placeholder='Search for restaurants, cuisines or a dish' onChange={(e)=> setSearch(e.target.value)}/>
          </div>
          <div className='sm:hidden w-4/5'>
            <div className='text-gray-500 text-sm bg-white px-4 rounded w-full mb-2 flex items-center'>
              <i className="fa-solid fa-location-dot fa-lg px-2 pt-1" style={{ color: "#da626e" }}></i>
              <select name="" id="" className='outline-0 w-full p-2' defaultValue={selectedCity} onChange={(e) => dispatch(selectedLocation(e.target.value))}>
                <option value="">Select Your City</option>
              {cities.map((item) => (
                <option key={item.city} value={item.city}>{`${item.city.substring(0, 1).toUpperCase()}${item.city.slice(1)}`}</option>
              ))}
              </select>
            </div>
            <div className='text-gray-500 text-sm bg-white p-2 rounded w-full flex items-center'>
              <i className="fa-solid fa-magnifying-glass fa-lg pt-1 pr-4"></i>
              <input type="search" name="" id="" className='outline-0 w-full' placeholder='Search for restaurants, cuisines or a dish' />
            </div>
          </div>
        </div>
      </header>

      <section className='px-4 md:px-20 py-10 flex flex-col sm:flex-row'>
        <Link to="/restaurants/order" className='w-full hover:scale-105 transition-all p-4'>
          <div className='bg-[url("/img/order-online.avif")] bg-center bg-cover h-40 rounded-t-lg'></div>
          <div className='bg-white p-4 border border-gray-300 rounded-b-lg'>
            <h3 className='text-xl'>Order Online</h3>
            <span>Stay home and Order at your doorstep</span>

          </div></Link>
        <Link to="/restaurants/dining" className='w-full hover:scale-105 transition-all p-4'>
          <div className='bg-[url("/img/dining.avif")] bg-center bg-cover h-40 rounded-t-lg'></div>
          <div className='bg-white p-4 border border-gray-300 rounded-b-lg'>
            <h3 className='text-xl'>Dining</h3>
            <span>View the city's Favourite dining venues</span>

          </div></Link>
      </section>
      <section className='px-6 lg:px-20'>
        <Collections/>
      </section>
      <section id='locality' className='px-6 md:px-20 py-10 text-gray-700'>
        {selectedCity ? <div>
        <h2 className='text-4xl pb-8'>Popular localities in and around {selectedCity ? selectedCity.slice(0, 1).toUpperCase() + selectedCity.substring(1) : "India"}</h2>
        <div className='flex flex-wrap'>
          {locality.map((item)=>(
           <div id='card' key={item.area} className='p-4 m-2 shadow-md flex items-center justify-between border border-gray-300 rounded-xl w-full sm:w-[31.80%]'>
               <Link to={`restaurants/${item.area}`}>
                <h3 className='text-2xl'>{item.area.substring(0, 1).toUpperCase()+item.area.slice(1)}</h3>
                <span className='font-thin'>{item.places} Places</span>
                </Link>
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 20 20" aria-labelledby="icon-svg-title- icon-svg-desc-" role="img" className="sc-rbbb40-0 gvsUip"><title>right-triangle</title><path d="M5 0.42l10 10-10 10v-20z"></path></svg>
            </div>
          ))}
        </div>
        </div>
         : <div>
        <h2 className='text-4xl pb-8'>Popular Cities in India</h2>
        <div className='flex flex-wrap'>
          {location.map((item)=>(
           <div id='card' key={item.city} className='p-4 m-2 shadow-md flex items-center justify-between border border-gray-300 rounded-xl w-full sm:w-[31.80%]'>
               <Link to={`restaurants/${item.city}`}>
                <h3 className='text-2xl'>{item.city.substring(0, 1).toUpperCase()+item.city.slice(1)}</h3>
                <span className='font-thin'>{item.places} Places</span>
                </Link>
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 20 20" aria-labelledby="icon-svg-title- icon-svg-desc-" role="img" className="sc-rbbb40-0 gvsUip"><title>right-triangle</title><path d="M5 0.42l10 10-10 10v-20z"></path></svg>
            </div>
          ))}
        </div>
        </div>}
      </section>

      <section id='gettheapp' className='bg-[#FFFBF7] flex justify-center p-10 md:p-20'>
        <img src="/img/download.avif" alt="phone" width={"250px"} height={"450px"} className='hidden sm:block' />
        <div className='space-y-4'>
          <h2 className='text-3xl md:text-5xl mb-4'>Get the Zomato App</h2>
          <span className='font-thin md:text-lg'>We will send you a link, open it on your phone to download the app</span>
          <div className='flex space-x-2'>
            <svg viewBox="0 0 20 20" className="sc-djusq7-2 ctMLcL"><circle cx="10" cy="10" r="8" name="radio" value="email" label="Email" className="sc-djusq7-3 bIgyOk"></circle><circle cx="10" cy="10" r="5" name="radio" value="email" label="Email" className="sc-djusq7-4 hLkMFn"></circle></svg><span className='font-thin ml-1'>Email</span>
            <svg viewBox="0 0 20 20" className="sc-djusq7-2 ctMLcL"><circle cx="10" cy="10" r="8" name="radio" value="phone" label="Phone" className="sc-djusq7-3 icOLAW"></circle></svg><span className='font-thin ml-1'>Phone</span>
          </div>
          <div className='flex space-x-4 pb-2'>
            <input type="text" placeholder='Email' className='outline-none p-2 border border-gray-300 rounded-md w-full' />
            <button className='bg-[#EF4F5F] text-sm text-white rounded-md font-thin w-1/3'>Share App Link</button>
          </div>
          <span className=' text-gray-500 font-thin'>Download app from</span>
          <div className='flex space-x-4'>
            <img src="/img/google-play.webp" alt="google-play" width={"137px"} height={"40px"} />
            <img src="/img/apple-store.webp" alt="apple-store" width={"137px"} height={"40px"} />
          </div>
        </div>
      </section>

      <section id='faq' className='px-10 sm:px-20 py-10'>
        <h2 className='text-3xl my-4'>Explore options near me</h2>
        <div className='p-4 my-4 bg-white border border-gray-300 rounded-md flex justify-between items-center'>
          <h3 className='text-xl'>Popular cuisines near me</h3>
          <i className="fa-solid fa-angle-down"></i>
        </div>
        <div className='p-4 my-4 bg-white border border-gray-300 rounded-md flex justify-between items-center'>
          <h3 className='text-xl'>Popular Restaurants types near me</h3>
          <i className="fa-solid fa-angle-down"></i>
        </div>
        <div className='p-4 my-4 bg-white border border-gray-300 rounded-md flex justify-between items-center'>
          <h3 className='text-xl'>Cities We Deliver To</h3>
          <i className="fa-solid fa-angle-down"></i>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Home
