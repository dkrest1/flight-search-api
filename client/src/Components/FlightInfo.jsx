import Navbar from '../Navbar'
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import useFlightStore from "./zustand store/ZStore";
import { useState } from 'react';

const FlightInfo = () => {
  const { id } = useParams();
  const { flightData, removeFlight, sortedData, passengers, bookedFlight, getBookedFlight } = useFlightStore();
  const navigateTo = useNavigate()
  const flightInfo = flightData.filter((value) => {
    if (id === value.id) {
      localStorage.setItem('booked-flight', JSON.stringify(value))
      return value;
    }
  });
  const handleContinueToDetails =(id)=>{
    getBookedFlight(flightInfo[0])
    navigateTo(`/details/{id}`)
  }
  const showFlightInfo = flightInfo ? (
    flightInfo.map((value) => (
      <div
        key={value.id}
        className=" col-span-2 h-fit flex flex-col bg-[#fbfeff] pt-2 border border-t-[#fbfeff] rounded-lg"
      >
        <h3 className="px-2 font-semibold">Flight Information</h3>
        <div className="w-full h-12 flex flex-row justify-between items-center border-y ">
          <h5 className="text-base font-semibold px-2">
            {value.departure.iataCode} - {value.arrival.iataCode}
          </h5>
          <p className="text-base font-semibold px-2">
            {value.departure.at.substring(0, 10)}
          </p>
        </div>
        <div className="h-12 flex flex-row justify-between items-center border-y">
          <img src="" alt="airline img" className="w-fit h-fit px-2" />
          <div className="flex flex-row gap-3">
            <small className="text-[10px]">
              {value.departure.at.substring(11)}
            </small>
            <FontAwesomeIcon icon={faPlane} className="text-sm" />
            <small className="text-[10px]">
              {value.arrival.at.substring(11)}
            </small>
          </div>
          <p className="font-semibold px-2">First Class</p>
        </div>
        <div className="h-12 flex flex-row justify-between items-center font-semibold border-y">
          <p className="px-2">Passenger(s)</p>
          <p className="px-2"> {passengers}</p>
        </div>
        <div className="h-12 flex flex-row items-center font-semibold border-y">
          <p className="px-2">Luggage: 20kg + 15kg</p>
        </div>
        <div className="h-12 pt-2 flex flex-row justify-center items-start">
          <button 
            className="bg-blue-950 text-white rounded-sm px-5 py-1"
            onClick={()=>handleContinueToDetails(value.id)}
            >
            Continue
          </button>
        </div>
      </div>
    ))
  ) : (
    <p className="text-red-600">something went wrong!</p>
  );
  return (
    <div className="w-full bg-white h-full">
      <Navbar/>
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 mt-5 sm:mt-20 sm:gap-20 gap-y-10 items-between px-2 sm:px-16">
        {showFlightInfo}
        <div className="w-full">
          <div className="w-full flex flex-col rounded-lg border-2  ">
            <h5 className="text-base font-semibold border-b py-3 pl-4 px-2">
              Fee Summary
            </h5>
            <div className="flex flex-row justify-between border-b py-3">
              <p className="px-2 ml-3">Fare</p>
              <p className="px-2">${flightInfo[0].price}</p>
            </div>
            <div className="flex flex-row justify-between border-b py-3">
              <p className="px-2 ml-3">Tax</p>
              <p className="px-2">$200</p>
            </div>
            <div className="flex flex-row justify-between border-b py-3">
              <p className="px-2 ml-3">Other charges</p>
              <p className="px-2">$80</p>
            </div>
            <div className="flex flex-row justify-between py-3">
              <p className="px-2 ml-3">Total Fare</p>
              <p className="px-2">$1500 * 2</p>
            </div>
          </div>
          <div className=" flex flex-row justify-between text-base py-2 px-6 font-semibold">
            <p className="">10% off</p>
            <p className="text-blue-950">$2700</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightInfo;
