import React, { useState } from 'react'
import { addUser } from '../redux/apiCalls'
import { useDispatch, useSelector } from 'react-redux'
import { addUserFailed } from '../redux/userRedux'
import { Navigate } from 'react-router-dom'

const Register = () => {
  const {currentUser} = useSelector(state=>state.user)
  const dispatch = useDispatch()
  const {isError} = useSelector(state=>state.user)
  const [user, setUser] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: ""
  })
  return (
    currentUser ? <Navigate to={"/"}/> : <div className='flex justify-center items-center h-[100vh] bg-gray-50'>
        <div className='p-6 md:p-8 bg-white space-y-4 shadow-md flex flex-col w-2/3 md:w-1/3'>
            <h3 className='text-3xl'>Sign Up</h3>
            <input type="text" placeholder='Username' name='username' onChange={(e)=> setUser({...user, [e.target.name]: e.target.value})} className='text-sm p-2 outline-none border'/>
            <input type="text" placeholder='Name' name='name' onChange={(e)=> setUser({...user, [e.target.name]: e.target.value})} className='text-sm p-2 outline-none border'/>
            <input type="email" placeholder='Email' name='email' onChange={(e)=> setUser({...user, [e.target.name]: e.target.value})} className='text-sm p-2 outline-none border'/>
            <input type="text" placeholder='Phone' name='phone' onChange={(e)=> setUser({...user, [e.target.name]: e.target.value})} className='text-sm p-2 outline-none border'/>
            <input type="password" placeholder='Password' name='password' onChange={(e)=> setUser({...user, [e.target.name]: e.target.value})} className='text-sm p-2 outline-none border'/>
            <input type="password" placeholder='Confirm Password' name='cpassword' onChange={(e)=> setUser({...user, [e.target.name]: e.target.value})} className='text-sm p-2 outline-none border'/>
            {isError && <span className='text-xs text-red-500'>Password not Match</span>}
            <button className='font-thin rounded-md bg-[#EF4F5F] text-white p-1' onClick={()=> user.password === user.cpassword ? addUser(dispatch, user) : dispatch(addUserFailed())}>Submit</button>
            <div className='text-center text-sm font-semibold text-gray-500'>Or</div>
            <div className='border text-sm font-semibold p-2 text-center'>Sign in with Google</div>
            <h4 className='font-thin'>Already Have an Account? <span className='text-[#EF4F5F]'>Login</span></h4>
        </div>
    </div>
  )
}

export default Register
