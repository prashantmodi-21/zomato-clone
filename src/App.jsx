import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

function App() {

  return (
    <>
    <Navbar/>
    <div className='flex flex-col sm:flex-row'>
      <Sidebar/>
      <Outlet/>
    </div>
    </>
  )
}

export default App
