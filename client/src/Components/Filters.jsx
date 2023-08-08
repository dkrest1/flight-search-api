import React from "react";
import { useState } from "react";
import Navbar from "../Navbar";
import useFlightStore from "./zustand store/ZStore";

const Filters = ({ setShowFilter, }) => {
  const { flightData, filteredResult, getFiltered, removeFiltered } = useFlightStore();
  const maxPrice =
   flightData &&  flightData.length > 0 &&
    flightData.reduce((max, curr) => {
      return curr.price > max ? parseFloat(curr.price) + 1 : parseFloat(max) - 1 ;
    }, flightData[0].price);
  const minPrice =
    flightData && flightData.length > 0 &&
    flightData.reduce((min, curr) => {
      return curr.price < min ? parseFloat(curr.price) : parseFloat(min);
    }, flightData[0].price);

  const [minRangeValue, setMinRangeValue] = useState(minPrice || "");
  const [maxRangeValue, setMaxRangeValue] = useState(maxPrice + 1 || "");
  const [searchAirline, setSearchAirline] = useState("");
  const [checkedAirlines, setCheckedAirlines] = useState([]);
  const [alertText, setAlertText] = useState("");
  const handleMinRangeChange = () => {
    const newMinValue = Math.min(Number(event.target.value), maxRangeValue);
    setMinRangeValue(newMinValue);
  };
  const handleMaxRangeChange = () => {
    const newMaxValue = Math.max(parseFloat(event.target.value), minRangeValue);
    setMaxRangeValue(newMaxValue);
  };
  const onSearchAirlineChange = () => {
    setSearchAirline(event.target.value);
  };
  const onCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedAirlines((prevChecked) =>
      checked
        ? [...prevChecked, name]
        : prevChecked.filter((item) => item !== name)
    );
  };
  const isChecked = (airline) =>
    checkedAirlines && checkedAirlines.includes(airline);
  const removeDuplicates = (arr, key) => {
    if (flightData) {
      const seen = new Set();
      return arr.filter((item) => {
        const value = item[key];
        if (!seen.has(value)) {
          seen.add(value);
          return true;
        }
        return false;
      });
    }
  };
  const newAirlineArray = removeDuplicates(flightData, "airline");
  const filteredAirlines =
    newAirlineArray &&
    newAirlineArray.filter((obj) => {
      return obj.airline.toLowerCase().includes(searchAirline.toLowerCase());
    });
  const handleApplyFilters = () => {
    let priceResult = flightData.filter((obj) => {
      if (minRangeValue && maxRangeValue) {;
        return obj.price >= minRangeValue && obj.price <= maxRangeValue;
      }
    });
    let combinedResult =
      priceResult &&
      priceResult.filter((obj) => {
        if (checkedAirlines) {
          return checkedAirlines.find(
            (airline) => obj.airline.toLowerCase() === airline.toLowerCase()
          );
        }
      });
    if (minRangeValue && maxRangeValue && checkedAirlines.length >= 1) {
      console.log(combinedResult);
      console.log(checkedAirlines.length);
      getFiltered(combinedResult);
    } else if (checkedAirlines.length === 0) {
      getFiltered(priceResult);
    }
    if (
      checkedAirlines &&
      checkedAirlines.length >= 1 &&
      filteredResult &&
      filteredResult.length === 0
    ) {
      alert("No match found! Showing all search results");
    } else if (filteredResult && filteredResult.length < 0) {
      alert("No match found! Showing all search results");
    }
    setShowFilter(false);
  };
  const handleResetAllFilters = () => {
    alert("All Filters has been reset");
    setMinRangeValue(minPrice);
    setMaxRangeValue(maxPrice);
    setCheckedAirlines([]);
    removeFiltered(null);
  };
  const handleCancleFliters = () => {
    setAlertText(
      `All changes will not be saved.
        Are You want to cancel?
    `
    );
  };
  const alertMsg = (
    <div
      className="flex bg-yellow-100 rounded-lg p-4 mb-4 text-sm text-yellow-700"
      role="alert"
    >
      <svg
        className="w-5 h-5 inline mr-3"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        ></path>
      </svg>
      <div>
        <span className="font-medium">Warning alert!</span>
        <p> {alertText}</p>
        <div className="flex flex-row justify-around mt-3 font-medium">
          <button
            className="text-red-600 hover:font-bold"
            onClick={() => setAlertText("")}
          >
            No
          </button>
          <button
            className="text-blue-600 hover:font-bold"
            onClick={() => {
              setShowFilter(false);
              setAlertText("");
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
  return (
    <div className="w-full bg-[#fbfeff]">
      <div
        className={`filter-overlay fixed left-0 right-0 top-0 bottom-0 z-50 ${
          !alertText && "hidden"
        }`}
      >
        <div
          className={`h-screen flex flex-col justify-center items-center shadow-lg shadow-orange-400 ${
            !alertText && "hidden"
          } `}
        >
          {alertMsg}
        </div>
      </div>
      <div className="w-full flex flex-col px-3 ">
        <div className="w-full h-24 flex flex-row justify-between mt-5 items-center border-b-2 border-gray-500">
          <p>
            {flightData && flightData.length} of{" "}
            {flightData && flightData.length}
          </p>
          <div className="flex flex-row gap-4">
            <button onClick={handleResetAllFilters}>Reset All filters</button>
            <button
              onClick={handleCancleFliters}
              className="px-3 py-1 border border-gray-800 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleApplyFilters}
              className="px-1 py-1 bg-blue-950 text-white rounded-md"
            >
              Apply Filter
            </button>
          </div>
        </div>
        <div className="w-full flex flex-row justify-around mt-5 gap-x-32 px-14">
          <div className="w-1/2 flex flex-col">
            <div className="flex flex-row justify-between font-bold">
              <h2>Price</h2>
              <h2>Up to ${maxPrice}</h2>
            </div>
            <div className="w-full h-20  flex flex-col justify-center border rounded-lg px-5 bg-white">
              <div className="w-full flex flex-row justify-between text-sm px-4 ">
                <p>${minRangeValue}</p>
                <p>${maxRangeValue}</p>
              </div>
              <div className="">
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  step='0.1'
                  onChange={handleMinRangeChange}
                  value={minRangeValue}
                  className="range w-1/2 rounded-l "
                />
                <input
                  type="range"
                  min={minRangeValue}
                  max={maxPrice}
                  step='0.1'
                  onChange={handleMaxRangeChange}
                  value={maxRangeValue}
                  className="range w-1/2  rounded-r"
                />
              </div>
            </div>
          </div>
          <div className="w-1/2 flex flex-col">
            <h2> Airlines</h2>
            <div className="w-full bg-white">
              <input
                type="search"
                placeholder="Search Airlines"
                name="search-airline"
                value={searchAirline}
                onChange={onSearchAirlineChange}
                className="w-full text-sm font-medium border-b mb-5 focus-visible:outline-none "
              />
              <div className="w-full h-44 flex flex-col gap-y-3">
                {filteredAirlines &&
                  filteredAirlines.map((value) => (
                    <div key={value.id}>
                      <div className="flex flex-row justify-between ">
                        <div className="flex flex-row">
                          <input
                            type="checkbox"
                            className=" accent-blue-500"
                            checked={isChecked(value.airline)}
                            name={value.airline}
                            onChange={onCheckboxChange}
                          />
                          <p className="px-3">{value.airline} Airline</p>
                        </div>
                        <div className="flex flex-row gap-x-10">
                          <p className="font-medium">${value.price}</p>
                          <div className="w-6 h-6 rounded-full border border-gray-200">
                            <p className="text-center"> {flightData.filter((obj)=>obj.airline === value.airline).length}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
