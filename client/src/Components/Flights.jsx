import React from 'react'

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
      <div className='w-full mt-10 flex flex-row justify-between'>
        <div>
          <select name='sort-by'>
            <option value='sort-by' className=''>SORT BY</option>
          </select>
        </div>
        <div className='flex flex-row divide'>
          <button>a</button>
          <button>b</button>
        </div>
      </div>
    </div>
  )
}

export default Flights