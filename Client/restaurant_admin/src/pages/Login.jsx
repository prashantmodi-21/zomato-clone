import React, { useEffect, useState } from 'react'
import { userLogin } from '../redux/apiCalls'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { app } from '../firebaseConfig';

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user, isError} = useSelector(state=>state.admin)
  const [field, setField] = useState({
    userId: "",
    password: ""
  })
  
  useEffect(()=>{
    user && (()=>{
      const auth = getAuth(app);
      signInWithCustomToken(auth, user?.customToken)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage)
        });
    })()
    user && navigate("/")
  }, [user])
  return (
    <div className='flex justify-center items-center h-[100vh] bg-gray-50'>
        <div className='p-6 md:p-8 bg-white space-y-4 shadow-md flex flex-col w-2/3 md:w-1/3'>
            <h3 className='text-3xl'>Login</h3>
            <input type="text" placeholder='Email' name='userId' onChange={(e)=> setField({...field, [e.target.name]: e.target.value})} className='text-sm p-2 outline-none border'/>
            <input type="password" placeholder='Password' name='password' onChange={(e)=> setField({...field, [e.target.name]: e.target.value})} className='text-sm p-2 outline-none border'/>
            <button disabled={field.userId.length < 6 || field.password.length < 6} className='font-thin rounded-md bg-[#EF4F5F] text-white p-1' onClick={()=> userLogin(dispatch, field)}>Submit</button>
            {isError && <span className='text-sm text-[#EF4F5F]' >Enter Valid Credentials</span>}
        </div>
    </div>
  )
}

export default Login
