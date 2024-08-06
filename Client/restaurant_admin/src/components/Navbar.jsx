import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userAutoLogout } from '../redux/userRedux'
const Navbar = () => {
  const dispatch = useDispatch()
  const {loginTime} = useSelector(state=>state.admin)
  useEffect(()=>{
    const intFunction = setInterval(() => {
      if (loginTime && Date.now() - loginTime >  24 * 60 * 60 * 1000) {
        // 24 hours have passed
        dispatch(userAutoLogout());
      }
    }, 60000);

    return ()=> clearInterval(intFunction)
    
  }, [])
  return (
    <nav id='navbar' className='bg-sky-50 transition-all'>
      <div className='flex items-center justify-between px-8 py-4'>
      <div className='flex items-center'>
        <h4 className='text-xl'>Admin</h4>
      </div>
      <div className='border-2 border-[#1e3050] rounded-md'><i className="fa-regular fa-user p-2"></i></div>
      </div>
    </nav>
  )
}

export default Navbar
