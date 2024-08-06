import React, { useState } from 'react'
import { addUsers } from '../../redux/apiCalls'
import { useDispatch } from 'react-redux'
const AddUser = () => {
  const dispatch = useDispatch()
  const [fields, setFields] = useState({
    username: "",
    name: "",
    restaurantId: "",
    email: "",
    phone: "",
    password: "",
    isAdmin: false
  })
  return (
    <>
        <div className='p-8'>
          <h1 className='text-4xl pb-4'>Add User</h1>
          <div id='form w-full'>
            <label htmlFor="">Username<input type="text" placeholder='Username' name='username' onChange={(e)=> setFields({...fields, [e.target.name]: e.target.value})} className=' p-2 outline-0 rounded border w-full my-2'/></label>
            <label htmlFor="">Name<input type="text" placeholder='Name' name='name' onChange={(e)=> setFields({...fields, [e.target.name]: e.target.value})} className=' p-2 outline-0 rounded border w-full my-2'/></label>
            <label htmlFor="">RestaurantId<input type="text" placeholder='RestaurantId' name='restaurantId' onChange={(e)=> setFields({...fields, [e.target.name]: e.target.value})} className=' p-2 outline-0 rounded border w-full my-2'/></label>
            <label htmlFor="">Email<input type="email" placeholder='Email' name='email' onChange={(e)=> setFields({...fields, [e.target.name]: e.target.value})} className=' p-2 outline-0 rounded border w-full my-2'/></label>
            <label htmlFor="">Phone<input type="text" placeholder='Phone' name='phone' onChange={(e)=> setFields({...fields, [e.target.name]: e.target.value})} className=' p-2 outline-0 rounded border w-full my-2'/></label>
            <label htmlFor="">Password<input type="password" placeholder='Password' name='password' onChange={(e)=> setFields({...fields, [e.target.name]: e.target.value})} className=' p-2 outline-0 rounded border w-full my-2'/></label>
            <label htmlFor="">isAdmin<input type="radio" className=' mx-4' name='isAdmin' value="true" onChange={(e)=> setFields({...fields, [e.target.name]: e.target.value})}/>Yes<input type="radio" className=' mx-4' name='isAdmin' value="false" onChange={(e)=> setFields({...fields, [e.target.name]: e.target.value})}/>No</label>
            <button className='p-2 bg-red-400 text-white block rounded my-2' onClick={()=> addUsers(dispatch, fields)}>Submit</button>
          </div>
        </div>
        </>
  )
}

export default AddUser
