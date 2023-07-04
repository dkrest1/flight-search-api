import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Navbar from '../Navbar'
import { DropDownSearch } from './Flights'
import airports from './airports.json'
import { useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'


const Home = () => {
  const [departureOption, setDepartureOption] = useState(null)
  const [arrivalOption, setArrivalOption] = useState(null)
  const options = airports.map((item)=>({
    value: item.code,
    label: `${item.city} - ${item.code} `,
  }))
  const settings = {
    dots: true,
    infinite:true,
    speed: 500,
    slideToShow:1,
    SlideToScroll: 1,
  }

  return (
    <>
    <Navbar/>
    <div className='hidden sm:flex flex-col w-full h-full justify-center px-8'>
      <div className='hidden sm:flex flex-col text-white font-bold font-sans text-8xl tracking-wider gap-2'>
        <h1>Ready To</h1>
        <h1>Takeoff?</h1>
      </div>
      <div className='hidden sm:block text-xl text-slate-100 font-medium mt-6'>
        <p className=''> It's a big world out there, book your flight</p>
        <p>tickets easily and explore your dream destination.</p>
      </div>
      <div>
        <button className='text-white text-2xl font-medium mt-6 px-9 rounded-md bg-blue-950 py-2'>Book Now
        </button>
      </div>
    </div>
    <div className='w-full p-2 bg-white sm:hidden'>
      <div className='flex flex-col'>
        <h3 className='text-lg text-blue-950 font-bold'>Welcome,</h3>
        <p>It's a big world out there, book your flight tickets easily and explore your dream destinations</p>
      </div>
      <div className='w-full mt-6 '>
        <form className='w-full flex flex-col'>
          <select name='class'className='border border-slate-300 rounded p-2'>
            <option value=''>First class</option>
            <option value='' >First class</option>
            <option value='' >Economy class</option>
            </select>
            <div className='relative text-sm mt-2'>
              <small className='absolute left-1 -top-1 z-10 text-[9px]'>From</small>
              <DropDownSearch selectedOption={departureOption} setSelectedOption={setDepartureOption} options={options} className=''/>
            </div>
            <div className='relative text-sm mt-2'>
              <small className='absolute left-1 -top-1 z-10 text-[9px]'>To</small>
              <DropDownSearch selectedOption={arrivalOption} setSelectedOption={setArrivalOption} options={options} className=''/>
            </div>
            <div className='flex flex-row w-full gap-6 mt-2 h-12'>
              <input type='date' className='border rounded w-1/2 p-1'/>
              <div className='flex flex-row border rounded gap-2 w-1/2 p-1'>
                <div className='flex flex-col'>
                  <small className='text-slate-500'>Passengers</small>
                  <input type='number' className='-mt-1 focus:outline-none'/>
                </div>
                <div className='-ml-8 mt-3 flex flex-row'>
                  <FontAwesomeIcon icon={faUser} className='text-slate-500 text-sm'/>
                  <FontAwesomeIcon icon={faUser} className='text-slate-500 text-xs -ml-1'/>
                </div>
              </div>
            </div>
            <button className='text-white bg-blue-950 font-medium text-lg rounded tracking-wider mt-3 py-2'>Search</button>
        </form>
      </div>
      <div className='mt-5 font-semibold text-lg '>
        <h2>Top Deals</h2>
        <div className='w-full flex flex-col border2'>
          <Slider {...settings} className='w-[90%] h-40'>
            <div className='w-full h-40 p-1 flex flex-row justify-center items-center bg-hero-img bg-cover'>
              <div className='flex flex-col'>
                <h1 className='text-white'>Lagos - London</h1>
                <p className='text-white'>29 July -  30 August </p>
              </div>
              <div className=''>
                <button className='bg-blue-950 text-white rounded py-1 px-3'>Pay $1100</button>
              </div>
            </div>
            <div className='w-full h-40 p-1 border-2 flex flex-col justify-center items-center bg-hero-img bg-cover'>
              <div>
                <h1 className='text-white'>Lagos - London</h1>
                <p className='text-white'>19 June -  100 July </p>
              </div>
              <div>
                <button className='bg-blue-950 text-white rounded py-1 px-3'>Pay $1100</button>
              </div>
            </div>
          </Slider>
        </div>
      </div>
      <div className='flex flex-col items-center mt-12'>
        <h3 className='font-semibold text-lg '>Get exlusive deals & travel updates</h3>
        <p className='text-xs text-slate-400'>Enter your email and subscribe!!</p>
      </div>
      <form>
        <div className='flex flex-row'>
          <input
            className=' border rounded-sm'
            placeholder='Email'
            type='email'
            />
            <button className='bg-blue-950 text-white font-medium text-lg'>Subscribe</button>
        </div>
      </form>
    </div>
    </>
  )
}

export default Home