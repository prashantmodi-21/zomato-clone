import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useParams} from "react-router-dom"
import { updateUser } from '../../redux/apiCalls'

const UpdateUser = () => {
  const dispatch = useDispatch()
  const {id} = useParams()
  const {users} = useSelector(state=>state.user)
  const selectedUser = users.find(item=> item._id === id)
  const [fields, setFields] = useState({
    username: "",
    name: "",
    restaurantId: "",
    email: "",
    phone: "",
    password: "",
    isAdmin: false
  })

  useEffect(()=>{
    setFields({username: selectedUser.username, name: selectedUser.name, restaurantId: selectedUser.restaurantId, email: selectedUser.email, phone: selectedUser.phone, isAdmin: selectedUser.isAdmin})
  }, [])
  console.log(selectedUser)
  return (
    <>
        <div className='p-8'>
          <h1 className='text-4xl pb-4'>Update User</h1>
          <div id='form w-full'>
            <label htmlFor="">Username<input type="text" placeholder='Username' name='username' value={fields.username} onChange={(e)=> setFields({...fields, [e.target.name]: e.target.value})} className=' p-2 outline-0 rounded border w-full my-2'/></label>
            <label htmlFor="">Name<input type="text" placeholder='Name' name='name' value={fields.name} onChange={(e)=> setFields({...fields, [e.target.name]: e.target.value})} className=' p-2 outline-0 rounded border w-full my-2'/></label>
            <label htmlFor="">RestaurantId<input type="text" placeholder='ReaturantId' name='restaurantId' value={fields.restaurantId} onChange={(e)=> setFields({...fields, [e.target.name]: e.target.value})} className=' p-2 outline-0 rounded border w-full my-2'/></label>
            <label htmlFor="">Email<input type="email" placeholder='Email' name='email' value={fields.email} onChange={(e)=> setFields({...fields, [e.target.name]: e.target.value})} className=' p-2 outline-0 rounded border w-full my-2'/></label>
            <label htmlFor="">Phone<input type="text" placeholder='Phone' name='phone' value={fields.phone} onChange={(e)=> setFields({...fields, [e.target.name]: e.target.value})} className=' p-2 outline-0 rounded border w-full my-2'/></label>
            <label htmlFor="">Password<input type="password" placeholder='Password' name='password' value={fields.password} onChange={(e)=> setFields({...fields, [e.target.name]: e.target.value})} className=' p-2 outline-0 rounded border w-full my-2'/></label>
            <label htmlFor="">isAdmin<input type="radio" className=' mx-4' name='isAdmin' value="true" onChange={(e)=> setFields({...fields, [e.target.name]: e.target.value})}/>Yes<input type="radio" className=' mx-4' name='isAdmin' value="false" onChange={(e)=> setFields({...fields, [e.target.name]: e.target.value})}/>No</label>
            <button className='p-2 bg-red-400 text-white block rounded my-2' onClick={()=> updateUser(dispatch, {id, ...fields})}>Submit</button>
          </div>
        </div>
        </>
  )
}

export default UpdateUser
