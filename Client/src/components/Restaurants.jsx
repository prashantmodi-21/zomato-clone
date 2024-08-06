import React from 'react'
import { Link } from 'react-router-dom'

const Restaurants = ({item: {_id, image, name, cuisines, rating}}) => {
  console.log((Math.ceil(rating)+2)*100)
  return (
          <Link to={`/restaurant/${_id}`}><div className='hover:shadow-md rounded-lg m-2 p-2'>
            <div className='card'>
              <img src={image} alt={name} className='rounded-xl object-cover h-full'/>
            </div>
            <div className='flex justify-between items-center'>
              <h4 className='text-lg font-semibold'>{name}</h4>
              <div className={`flex items-center space-x-1 font-semibold ${rating >= 4 ? `bg-green-700` : rating >= 3 ? `bg-green-600` : `bg-yellow-500`} rounded-lg text-white text-xs p-1`}><span>{rating}</span><i className="fa-solid fa-star"></i></div>
            </div>
            <div className='font-thin text-sm text-gray-500'>
              <span>{cuisines.toString().split(", ")}</span>
            </div>
          </div>
          </Link>
  )
}

export default Restaurants
