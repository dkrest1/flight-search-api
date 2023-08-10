import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlane } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import Navbar from '../Navbar'
import useFlightStore from './zustand store/ZStore'

const Bookings = () => {
  const {allBookings} = useFlightStore()
  
  return (
    <>
      <Navbar />
      <div className="h-full bg-white flex flex-col mt-14 px-2">
        <h2 className="font-bold sm:text-xl">
          ALL BOOKINGS ({allBookings && allBookings.length})
        </h2>
        <div className="w-full mt-4 grid grid-cols-1 place-items-center sm:grid-cols-2 sm:gap-x-5 gap-y-10">
          {allBookings &&
            allBookings.map((booking, index) => (
              <div
                key={index}
                className="flex flex-col w-[95%] rounded-lg border-2 border-red-100 pb-5"
              >
                <div className="flex flex-row w-full border-dashed border-b-2 justify-between items-center px-2 bg-red-600 rounded  py-2">
                  <div className="flex flex-col justify-center rounded-sm bg-white">
                    <div className="flex flex-col justify-center h-8 w-8 rounded-full bg-red-600">
                      <p className="text-[9px] text-slate-200 italic text-center">
                        Airfare
                      </p>
                    </div>
                  </div>
                  <FontAwesomeIcon
                    icon={faPlane}
                    className="text-lg text-white"
                  />
                </div>
                <div className="relative w-full flex flex-col mt-3 px-4">
                  <div className="w-full flex flex-row justify-between mr-10">
                    <div className="w-full flex flex-col">
                      <h5 className="text-base font-medium">Name</h5>
                      <p className="text-base">
                        {booking.passengerData.sex}{" "}
                        {booking.passengerData.firstName}{" "}
                        {booking.passengerData.lastName}
                      </p>
                    </div>
                    <div className="w-full flex flex-row`">
                      <h1 className="font-bold text-xl md:text-2xl text-red-600 text-opacity-10 tracking-wide">
                        FIRST CLASS
                      </h1>
                    </div>
                  </div>

                  <div className="w-full">
                    <div className="w-full grid grid-cols-3 font-medium text-base mt-3">
                      <h5 className="">From</h5>
                      <h5>Date</h5>
                      <h5 className="text-center">Carrier</h5>
                    </div>
                    <div className="w-full grid grid-cols-3 text-base">
                      <p>{booking && booking.flightInfo.departure.iataCode}</p>
                      <p>
                        {booking &&
                          booking.flightInfo.departure.at.substring(0, 10)}
                      </p>
                      <p className="text-center">
                        {booking.flightInfo.airline}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className=" grid grid-cols-3 font-medium text-base mt-3">
                      <h5>To</h5>
                      <h5 className="">Time</h5>
                      <h5 className="text-center">Carrier</h5>
                    </div>
                    <div className="grid grid-cols-3  text-base">
                      <p>{booking.flightInfo.arrival.iataCode}</p>
                      <p className="">
                        {booking.flightInfo.arrival.at.substring(0, 10)}
                      </p>
                      <p className="text-center">
                        {booking.flightInfo.airline}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Bookings