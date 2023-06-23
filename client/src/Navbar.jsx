import React from 'react'
import { NavLink } from 'react-router-dom'
// import heroImg from '../public/Assets/hero-img.jpg'

function Navbar() {
  return (
        <nav className='flex flex-row w-full py-4 px-10'>
            <div className='flex flex-row w-full justify-between '>
                <NavLink to='/' className='flex flex-row text-white gap-2 font-medium'>
                    <img src='' alt='logo'/>
                    <h6>Travel</h6>
                </NavLink>
                <nav className='flex flex-row gap-5 text-white font-medium'>
                    <NavLink to ='/flights'>Flights</NavLink>
                    <NavLink to ='/bookings'>Bookings</NavLink>
                    <NavLink to ='/contact'>Contact Us</NavLink>
                </nav>
            </div>
        </nav>
  )
}

export default Navbar