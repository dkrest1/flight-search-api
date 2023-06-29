import React from 'react'

const Home = () => {
  return (
    <div className='flex flex-col w-full justify-center h-full px-8'>
      <div className='flex flex-col text-white font-bold font-sans text-8xl tracking-wider gap-2'>
        <h1>Ready To</h1>
        <h1>Takeoff?</h1>
      </div>
      <div className='text-xl text-slate-100 font-medium mt-6'>
        <p className=''> It's a big world out there, book your flight</p>
        <p>tickets easily and explore your dream destination.</p>
      </div>
      <div>
        <button className='text-white text-2xl font-medium mt-6 px-9 rounded-md bg-blue-950 py-2'>Book Now
        </button>
      </div>
    </div>
  )
}

export default Home