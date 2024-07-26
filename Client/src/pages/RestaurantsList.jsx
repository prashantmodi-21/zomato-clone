import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Restaurants from '../components/Restaurants'
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom'
import Collections from '../components/Collections'
import Switch from '@mui/material/Switch';
import { FormControlLabel, FormGroup } from '@mui/material'
import { useSelector } from 'react-redux'
import { publicMethod } from '../requestMethod'

const RestaurantsList = () => {
  const sort = ["rating", "newest"]
  const {type} = useParams()
  const {restaurants} = useSelector(state=>state.restaurant)
  const {cities, selectedCity} = useSelector(state=>state.location)
  
  const [filteredRestaurants, setFilteredRestaurants] = useState([])
  const [filterCategory, setFilterCategory] = useState()
  const [cuisines, setCuisines] = useState([])
  const [veg, setVeg] = useState(false)
  

  const getFilteredRestaurants = ()=>{
    if(selectedCity){
      const result = veg ? restaurants.filter(item=> item.locality.includes(selectedCity) && item.services.find(i=> i === "veg")) : restaurants.filter(item=> item.locality.includes(selectedCity) && item.services.find(category=> category === type))
      setFilteredRestaurants(result)
      if(filterCategory){
        const restaurants = result.filter(item=> item.locality.includes(selectedCity) && item.cuisines.find(item=> item === filterCategory))
        setFilteredRestaurants(restaurants)
      }
    }else{
      const result = veg ? restaurants.filter(item=> item.services.find(i=> i === "veg")) : restaurants.filter(item=> item.services.find(category=> category === type))
      setFilteredRestaurants(result)
      if(filterCategory){
        const restaurants = result.filter(item=> item.cuisines.find(item=> item === filterCategory))
        setFilteredRestaurants(restaurants)
      }
    }
  }

  const getSortedRestaurants = async(sortValue)=>{
    try {
      if(selectedCity){
        const res = await publicMethod.get(`/restaurant?sort=${sortValue}`)
        const restaurants = res.data.filter((item)=> item.locality.includes(selectedCity) && item.services.find(i=> i === type))
        setFilteredRestaurants(restaurants)
      }else{
        const res = await publicMethod.get(`/restaurant?sort=${sortValue}`)
        const restaurants = res.data.filter((item)=> item.services.find(i=> i === type))
        setFilteredRestaurants(restaurants)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getCuisines = ()=>{
    let arr = []
    for (const key of restaurants){
      if(arr.length < 1){
        arr = key.cuisines
      }
      const result = key.cuisines.find(item=> !arr.includes(item))
      arr = result ? [...arr, result] : arr
      setCuisines(arr)
    }
  }

  const getSearchResults = ()=>{
    if(selectedCity){
      const res = restaurants.filter(i=> i.locality.includes(selectedCity) && Object.values(i).some(value=> Array.isArray(value) ? value.includes(type) : value.toString().includes(type)))
      setFilteredRestaurants(res)
    }else{
      const res = restaurants.filter(i=> Object.values(i).some(value=> Array.isArray(value) ? value.includes(type) : value.toString().includes(type)))
      setFilteredRestaurants(res)
    }
  }
  useEffect(()=>{
    getFilteredRestaurants()
  }, [filterCategory, veg])

  useEffect(()=>{
    getCuisines()
  }, [filteredRestaurants])
  
  useEffect(()=>{
    getSearchResults()
  }, [type])
  return (
    <>
      <div className='px-10 lg:px-20 mb-10'>
        <Navbar />
        <section id='restaurants'>
          <div className='lg:hidden flex items-center text-gray-500 text-sm bg-white px-4 rounded w-full border border-gray-200'>
            <i className="fa-solid fa-location-dot fa-lg px-2 pt-1" style={{ color: "#da626e" }}></i>
            <select name="" id="" className='outline-0 p-4'>
              <option value="">Select Your City</option>
              {cities.map((item)=>(
                <option key={item.city} value="">{item.city.substring(0,1).toUpperCase()+item.city.slice(1)}</option>
              ))}
            </select>
            <div className='border h-6 mx-4 border-gray-300'></div>
            <i className="fa-solid fa-magnifying-glass fa-lg pt-1 pr-4"></i>
            <input type="search" name="" id="" className='outline-0 w-full' placeholder='Search for restaurants, cuisines or a dish' />
          </div>
          {type === "dining" && <Collections/>}
          <div className='flex space-x-4 my-4 font-thin'>
            <select name="cuisines" id="cuisines" className='outline-none border rounded-md p-2 text-gray-400' onChange={(e)=> setFilterCategory(e.target.value)}>
              <option value="">Cuisines</option>
              {cuisines.map((item)=>(
              <option key={item} value={item}>{item}</option>
              ))}
            </select>
            <select name="sort" id="sort by" className='outline-none border rounded-md p-2 text-gray-400' onClick={(e)=> getSortedRestaurants(e.target.value)}>
              <option value="">Sort By</option>
              {sort.map((item)=>(
              <option key={item} value={item}>{item.substring(0, 1).toUpperCase()+item.slice(1)}</option>
              ))}
            </select>
            <FormGroup>
              <FormControlLabel control={<Switch onChange={()=> setVeg(veg ? false : true)}/>} label="Veg Only" />
            </FormGroup>
          </div>
          {type === "order" ? <h2 className='text-3xl my-4'>Order food online in {selectedCity ? selectedCity.substring(0,1).toUpperCase()+selectedCity.slice(1) : "India"}</h2>: <h2 className='text-3xl my-4'>Dining Places in {selectedCity ? selectedCity.substring(0,1).toUpperCase()+selectedCity.slice(1) : "India"}</h2>}
          <div className='grid sm:grid-cols-2 md:grid-cols-3 justify-center'>
            {filteredRestaurants.length > 0 ? filteredRestaurants.map((item)=>(
              <Restaurants item={item} key={item._id}/>
            )) : "Restaurants Not Listed"}
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default RestaurantsList
