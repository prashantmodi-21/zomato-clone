import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { logoutSuccess } from '../redux/userRedux'
import {getAuth, signOut} from "firebase/auth"
import { app } from '../firebaseConfig'

const Sidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {currentUser} =  useSelector(state=>state.user)
  
  const handleLogout = ()=>{
    const auth = getAuth(app);
    signOut(auth).then(() => {
      dispatch(logoutSuccess())
    }).catch((error) => {
      console.log(error)
    });
  }
  useEffect(()=>{
    !currentUser && navigate("/login")
  }, [currentUser])
  return (
   <aside className='px-12 py-8 bg-sky-50 w-full h-fit sm:w-fit sm:h-[92vh] text-sm sm:text-md'>
      <div className='flex flex-col items-center space-y-8'>
        <Link to="/"><div className='flex items-center'>
          <i className="fa-solid fa-gauge mr-2"></i>
          <span className='font-thin'>Dashboard</span>
        </div></Link>
        <Link to="/restaurants"><div className='flex items-center'>
          <i className="fa-solid fa-utensils mr-2"></i>
          <span className='font-thin'>Restaurants</span>
        </div></Link>
        <Link to="/revenue"><div className='flex items-center'>
          <i className="fa-solid fa-chart-simple mr-2"></i>
          <span className='font-thin'>Revenue</span>
        </div></Link>
        <Link to="/users"><div className='flex items-center'>
          <i className="fa-solid fa-user-tie mr-2"></i>
          <span className='font-thin'>User</span>
        </div></Link>
        <Link to="/" onClick={()=> handleLogout()}><div className='flex items-center'>
          <i className="fa-solid fa-right-from-bracket mr-2"></i>
          <span className='font-thin'>Logout</span>
        </div></Link>
      </div>
    </aside>
  )
}

export default Sidebar
