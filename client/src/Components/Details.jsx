import React from 'react'

const Details = () => {
  return (
    <div className='w-full bg-white h-full'>
        <div className=' grid grid-cols-3 mt-10 gap-5 items-between px-5'>
            <div className=' col-span-2 w- flex flex-col bg-green-50 pt-2'>
                <div className='flex flex-row justify-center border-b pb-1 border-slate-400'>
                    <h3 className='text-sm font-medium'>Passenger Details</h3>
                </div>
                <div className='flex flex-col border rounder-lg mt-3 bg-white w-full'>
                    <h5 className='text-sm font-semibold border-b '>Passenger 1</h5>
                    <div className='flex flex-row w-full gap-3 mt-4 mb-5'>
                        <div className=' w-[20%] flex flex-row border rounded divide-x text-xs'>
                            <p className='bg-blue-950 px-1 text-white'>MR</p>
                            <p className='px-1'>MRS</p>
                        </div>
                        <div className='w-[80%] flex flex-row text-xs border rounded divide-x '>
                            <p className='w-[50%]'>John </p>
                            <p>Doe</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col border rounder-lg mt-3 bg-white w-full'>
                    <h5 className='text-sm border-b '>Contact Information</h5>
                    <div className='flex flex-row w-full gap-3 mt-4 mb-5'>
                        <div className='w-full flex flex-row text-xs border rounded divide-x '>
                            <p className='w-[50%]'>123456789 </p>
                            <p>Johndoe1985@gmail.com</p>
                        </div>
                    </div>
                </div>
                <div className=' flex flex-row justify-center'>
                    <button className='bg-blue-950 text-white text-xs font-semibold px-7 py-1'>Confirm</button>
                </div>
            </div>
            <div className='w-full'>
                <div className='w-full flex flex-col rounded border '>
                    <h5 className='text-sm font-semibold border-b py-1'>Fee Summary</h5>
                    <div className='flex flex-row justify-between border-b py-1'>
                        <p>Fare</p>
                        <p>$1500</p>
                    </div>
                    <div className='flex flex-row justify-between border-b py-1'>
                        <p>Tax</p>
                        <p>$200</p>
                    </div>
                    <div className='flex flex-row justify-between border-b py-1'>
                        <p>Other charges</p>
                        <p>$80</p>
                    </div>
                    <div className='flex flex-row justify-between py-1'>
                        <p>Total Fare</p>
                        <p>$1500 * 2</p>
                    </div>
                </div>
                <div className=' flex flex-row justify-between text-xs'>
                    <p>10% off</p>
                    <p>$2700</p>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Details