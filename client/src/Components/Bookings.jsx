import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlane } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

const Bookings = () => {
  return (
    <div className='h-full bg-white flex flex-col px-10'>
      <div className='mt-10 flex flex-row w-full gap-10'>
        <div className='flex flex-col w-[50%] rounded-lg border-2 border-red-100 pb-5'>
          <div className='flex flex-row w-[full] border-dashed border-b-2 justify-between items-center px-2 bg-red-600 rounded  py-2'>
            <div className='flex flex-col justify-center rounded-sm bg-white'>
              <div className='flex flex-col justify-center h-8 w-8 rounded-full bg-red-600'>
                <p className='text-[9px] text-slate-200 italic text-center'>Airfare</p>
              </div>
            </div>
            <FontAwesomeIcon icon={faPlane} className='text-lg text-white'/>
          </div>
          <div className='flex flex-col mt-3 px-4'>
            <div className=' flex flex-row justify-between mr-10'>
              <div className='flex flex-col'>
                <h5 className='text-base font-medium'>Name</h5>
                <p className='text-base'>Mr John Doe</p>
              </div>
              <div>
                <h1 className='font-bold text-4xl text-red-600 text-opacity-20 tracking-widest'>FIRST CLASS</h1>
              </div>
            </div>
            
            <div>
              <div className=' grid grid-cols-3 font-medium text-base mt-3'>
                <h5>From</h5>
                <h5>Date</h5>
                <h5>Carrier</h5>
              </div>
              <div className='grid grid-cols-3  text-base'>
                <p>Lagos, Nigeria</p>
                <p>22/06/23</p>
                <p>D7</p>
              </div>
            </div>
            <div>
              <div className=' grid grid-cols-3 font-medium text-base mt-3'>
                <h5>To</h5>
                <h5>Time</h5>
                <h5>Carrier</h5>
              </div>
              <div className='grid grid-cols-3  text-base'>
                <p>Tokyo, Japan</p>
                <p>04:00</p>
                <p>8A</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bookings