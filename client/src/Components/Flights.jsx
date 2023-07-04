import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faFilter, faPlane, faSort, faUser, faPlaneDeparture, faPlaneArrival, faCalendarDays, faShoePrints} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Select from 'react-select'
import airports from './airports.json'
import { useState } from 'react'

export const DropDownSearch =({selectedOption, setSelectedOption, options})=>{
  
  const handleChange =(selectedOption)=>{
    setSelectedOption(selectedOption)
  }

  return(
    <div>
      <Select
        className='md:text-base'
        options={options}
        value={selectedOption}
        onChange={handleChange}
        isSearchable
        placeholder=''
        />
    </div>
  )
}
function Flights() {
  const [departureOption, setDepartureOption] = useState(null)
  const [ArrivalOption, setArrivalOption] = useState(null)
  const options = airports.map((item)=>({
    value: item.code,
    label: `${item.city} - ${item.code} `,
  }))
  // console.log(selectedOption)

  return (
    <div className='w-[100%] h-full flex flex-col items-center mt-3 bg-white '>
      <div className='w-[90%] flex flex-col rounded-lg shadow-xl h- pb-10 px-2 mt-10 border-2 '>
        <div className='flex flex-row divide-x text-xs rounded border-2 w-fit mt-3 mx-3'>
          <button className='p-1'>FIRST</button>
          <button className='p-1'>ECONOMY</button>
          <button className='p-1'>BUSINESS</button>
        </div>
        <div className='flex flex-row mt-4 gap-5 mx-2' >
          <div className='w-[45%] flex flex-row divide-x-2 rounded-lg border-2'>
            <div className='w-[50%] flex flex-row divide-x py-4 items-center'>
              <div className=' flex flex-row justify-center items-center rounded-full bg-blue-950 w-7 h-6 mx-1'>
                <FontAwesomeIcon 
                className='text-white text-sm'
                icon={faPlaneDeparture} />
              </div>
              <div className='flex flex-col pl-1 w-full px-3'>
                <small className='text-xs text-slate-400 font-medium mb-1'>Departure</small>
                <div className=' w-full font-medium text-blue-950'>
                  <DropDownSearch selectedOption={departureOption} setSelectedOption={setDepartureOption} options={options} />
                </div>
              </div>
            </div>
            <div className='w-[50%] flex flex-row divide-x pl-1 py-2 items-center'>
            <div className=' flex flex-row justify-center items-center rounded-full bg-blue-950 w-7 h-6 mx-1'>
                <FontAwesomeIcon 
                className='text-white text-sm'
                icon={faPlaneArrival} />
              </div>
              <div className='flex flex-col w-full px-1'>
                <small className='text-xs text-slate-400 font-medium mb-1'>Arrival</small>
                <div className='w-full font-medium text-blue-950'>
                  <DropDownSearch selectedOption={ArrivalOption} setSelectedOption={setArrivalOption} options={options} 
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='w-[45%] flex flex-row divide-x-2  rounded-lg border-2'>
            <div className='w-[50%] flex flex-row divide-x py-2 items-center'>
              <div className=' flex flex-row justify-center items-center rounded-full bg-blue-950 w-6 h-6 mx-1'>
                  <FontAwesomeIcon 
                  className='text-white text-sm'
                  icon={faCalendarDays} />
                </div>              
                <div className='flex flex-col pl-1'>
                  <small className='text-sm font-medium text-slate-400'>Departure Date</small>
                  <p className='text-sm font-medium text-blue-950'>
                    <input 
                      type='date'
                      />
                  </p>
                </div>
              </div>
              <div className='w-[50%] flex flex-row divide-x  items-center mx-1 '>
                <div className=' flex flex-row justify-center items-center rounded-full bg-blue-950 w-6 h-6 mx-1'>
                  <FontAwesomeIcon 
                  className='text-white text-sm'
                  icon={faShoePrints}
                  rotation={270}
                   />
                </div>
                <div className='w-full flex flex-col '>
                  <small className='text-sm mx-1 text-slate-400 font-medium'>Passengers</small>
                  <p className='text-sm font-medium text-blue-950 mx-1'>2</p>
                </div>
              </div>
          </div>
          <div className='flex flex-row items-center'>
            <button className='bg-blue-950 font-bold text-slate-200 py-4 px-5 rounded-lg'>SEARCH
            </button>
          </div>
        </div>
      </div>
      <div className='w-[90%] mt-10 flex flex-row justify-between'>
        <div className='rounded-lg border-2 shadow'>
          <select name='sort-by' className='text-base py-1 text-slate-500'>
            <option value='sort-by' className='text-xs text-red-600'>SORT BY</option>
            <option value='name'  className=''>name</option>
            <option value='price'  className=''>price</option>
            <option value='origin'  className=''>origin</option>
            <option value='destination'  className=''>Destination</option>
          </select>
        </div>
        <div className='flex flex-row divide-x-2 divide-slate-300'>
          <button className='mx-1 text-xl text-blue-950'>
            <FontAwesomeIcon icon={faSort} className= '' />
          </button>
          <button className='px-1'>
            <div className='bg-blue-950 rounded'>
              <FontAwesomeIcon icon={faFilter} className='pt-2 pb-1 px-1 text-lg text-white' />
            </div>
          </button>
        </div>
      </div>
      {/* Dynamic search data from server */}
      <div className='w-[90%] mt-3 '>
        <div className='w-full flex flex-row rounded-lg divide-2 border-2 shadow-sm h-full items'>
          <div className='w-[14%] flex flex-row justify-center items-center border-r border-slate-300 py-3 px'>
            <img src=''alt='airline image' className=' h-full '/>
          </div>
          <div className='w-[43%] flex flex-row border-dashed border-r border-slate-300 h-full items-center justify-center gap-10 py-7'>
            <div className='flex flex-col items-center'>
              <h2 className='font-semibold text-4xl tracking-wider'>LOS</h2>
              <small className=' text-slate-500 font-medium'>12:20 AM</small>
            </div>
            <div className='flex flex-col items-center gap-2 -mt-2'>
              <small className='text-xs text-slate-500 font-medium'>15h 40m</small>
              <FontAwesomeIcon 
                icon={faPlane} 
                className='text-lg text-blue-950'
              />
              <small className='hidde text-xs text-slate-500 font-medium'>2 Stops</small>
            </div>
            <div className='flex flex-col items-center'>
              <p className='font-semibold text-4xl tracking-wide'>TYO</p>
              <small className='text-xs text-slate-500 font-medium'>04:00 AM</small>
            </div>
          </div>
          <div className='flex flex-row w-[43%] justify-end items-center gap-32 mx-5'>
            <div className='flex flex-col items-center gap-1'>
              <small className='text-xs text-slate-500 font-medium'>price per seat</small>
              <h3 className='text-4xl font-semibold tracking-wide -ml-'>$2400</h3>
                <small className='text-xs text-slate-500 font-medium'>
                  <FontAwesomeIcon icon={faUser} className='text-blue-950' /> First Class</small>
            </div>
            <div className='flex flex-col items-center gap-2'>
              <button className='bg-blue-950 text-slate-200 text-sm w-fit py-2 px-3 rounded-lg'>Book Now</button>
              <small className='text-xs text-slate-500 font-medium'>10/300 Available Seats</small>
            </div>
          </div>
        </div>
      </div>
      {/* Pagination */}
      <div className='flex flex-row mt-6 gap-3 font-medium'>
        <button className='bg-gray-300 px-3 py-1 rounded hover:bg-blue-950 hover:text-white'>PREV</button>
        <p>1</p>
        <button className='border-2 rounded px-3 py-1 border-gray-300 text-sm hover:border-none hover:bg-blue-950 hover:text-white'>NEXT</button>
      </div>
    </div>
  )
}

export default Flights