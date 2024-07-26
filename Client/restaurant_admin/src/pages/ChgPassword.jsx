import React, { useState } from 'react'
import { userMethod } from '../../requestMethod'
import { useSelector } from 'react-redux'

const ChgPassword = () => {
  const {user} = useSelector(state=>state.admin)
  const [password, setPasssword] = useState({
    newPassword: "",
    cPassword: ""
  })
  const updatePassword = async()=>{
    try {
      if(password.newPassword === password.cPassword){
        await userMethod.put(`/user/${user._id}`, {password: password.newPassword})
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='p-8 w-2/3'>
          <h1 className='text-4xl pb-4'>Change Password</h1>
          <div id='form w-full'>
            <input type="password" placeholder='Enter New Password' name='newPassword' onChange={(e)=> setPasssword({...password, [e.target.name]: e.target.value})} className=' p-2 outline-0 rounded border w-full my-2'/>
            <input type="password" placeholder='Confirm New Password' name='cPassword' onChange={(e)=> setPasssword({...password, [e.target.name]: e.target.value})} className=' p-2 outline-0 rounded border w-full my-2'/>
            <button className='p-2 bg-red-400 text-white block rounded my-2' onClick={()=> updatePassword()}>Submit</button>
          </div>
        </div>
  )
}

export default ChgPassword
