import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from './Assets/flight-logo.png'
function Navbar() {
  return (
        <nav className='flex flex-rows bg-hero-img box-content py-4 px-10'>
            <div className='flex flex-row w-full justify-between '>
                <NavLink to='/' className='flex flex-row text-white gap-2 font-semibold text-xl'>
                    <img src={logo} alt='logo' className='absolute w-24 h-24 -mt-8 -ml-9'/>
                    <h6 className='ml-8 '>Travel</h6>
                </NavLink>
                <nav className='flex flex-row gap-5 text-white font-medium text-lg'>
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