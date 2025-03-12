import React from 'react';
import logo from '../assets/logo.png';
import logoName from '../assets/logo(1).png'

const Navbar = () => {
  return (
    <div>
      <div className='bg-white rounded-b-sm h-18 w-full'>
        <div className='flex h-16 rounded-full items-center mx-5'>
            <img src={logoName} className='h-12 w-24' alt="" />
        </div>
      </div>
    </div>
  )
}

export default Navbar
