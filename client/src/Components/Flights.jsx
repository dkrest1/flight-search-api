import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faFilter, faPlane, faSort, faUser} from '@fortawesome/free-solid-svg-icons'

function Flights() {
  return (
    <div className='w-[100%] h-fll flex flex-col items-center mt-3 bg-white '>
      <div className='flex-1 flex-col w-[85%] items-center rounded-lg shadow-lg h-32 mt-10 border-2 sha'>
        <div className='flex-1 flex-row divide-x text-xs rounded border w-fit mt-3 mx-3'>
          <button className='p-1'>FIRST</button>
          <button className='p-1'>ECONOMY</button>
          <button className='p-1'>BUSINESS</button>
        </div>
        <div className='flex flex-row mt-4 gap-3 ml-2' >
          <div className='flex flex-row divide-x w-[40%] rounded-lg border'>
            <div className='flex flex-row divide-x py-2 w-[50%]'>
              <img src='' alt='' className='w-6 h-6 mr-1'/>
              <div className='flex flex-col pl-1'>
                <small className='text-[8px]'>Departure</small>
                <p className='text-[11px] font-medium text-blue-950'>Lagos-LOS</p>
              </div>
            </div>
            <div className='w-[50%] flex flex-row divide-x pl-1 py-2'>
              <img src='' alt='' className='w-6 h-6'/>
              <div className='flex flex-col '>
                <small className='text-[8px]'>Arrival</small>
                <p className='text-[11px] font-medium text-blue-950'>Tokyo-TYO</p>
              </div>
            </div>
          </div>
          <div className='flex flex-row divide-x w-[40%] rounded-lg border'>
            <div className='flex flex-row divide-x py-2 w-[50%]'>
              <img src='' alt='' className='w-6 h-6 mr-1'/>
              <div className='flex flex-col pl-1'>
                <small className='text-[8px]'>Departure Date</small>
                <p className='text-[11px] font-medium text-blue-950'>22/06/23</p>
              </div>
            </div>
            <div className='w-[50%] flex flex-row divide-x pl-1 py-2'>
              <img src='' alt='' className='w-6 h-6'/>
              <div className='flex flex-col '>
                <small className='text-[8px]'>Passengers</small>
                <p className='text-[11px] font-medium text-blue-950'>2</p>
              </div>
            </div>
          </div>
          <button className='bg-blue-950 text-sm text-slate-200 py-2 px-3 rounded-lg'>SEARCH</button>
        </div>
      </div>
      <div className='w-[85%] mt-10 flex flex-row justify-between'>
        <div className='rounded-lg border'>
          <select name='sort-by' className='text-[11px] text-slate-400'>
            <option value='sort-by' className='text-xs text-red-600'>SORT BY</option>
            <option value='name'  className=''>name</option>
            <option value='price'  className=''>price</option>
            <option value='origin'  className=''>origin</option>
            <option value='destination'  className=''>Destination</option>
          </select>
        </div>
        <div className='flex flex-row divide-x-2 divide-slate-300'>
          <button><FontAwesomeIcon icon={faSort} className='px-1 text-[16px] text-blue-950' /></button>
          <button className='px-1'>
            <div className='bg-blue-950 rounded'>
              <FontAwesomeIcon icon={faFilter} className='px-1 text-[12px] text-white' />
            </div>
          </button>
        </div>
      </div>
      {/* Dynamic search data from server */}
      <div className='w-[85%] mt-3 h-20'>
        <div className='w-full flex flex-row rounded-lg divide--2 border-2 shadow-sm h-full items'>
          <div className='w-[14%] border-r border-slate-300'>
            <img src=''alt='' className='w-[95%] h-full py-2'/>
          </div>
          <div className='flex flex-row border-dashed border-r border-slate-300 h-full items-center justify-center w-[43%]'>
            <div className='flex flex-col mr-5'>
              <h2 className='font-semibold text-xl tracking-wide '>LOS</h2>
              <small className='text-[8px]'>12:20 AM</small>
            </div>
            <div className='flex flex-col items-center gap-2 -mt-2'>
              <small className='text-[8px]'>15h 40m</small>
              <FontAwesomeIcon icon={faPlane} className='text-sm font-thin'/>
              <small className='text-[8px]'>2 Stops</small>
            </div>
            <div className='flex flex-col mx-5'>
              <p className='font-semibold text-xl tracking-wide'>TYO</p>
              <small className='text-[8px]'>04:00 AM</small>
            </div>
          </div>
          <div className='flex flex-row w-[43%] justify-end items-center gap-10 py3 mr-3'>
            <div className='flex flex-col'>
              <small className='text-[8px]'>price per seat</small>
              <h3 className='text-xl font-semibold tracking-wide -ml-2'>$2400</h3>
                <small className='text-[8px]'>
                  <FontAwesomeIcon icon={faUser} /> First Class</small>
            </div>
            <div className='flex flex-col'>
              <button className='bg-blue-950 text-slate-200 text-[10px] w-fit py-1 px-2 rounded'>Book Now</button>
              <small className='text-[8px]'>10/300 Available Seats</small>
            </div>
          </div>
        </div>
      </div>
      {/* Pagination */}
      <div className='flex flex-row mt-6 gap-3'>
        <button className='bg-gray-300 px-2 rounded'>PREV</button>
        <p>1</p>
        <button className='border-2 rounded px-2 border-gray-300 text-sm'>NEXT</button>
      </div>
    </div>
  )
}

export default Flights