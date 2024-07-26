import React from 'react'
import Cards from '../components/Cards'
import Tables from '../components/Tables'

const Dashboard = () => {
  return (
    <section id='dashboard' className='flex flex-col w-full sm:m-8'>
        <Cards/>
        <Tables/>
    </section>
  )
}

export default Dashboard
