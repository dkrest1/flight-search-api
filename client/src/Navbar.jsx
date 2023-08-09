import React from 'react'
import { useState, useRef } from 'react'
// import { useClickAway } from 'react-use'
import { NavLink, Link } from 'react-router-dom'
import logo from './Assets/flight-logo.png'
import { accesstoken } from './Components/redux/tokenSlice'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faClose } from '@fortawesome/free-solid-svg-icons'
function Navbar() {
    const token = useSelector(accesstoken)
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu =()=>setIsOpen(false)

    // const ref = useRef(null)
    // useClickAway(ref,()=>{
    //     // setIsOpen(false)
    //     closeMenu()
    // })
  return (
    <nav className='w-[100%]'>
        <div className="relative flex">
        {/* Toggle mobile menu */}
            <div className="flex items-center sm:hidden">
                <button
                    type="button"
                    className="fixed top-1 inline-flex items-center justify-center p-2 rounded-md text-blue-950 text-xl hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={toggleMenu}
                    >
                    {isOpen ? <FontAwesomeIcon icon={faTimes}/> : <FontAwesomeIcon icon={faBars}/>}
                </button>
            </div>
            {/* Menu for larger screens */}
            <nav className='hidden sm:flex flex-rows w-full bg-hero-img box-content py-4 px-10'>
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
            <nav 
                className={`sm:hidden fixed max-h-screen z-50 inset-y-0 left-0 top-0 w-64 bg-blue-950 overflow-y-auto transition duration-500 transform ${
                    isOpen ? 'translate-x-0 ease-in' : ' transform -translate-x-full ease-out'
                    }`}>    
                     <button
                        className="absolute right-0 left-0 py-3 text-white hover:text-gray-500 focus:outline-none"
                        onClick={closeMenu}
                        >
                        <FontAwesomeIcon icon={faClose} className='text-2xl'/>
                    </button>
                    <div className="px-2 mt-12 pt-2 pb-3 divide-y-2 divide-gray-400 space-y-1">
                        <Link to="/"
                            className=" text-white block px-3 py-2 rounded-md text-base font-medium" onClick={closeMenu}>
                            Home
                        </Link>
                        <Link to="/bookings"
                            className="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={closeMenu}>
                            Bookings
                        </Link>
                         <Link to="/contact"
                            className="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={closeMenu}>
                            Contact us
                        </Link>
                        {!token &&(
                        <>
                            <Link to="/login"
                                className="text-gray-900 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={closeMenu}>
                                Login
                            </Link>
                            <Link to="/sign-up"
                                className="text-gray-900 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={closeMenu}>
                                Sign up
                            </Link>
                        </>
                        )}
                    </div>
            </nav>
        </div>
    </nav>
  )
}

export default Navbar