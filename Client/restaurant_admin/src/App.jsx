import { Outlet } from 'react-router-dom'
import './App.css'
import Cards from './components/Cards'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Tables from './components/Tables'

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
