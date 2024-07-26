import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { deleteMenu, getMenu } from '../../redux/apiCalls'
import { useDispatch, useSelector } from 'react-redux'

const MenuList = () => {
  const {user} = useSelector(state=>state.admin)
  const {menuItems} = useSelector(state=>state.menu)
  const dispatch = useDispatch()
  useEffect(()=>{
    getMenu(dispatch, user.restaurantId)
  }, [])
  return (
          <div className='px-4 py-8 sm:p-8 w-full text-sm'>
            <div className='flex justify-between mb-2'>
              <h1 className='text-2xl sm:text-4xl'>Menu Items</h1>
              <Link to="/addmenuitem"><button className='p-2 bg-red-400 rounded-md text-white text-sm sm:text-md'>Add Restaurants</button></Link>
            </div>
            <table className='w-full text-center text-sm sm:text-md'>
              <thead>
              <tr className='border-b'>
                <th className='p-2 sm:px-4 py-2'>Id</th>
                <th className='p-2 sm:px-4 py-2'>Name</th>
                <th className='p-2 sm:px-4 py-2'>Image</th>
                <th className='p-2 sm:px-4 py-2'>Price</th>
                <th className='p-2 sm:px-4 py-2'>Rating</th>
                <th className='p-2 sm:px-4 py-2'>Buttons</th>
              </tr>
              </thead>
              <tbody>
              {menuItems.map((item)=>(
                <tr className='border-b' key={item._id}>
                  <td className='p-2 sm:px-4 py-2'>{item._id}</td>
                  <td className='p-2 sm:px-4 py-2'>{item.dish}</td>
                  <td className='p-2 sm:px-4 py-2'><img src={item.image} alt="dish" width="80px"/></td>
                  <td className='p-2 sm:px-4 py-2'>{item.price}</td>
                  <td className='p-2 sm:px-4 py-2'>{item.rating}</td>
                  <td className='space-x-2'><i className="fa-solid fa-trash bg-red-400 text-white rounded p-2" onClick={()=> deleteMenu(dispatch, item._id)}></i><Link to={`/updatemenuitem/${item._id}`}><i className="fa-solid fa-pen bg-blue-400 text-white rounded p-2"></i></Link></td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
  )
}

export default MenuList
