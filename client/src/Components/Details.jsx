import React from 'react'

const Details = () => {
  return (
    <div className='w-full bg-white h-full'>
        <div className=' grid grid-cols-3 mt-20 gap-20 items-between px-16'>
            <div className=' col-span-2 w- flex flex-col bg-[#fbfeff] pt-2'>
                <div className='flex flex-row justify-center border-b border-b-slate-300 pb-1 border-slate-400'>
                    <h3 className='text-xl font-medium'>Passenger Details</h3>
                </div>
                <div className='flex flex-col border-2 rounded-lg mt-5 mb-4 bg-white w-full gap-8 '>
                    <h5 className='text-base font-semibold border-b py-1 px-2'>Passenger 1
                    </h5>
                    <div className='flex flex-row w-full gap-5 mb-7'>
                        <div className='flex flex-row border rounded divide-x text-base mx-2 '>
                            <p className='bg-blue-950 py-1 px-2 rounded text-white'>MR</p>
                            <p className='py-1 px-2'>MRS</p>
                        </div>
                        <div className='w-[70%] flex flex-row text-base border rounded divide-x gap-4'>
                            <p className='w-[50%] py-1 px-2'>John </p>
                            <p className='py-1 px-2'>Doe</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col border rounder-lg mt-3 bg-white w-full'>
                    <h5 className='text-base py-1 px-2 border-b '>Contact Information</h5>
                    <div className='flex flex-row w-full gap-3 mt-6 mb-8'>
                        <div className='w-full flex flex-row text-base border rounded divide-x mx-5'>
                            <p className='w-[50%] px-2 py-1'>123456789 </p>
                            <p className='w-[50%] px-2 py-1'>Johndoe1985@gmail.com</p>
                        </div>
                    </div>
                </div>
                <div className=' flex flex-row justify-center mb-4 mt-4'>
                    <button className='bg-blue-950 text-white text-xl font-semibold px-12 py-2 rounded'>Confirm</button>
                </div>
            </div>
            <div className='w-full'>
                <div className='w-full flex flex-col rounded-lg border-2  '>
                    <h5 className='text-base font-semibold border-b py-3 pl-4 px-2'>Fee Summary</h5>
                    <div className='flex flex-row justify-between border-b py-3'>
                        <p className='px-2 ml-3'>Fare</p>
                        <p className='px-2'>$1500</p>
                    </div>
                    <div className='flex flex-row justify-between border-b py-3'>
                        <p className='px-2 ml-3'>Tax</p>
                        <p className='px-2'>$200</p>
                    </div>
                    <div className='flex flex-row justify-between border-b py-3'>
                        <p className='px-2 ml-3'>Other charges</p>
                        <p className='px-2'>$80</p>
                    </div>
                    <div className='flex flex-row justify-between py-3'>
                        <p className='px-2 ml-3'>Total Fare</p>
                        <p className='px-2'>$1500 * 2</p>
                    </div>
                </div>
                <div className=' flex flex-row justify-between text-base py-2 px-6 font-semibold'>
                    <p className=''>10% off</p>
                    <p className='text-blue-950'>$2700</p>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Details