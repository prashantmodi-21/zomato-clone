import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logoutSuccess } from '../redux/userRedux'
import { getAuth, signOut } from 'firebase/auth'
import { app } from '../firebaseConfig'

const Sidebar = () => {
  const dispatch = useDispatch()
  const {user} = useSelector(state=>state.admin)
  const navigate = useNavigate()
  
  const handleLogout = ()=>{
    const auth = getAuth(app);
    signOut(auth).then(() => {
      dispatch(logoutSuccess())
    }).catch((error) => {
      console.log(error)
    });
  }
  useEffect(()=>{
    !user && navigate("/login")
  }, [user])
  return (
    <aside className='px-12 py-8 bg-sky-50 w-full h-fit sm:w-fit sm:h-[92vh] text-sm sm:text-md'>
      <div className='flex flex-col items-center space-y-8'>
        <Link to="/"><div className='flex items-center'>
          <i className="fa-solid fa-gauge mr-2"></i>
          <span className='font-thin'>Dashboard</span>
        </div></Link>
        <Link to="/menu"><div className='flex items-center'>
          <i className="fa-solid fa-list mr-2"></i>
          <span className='font-thin'>Menu</span>
        </div></Link>
        <Link to="/sales"><div className='flex items-center'>
          <i className="fa-solid fa-coins mr-2"></i>
          <span className='font-thin'>Sales</span>
        </div></Link>
        <Link to="/orders"><div className='flex items-center'>
          <i className="fa-solid fa-clock mr-2"></i>
          <span className='font-thin'>Order</span>
        </div></Link>
        <Link to="/chgpass"><div className='flex items-center'>
          <i className="fa-solid fa-key mr-2"></i>
          <span className='font-thin'>Change Password</span>
        </div></Link>
        <div className='flex items-center cursor-pointer' onClick={()=> handleLogout()}>
          <i className="fa-solid fa-right-from-bracket mr-2"></i>
          <span className='font-thin'>Logout</span>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
