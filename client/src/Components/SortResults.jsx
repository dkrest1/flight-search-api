import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSort } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import useFlightStore from "./zustand store/ZStore";
import ExtractDuration from "./ExtractDuration";
import ConvertTime from "./ConvertTime";

const SortResults = ({
  handleFilterClick,
  setShowFilter,
}) => {
  const [sortKey, setSortKey] = useState();
  const { flightData, addFlight, sortedData, getSorted, showResult, getResult, filteredResult, getFiltered } = useFlightStore();
  const [modify, setModify] = useState(flightData);
  const handleSortChange = () => {
    const newSortKey = event.target.value;
    setSortKey(newSortKey);
    console.log(modify);
    const timeSorted = [...flightData].sort((a, b) =>
      a[newSortKey] < b[newSortKey] ? -1 : 1
    );
    console.log(timeSorted);
    if (timeSorted) {
      for (let i = 0; i < modify.length; i++) {
        const convertToHrMin = ConvertTime(modify[i].duration);
        modify[i].duration = convertToHrMin;
        console.log(modify[i]);
      }
      console.log(modify);
    }

    if (newSortKey === "price" || newSortKey === "flightNumber") {
      const isSorted = [...flightData].sort((a, b) =>
        Number(a[newSortKey]) < Number(b[newSortKey]) ? -1 : 1
      );
      // console.log(isSorted)
      getSorted(isSorted);
    }
  };
  const handleSortOrder = () => {
    filteredResult && filteredResult.length !== 0 &&
      getFiltered(filteredResult.reverse()) ||
      showResult && getResult(flightData.reverse());
      // console.log(filteredResult)
  };
  // ConvertTime()
  return (
    <>
      <div className="w-[98%] mt-10 flex flex-row justify-between">
        <div className="rounded-lg border-2 shadow">
          <select
            name="sort-by"
            className="text-base py-1 text-slate-500"
            onChange={handleSortChange}
          >
            <option value="sort-by" className="text-xs text-red-600">
              SORT BY
            </option>
            <option value="numberOfBookableSeats" className="">
              available seats
            </option>
            <option value="price" className="">
              price
            </option>
            <option value="duration" className="">
              duration
            </option>
            <option value="flightNumber" className="">
              flight number
            </option>
          </select>
        </div>
        <p>Showing {filteredResult && filteredResult.length || showResult && showResult.length} results</p>
        <div className="flex flex-row divide-x-2 divide-slate-300">
          <button
            className="mx-1 text-xl text-blue-950"
            onClick={handleSortOrder}
          >
            <FontAwesomeIcon icon={faSort} className="" />
          </button>
          <button className="px-1">
            <div className="bg-blue-950 rounded">
              <FontAwesomeIcon
                icon={faFilter}
                onClick={handleFilterClick}
                className="pt-2 pb-1 px-1 text-lg text-white"
              />
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default SortResults;
