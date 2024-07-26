import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from "react-redux"
import { Navigate } from "react-router-dom"
import { userLogin } from '../redux/apiCalls'
import { userMethod } from '../requestMethod'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebaseConfig'
import { loginFailed, loginStart, loginSuccess } from '../redux/userRedux'
const Login = () => {
  const {currentUser, isError}  = useSelector(state=> state.user)
  const dispatch = useDispatch()
  const [user, setUser] = useState({
    userId: "",
    password: "",
  })
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  const handleGoogleLogin = async()=>{
    dispatch(loginStart())
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      const response = await fetch("http://localhost:3000/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const userData = await response.json();
      dispatch(loginSuccess(userData))
    } catch (error) {
      console.error("Error during sign-in:", error);
      dispatch(loginFailed())
    }
  }
  return (
    currentUser ? <Navigate to="/"/> : <div className='flex justify-center items-center h-[100vh] bg-gray-50'>
        <div className='p-6 md:p-8 bg-white space-y-4 shadow-md flex flex-col w-2/3 md:w-1/3'>
            <h3 className='text-3xl'>Login</h3>
            <input type="text" placeholder='Username or Email' name='userId' onChange={(e)=> setUser({...user, [e.target.name]: e.target.value})} className='text-sm p-2 outline-none border'/>
            <input type="password" placeholder='Password' name='password' onChange={(e)=> setUser({...user, [e.target.name]: e.target.value})} className='text-sm p-2 outline-none border'/>
            <button disabled={user.userId.length < 5 || user.password.length < 5} className='font-thin rounded-md bg-[#EF4F5F] text-white p-1' onClick={()=> userLogin(dispatch, user)}>Submit</button>
            {isError && <span className='text-xs text-red-500'>Enter Valid Credentials</span>}
            <div className='text-center text-sm font-semibold text-gray-500'>Or</div>
            <div className='border text-sm font-semibold p-2 text-center' onClick={()=> handleGoogleLogin()}>Sign in with Google</div>
            <h4 className='font-thin'>New to Zomato? <span className='text-[#EF4F5F]'>Create Account</span></h4>
        </div>
    </div>
  )
}

export default Login
