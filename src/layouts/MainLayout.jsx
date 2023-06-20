import React from 'react'
import Navbar from '../components/Navbar';

const MainLayout = ({ children }) => {
  return (
    <>
      <div className='relative  h-screen w-screen overflow-x-hidden' style={{
        backgroundImage: 'url("https://static.vecteezy.com/system/resources/previews/004/968/002/original/cute-abstract-modern-background-free-vector.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        
      }}>
        <Navbar />
        {children}
      </div>
    </>
  )
}

export default MainLayout;