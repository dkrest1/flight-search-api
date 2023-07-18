import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlane, faUser,} from '@fortawesome/free-solid-svg-icons'


const SearchResult = ({searchData}) => {
    console.log(searchData)

  return (
    <>
    {
        searchData ? searchData.map((value)=>(
        <>
        <div key={value.id} className='w-[90%] mt-3 '>
          <div className='w-full flex flex-row rounded-lg divide-2 border-2 shadow-sm h-full items'>
            <div className='w-[14%] flex flex-row justify-center items-center border-r border-slate-300 py-3 px'>
              <img src=''alt={value.airline +' airline image'} className=' h-full '/>
            </div>
            <div className='w-[43%] flex flex-row border-dashed border-r border-slate-300 h-full items-center justify-center gap-10 py-7'>
              <div className='flex flex-col items-center'>
                <h2 className='font-semibold text-4xl tracking-wider'>{value.departure.iataCode}</h2>
                <small className=' text-slate-500 font-medium'>{value.departure.at.substring(11)}</small>
              </div>
              <div className='flex flex-col items-center gap-2 -mt-2'>
                <small className='text-xs text-slate-500 font-medium'>{value.duration.replace("hour", "hr").replace("minutes", "min")}</small>
                <FontAwesomeIcon 
                  icon={faPlane} 
                  className='text-lg text-blue-950'
                />
                <small className='hidde text-xs text-slate-500 font-medium'>{'flight no. '+ value.flightNumber}</small>
              </div>
              <div className='flex flex-col items-center'>
                <p className='font-semibold text-4xl tracking-wide'>{value.arrival.iataCode}</p>
                <small className='text-xs text-slate-500 font-medium'>{value.arrival.at.substring(11)}</small>
              </div>
            </div>
            <div className='flex flex-row w-[43%] justify-end items-center gap-32 mx-5'>
              <div className='flex flex-col items-center gap-1'>
                <small className='text-xs text-slate-500 font-medium'>price per seat</small>
                <h3 className='text-3xl font-semibold tracking-wide -ml-'>{ '€ '+value.price}</h3>
                  <small className='text-xs text-slate-500 font-medium'>
                    <FontAwesomeIcon icon={faUser} className='text-blue-950' /> First Class</small>
              </div>
              <div className='flex flex-col items-center gap-2'>
                <button className='bg-blue-950 text-slate-200 text-sm w-fit py-2 px-3 rounded-lg'>Book Now</button>
                <small className='text-xs text-slate-500 font-medium'>{value.numberOfBookableSeats + ' Available Seat(s)'}</small>
              </div>
            </div>
          </div>
        </div>
        </>
        ))
    :
    <p>loading...</p>
    }
        {/* Pagination */}
        <div className='flex flex-row mt-6 gap-3 font-medium'>
          <button className='bg-gray-300 px-3 py-1 rounded hover:bg-blue-950 hover:text-white'>PREV</button>
          <p>1</p>
          <button className='border-2 rounded px-3 py-1 border-gray-300 text-sm hover:border-none hover:bg-blue-950 hover:text-white'>NEXT</button>
        </div>
      
    </>
  )
}

export default SearchResult