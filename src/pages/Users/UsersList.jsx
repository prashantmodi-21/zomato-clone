import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { deleteUsers, getUsers } from '../../redux/apiCalls'
import {useDispatch, useSelector} from "react-redux"

const UsersList = () => {
  const dispatch = useDispatch()
  const { users } = useSelector(state=> state.user)
  useEffect(()=>{
    getUsers(dispatch)
  }, [])
  return (
    <>
        <div className='flex flex-col w-full'>
          <div className='px-4 py-8 sm:p-8 w-full'>
            <div className='flex justify-between mb-2'>
              <h1 className='text-2xl sm:text-4xl'>Users List</h1>
              <Link to="/adduser"><button className='p-2 bg-red-400 rounded-md text-white text-sm sm:text-md'>Add User</button></Link>
            </div>
            <table className='w-full text-center text-sm sm:text-md'>
              <thead>
              <tr className='border-b'>
                <th className='p-2 sm:p-4'>Id</th>
                <th className='p-2 sm:p-4'>Restaurant Id</th>
                <th className='p-2 sm:p-4'>Name</th>
                <th className='p-2 sm:p-4'>Phone</th>
                <th className='p-2 sm:p-4'>Email</th>
                <th className='p-2 sm:p-4'>isAdmin</th>
                <th className='p-2 sm:p-4'>Buttons</th>
              </tr>
              </thead>
              <tbody>
              {users?.map((item, i)=>(
              <tr className='border-b' key={i}>
                <td className='p-2 sm:p-4'>{item._id}</td>
                <td className='p-2 sm:p-4'>{item.restaurantId}</td>
                <td className='p-2 sm:p-4'>{item.name}</td>
                <td className='p-2 sm:p-4'>{item.phone}</td>
                <td className='p-2 sm:p-4'>{item.email}</td>
                <td className='p-2 sm:p-4'>{item.isAdmin ? "Yes" : "No"}</td>
                <td className='space-x-2'><i className="fa-solid fa-trash bg-red-400 text-white rounded p-2" onClick={()=> deleteUsers(dispatch, item._id)}></i><Link to={`/updateuser/${item._id}`}><i className="fa-solid fa-pen bg-blue-400 text-white rounded p-2"></i></Link></td>
              </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
    </>
  )
}

export default UsersList
