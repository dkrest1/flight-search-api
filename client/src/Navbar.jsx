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
                    <NavLink to ='/flights' end className={({ isActive, isPending }) =>isPending ? "pendinglink" : isActive ? "activelink" : "pendinglink"}>Flights</NavLink>
                    <NavLink to ='/bookings' end
                        className={({ isActive, isPending }) =>isPending ? "pendinglink hover:text-lg" : isActive ? "activelink" : " pendinglink"}
                    >Bookings</NavLink>
                    <NavLink to ='/contact' end
                        className={({ isActive, isPending }) =>isPending ? "pendinglink" : isActive ? "activelink" : "pendinglink"}
                    >Contact Us</NavLink>
                </nav>
            </div>
        </nav>
  )
}

export default Navbar