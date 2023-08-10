import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlane,
  faPlaneArrival,
  faPlaneDeparture,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Navbar from "../Navbar";
import { useState } from "react";
import useFlightStore from "./zustand store/ZStore";
import { Link } from "react-router-dom";

const Booked = () => {
  const [prompt, setPrompt] = useState(true)
  const {bookedFlight, passengers} = useFlightStore()
  return (
    <div>
      <Navbar />
      <div className="w-full ">
        <div
          className={`w-full flex relative py-3 border-b bg-green-100  flex-row justify-center ${
            !prompt && "hidden"
          }
          } `}
        >
          <button
            onClick={() => setPrompt(false)}
            className="absolute top-0 right-0 pr-3"
          >
            x
          </button>
          <p className="">You have successfully booked your ticket</p>
        </div>
        <div className="w-[100%] flex flex-col items-center  mt-20">
          <div className="w-[90%] flex flex-col px-2 bg-slate-50 h-80 sm:h-64 items-center rounded-sm">
            <h3 className="w-full font-semibold border-b text-start  mb-10 text-lg ">
              Bookings
            </h3>
            <div className="w-[90%] bg-white flex flex-col rounded-sm ">
              <div className="w-full flex flex-col border-b p-3">
                <div className="w-full flex flex-row justify-between">
                  <div className="flex flex-row justify-betwen items-center gap-6 font-semibold text-lg tracking-wider">
                    <h2>{bookedFlight && bookedFlight.departure.iataCode}</h2>

                    <FontAwesomeIcon
                      icon={faPlane}
                      className="text-blue-950 text-sm"
                    />
                    <h2>{bookedFlight && bookedFlight.arrival.iataCode}</h2>
                  </div>
                  <div className="hidden sm:flex flex-row text-sm gap-3">
                    <Link
                      to="/bookings"
                      className="border py-1 px-2 sm:px-2 rounded"
                    >
                      VIEW
                    </Link>
                    <button className="py-1 px-2 rounded border">CANCEL</button>
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="text-xs font-medium">
                    {bookedFlight.departure.at.substring(0, 10)}
                  </p>
                </div>
              </div>
              <div className="w-full flex flex-col my-4 px-2">
                <div className="w-full flex flex-col items-start max-sm:gap-y-2 sm:flex-row sm:justify-between">
                  <div className="w-full sm:w-fit flex flex-row max-sm:justify-between sm:gap-10">
                    <div className="flex flex-col items-center">
                      <div className=" flex flex-row justify-center items-center rounded-full bg-blue-950 w-7 h-7 mx-1">
                        <FontAwesomeIcon
                          className="text-white text-sm"
                          icon={faPlaneDeparture}
                        />
                      </div>
                      <small className="text-[10px]">
                        {bookedFlight.departure.at.substring(11)}
                      </small>
                      <p>{bookedFlight.departure.iataCode} </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className=" flex flex-row justify-center items-center rounded-full bg-blue-950 w-7 h-7 mx-1">
                        <FontAwesomeIcon
                          className="text-white text-sm"
                          icon={faPlaneArrival}
                        />
                      </div>
                      <small className="text-[10px]">
                        {bookedFlight.arrival.at.substring(11)}
                      </small>
                      <p>{bookedFlight.arrival.iataCode} </p>
                    </div>
                  </div>
                  <div className="w-ful flex sm:flex-col sm:items-center sm:mr">
                    <div className="max-sm:mr-3 flex flex-col justify-center h-8 w-8 rounded-full bg-red-600">
                      <p className="text-[9px] text-slate-200 italic text-center">
                        Airfare
                      </p>
                    </div>
                    <p className="">First class | {passengers} Passengers</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="sm:hidden w-full mt-2 flex flex-row-reverse justify-around text-xs sm:text-sm gap-3">
              <Link to="/bookings" className="border border-slate-400 py-1 px-4 rounded">
                VIEW
              </Link>
              <button className="py-1 px-4 border-slate-400 rounded border">CANCEL</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booked;
