import React from 'react'

const Home = () => {
  return (
    <div className='flex flex-col justify-center h-full px-8'>
      <div className='flex flex-col text-white font-semibold font-sans text-6xl tracking-wider gap-2'>
        <h1>Ready To</h1>
        <h1>Takeoff?</h1>
      </div>
      <div className='text-sm text-slate-100 font-medium mt-6'>
        <p className=''> It's a big world out there, book your flight</p>
        <p>tickets easily and explore your dream destination.</p>
      </div>
      <button className='text-slate-200 text-sm font-medium mt-4 w-28 rounded-md bg-blue-950 py-1'>Book Now</button>
    </div>
  )
}

export default Home