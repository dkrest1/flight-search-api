import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlane } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

const Bookings = () => {
  return (
    <div className='h-full bg-white flex flex-col'>
      <div className='mt-10 flex flex-row w-full gap-5'>
        <div className='flex flex-col w-[50%]'>
          <div className='flex flex-row w-[full] border-dashed border-b justify-between items-center px-2 bg-red-600 py-1'>
            <div className='flex flex-col justify-center rounded-sm bg-white'>
              <div className='flex flex-col justify-center h-7 w-7 rounded-full bg-red-600'>
                <p className='text-[9px] text-slate-200 italic'>Airfare</p>
              </div>
            </div>
            <FontAwesomeIcon icon={faPlane} className='text-sm text-white'/>
          </div>
          <div className='flex flex-col mt-3 px-4'>
            <div className='flex flex-col'>
              <h5 className='text-[12px] font-medium'>Name</h5>
              <p className='text-[12px]'>Mr John Doe</p>
            </div>
            <div>
              <div className=' grid grid-cols-3 font-medium text-[12px] mt-3'>
                <h5>From</h5>
                <h5>Date</h5>
                <h5>Carrier</h5>
              </div>
              <div className='grid grid-cols-3  text-[12px]'>
                <p>Lagos, Nigeria</p>
                <p>22/06/23</p>
                <p>D7</p>
              </div>
            </div>
            <div>
              <div className=' grid grid-cols-3 font-medium text-[12px] mt-3'>
                <h5>To</h5>
                <h5>Time</h5>
                <h5>Carrier</h5>
              </div>
              <div className='grid grid-cols-3  text-[12px]'>
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