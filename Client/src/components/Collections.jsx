import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Collections = () => {
  const {selectedCity} = useSelector(state=>state.location)
  const {restaurants} = useSelector(state=>state.restaurant)
  return (
    <div id='collection' className='pt-10'>
        <h2 className='text-4xl'>Collections</h2>
        <span className='text-xl font-thin'>Explore curated lists of top restaurants, cafes, pubs, and bars in {selectedCity ? selectedCity.slice(0,1).toUpperCase()+selectedCity.substring(1) : "India"}, based on trends</span>
        <div className='flex flex-col md:flex-row py-6 text-white'>
          <Link to="/restaurants/veg" className='bg-[url("/img/collection-1.avif")] bg-cover rounded-md w-full h-80 m-2 flex flex-col justify-end'>
            <div className='bg-gradient-to-t from-black p-2 rounded-md'>
              <h3 className='text-xl'>Veggie Friendly</h3>
              <div className='flex items-center'>
                <span className='mr-2'>{restaurants.filter(i=> i.services.includes("veg")).length} Places </span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" width="10" height="10" viewBox="0 0 20 20" aria-labelledby="icon-svg-title- icon-svg-desc-" role="img" className="sc-rbbb40-0 gvsUip"><title>right-triangle</title><path d="M5 0.42l10 10-10 10v-20z"></path></svg>
              </div>
            </div></Link>
          <Link to="/restaurants/budget" className='bg-[url("/img/collection-2.avif")] bg-cover rounded-md w-full h-80 m-2 flex flex-col justify-end'>
            <div className='bg-gradient-to-t from-black p-2 rounded-md'>
              <h3 className='text-xl'>Pocket Friendly</h3>
              <div className='flex items-center'>
                <span className='mr-2'>{restaurants.filter(i=> i.services.includes("budget")).length} Places </span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" width="10" height="10" viewBox="0 0 20 20" aria-labelledby="icon-svg-title- icon-svg-desc-" role="img" className="sc-rbbb40-0 gvsUip"><title>right-triangle</title><path d="M5 0.42l10 10-10 10v-20z"></path></svg>
              </div>
            </div></Link>
          <Link to="/restaurants/premium" className='bg-[url("/img/collection-3.avif")] bg-cover rounded-md w-full h-80 m-2 flex flex-col justify-end'>
            <div className='bg-gradient-to-t from-black p-2 rounded-md'>
              <h3 className='text-xl'>Legendry Outlets</h3>
              <div className='flex items-center'>
                <span className='mr-2'>{restaurants.filter(i=> i.services.includes("premium")).length} Places </span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" width="10" height="10" viewBox="0 0 20 20" aria-labelledby="icon-svg-title- icon-svg-desc-" role="img" className="sc-rbbb40-0 gvsUip"><title>right-triangle</title><path d="M5 0.42l10 10-10 10v-20z"></path></svg>
              </div>
            </div></Link>
          <Link to="/restaurants/meals" className='bg-[url("/img/collection-4.avif")] bg-cover rounded-md w-full h-80 m-2 flex flex-col justify-end'>
            <div className='bg-gradient-to-t from-black p-2 rounded-md'>
              <h3 className='text-xl'>Terrific Thali</h3>
              <div className='flex items-center'>
                <span className='mr-2'>{restaurants.filter(i=> i.services.includes("meals")).length} Places </span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" width="10" height="10" viewBox="0 0 20 20" aria-labelledby="icon-svg-title- icon-svg-desc-" role="img" className="sc-rbbb40-0 gvsUip"><title>right-triangle</title><path d="M5 0.42l10 10-10 10v-20z"></path></svg>
              </div>
            </div></Link>
        </div>
      </div>
  )
}

export default Collections
