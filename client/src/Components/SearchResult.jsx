import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane, faUser } from "@fortawesome/free-solid-svg-icons";
import useFlightStore from "./zustand store/ZStore";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Filters from "./Filters";
import airlineImg from "../Assets/airline.jpg";

const SearchResult = ({ showFilter, setShowFilter }) => {
  const { flightData, removeFlight, filteredResult, showResult, getResult } =
    useFlightStore();
  let searchData = flightData;
  const navigateTo = useNavigate();
  const [filterDetails, setFilterDetails] = useState({});
  useEffect(() => {
    getResult(flightData);
  }, [flightData]);
  const handleClearSearch = () => {
    localStorage.removeItem("flight-data");
    removeFlight();
  };
  const handleBookFlight = (id) => {
    navigateTo(`/flight-info/${id}`);
  };
  const DisplayResult = ({ value }) => {
    return (
      <div key={value.id} className="w-[98%] mt-3 ">
        <div className="w-full h-32 flex flex-row rounded-lg divide-2 border-2 shadow-sm h-ful">
          <div className="hidde w-[14%] md:flex flex-col justify-center items-center border-r border-slate-300 py-1">
            <img
              src={airlineImg}
              alt={value.airline + " airline image"}
              className=" h-full object-contain"
            />
            <span className=" max-sm:hidden">{value.airline} Airline</span>
          </div>
          <div className="w-[43%] flex flex-row border-dashed border-r border-slate-300 h-full items-center justify-center px-2 md:gap-10 py-2 md:py-7">
            <div className="flex flex-col items-center md:gap-2 ">
              <h2 className="font-semibold text-[17px] md:text-4xl tracking-wide md:tracking-wider">
                {value.departure.iataCode}
              </h2>
              <small className=" text-slate-500 font-medium text-[9px] md:text-base">
                {value.departure.at.substring(11)}
              </small>
            </div>
            <div className="flex flex-col items-center px- justify-between whitespace-nowrap gap-2 md:-mt-2 ">
              <small className="text-[9px] md:text-sm text-slate-500 font-medium">
                {value.duration.replace("hour", "hr").replace("minutes", "min")}
              </small>
              <FontAwesomeIcon
                icon={faPlane}
                className="text-lg text-blue-950"
              />
              <small className="text-[9px] md:text-sm text-center text-slate-500 font-medium">
                {"flight no. " + value.flightNumber}
              </small>
            </div>
            <div className="flex flex-col items-center md:gap-2">
              <p className="font-semibold text-[17px] md:text-4xl tracking-normal md:tracking-wide">
                {value.arrival.iataCode}
              </p>
              <small className="text-[9px] md:text-sm text-slate-500 font-medium">
                {value.arrival.at.substring(11)}
              </small>
            </div>
          </div>
          <div className="flex flex-row w-[43%] justify-between md:justify-end items-center md:gap-32 md:mx-5  ">
            <div className="flex flex-col w-full items-center gap-1 ">
              <small className="text-[9px] md:text-xs text-slate-500 font-medium">
                price per seat
              </small>
              <h3 className="text-[16px] md:text-3xl font-semibold tracking-wide -ml- whitespace-nowrap">
                {"€" + value.price}
              </h3>
              <small className="text-[9px] md:text-xs text-slate-500 font-medium">
                <FontAwesomeIcon icon={faUser} className="text-blue-950" />{" "}
                First Class
              </small>
            </div>
            <div className="flex flex-col w-full items-end md:items-center md:gap-2 ">
              <button
                className="bg-blue-950 text-slate-200 text-[11px] md:text-sm w-fit py-1 md:py-2 px-1 md:px-3 rounded-lg"
                onClick={() => handleBookFlight(value.id)}
              >
                Book Now
              </button>
              <small className="text-[9px] md:text-xs text-center text-slate-500 font-medium">
                {value.numberOfBookableSeats + " Available Seat(s)"}
              </small>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const searchResult =
    filteredResult && filteredResult.length !== 0
      ? filteredResult.map((value) => (
          <DisplayResult value={value} key={value.id} />
        ))
      : showResult &&
        showResult.length !== 0 &&
        showResult.map((value) => (
          <DisplayResult value={value} key={value.id} />
        ));
  return (
    <>
      {searchData && searchData.length !== 0 ? (
        <>
          <div
            className={`w-full flex flex-col items-center ${
              showFilter && "hidden"
            }`}
          >
            {searchResult}
            {/* Pagination */}
            <>
              {/* <div className="flex flex-row mt-6 gap-3 font-medium">
                <button className="bg-gray-300 text-xs md:text-base px-3 py-1 rounded hover:bg-blue-950 hover:text-white">
                  PREV
                </button>
                <p>1</p>
                <button className="border-2 rounded px-3 text-xs md:text-base py-1 border-gray-300 hover:border-none hover:bg-blue-950 hover:text-white">
                  NEXT
                </button>
              </div> */}
              <div>
                <button
                  className="mt-5 text-sm md:text-base"
                  onClick={handleClearSearch}
                >
                  Clear search
                </button>
              </div>
            </>
          </div>
        </>
      ) : (
        <p className="text-gray-400 mt-5">Search for flight details</p>
      )}
      <div className={`w-full ${!showFilter && "hidden"}`}>
        <Filters
          setShowFilter={setShowFilter}
          filterDetails={filterDetails}
          setFilterDetails={setFilterDetails}
        />
      </div>
    </>
  );
};

export default SearchResult;
