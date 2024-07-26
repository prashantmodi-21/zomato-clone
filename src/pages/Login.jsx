import React, { useEffect, useState } from 'react'
import { loginUser } from '../redux/apiCalls'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { app } from '../firebaseConfig';
const Login = () => {
  const [user, setUser] = useState({
    userId: "",
    password: ""
  })
  const dispatch = useDispatch()
  const {currentUser, isError} = useSelector(state=> state.user)
  
  
  useEffect(()=>{
    currentUser && (()=>{
      const auth = getAuth(app);
      signInWithCustomToken(auth, currentUser?.customToken)
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
  }, [currentUser])
  return ( 
    currentUser ? <Navigate to={"/"}/> : <div className='flex justify-center items-center h-[100vh] bg-gray-50'>
        <div className='p-6 md:p-8 bg-white space-y-4 shadow-md flex flex-col w-2/3 md:w-1/3'>
            <h3 className='text-3xl'>Login</h3>
            <input type="text" placeholder='Username or Email' className='text-sm p-2 outline-none border' name='userId' onChange={(e)=> setUser({...user, userId: e.target.value})}/>
            <input type="password" placeholder='Password' className='text-sm p-2 outline-none border' name='password' onChange={(e)=> setUser({...user, password: e.target.value})}/>
            <button disabled={user.userId < 6 && user.password < 6} className='font-thin rounded-md bg-[#EF4F5F] text-white p-1' onClick={()=> loginUser(dispatch, {userId: user.userId, password: user.password})}>Submit</button>
            {isError && <span className='text-sm text-[#EF4F5F]'>Enter Valid Credentials</span>}
        </div>
    </div> 
  )
}

export default Login
