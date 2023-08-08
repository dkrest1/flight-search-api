import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { accesstoken } from "./redux/tokenSlice";
import useFlightStore from "./zustand store/ZStore";

const Details = () => {
  const {
    flightData,
    passengers,
    passengersInfo,
    getPassengersInfo,
    bookedFlight,
    removePassengersInfo,
    getAllBookings,
    allBookings,
  } = useFlightStore();

  const PassengerData = () => {
    const token = useSelector(accesstoken)
    const [genderSelected, setGenderSelected] = useState("null");
    const [passengerInfo, setPassengerInfo] = useState({
      sex: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    });
    const [bookFlight, setBookFlight] = useState({
      origin: bookedFlight.departure.iataCode,
      destination: bookedFlight.arrival.iataCode,
      departure_date: bookedFlight.departure.at.substring(0, 10),
      adults: String(passengers),
      travelerId: "0",
      dateOfBirth: "2023-07-31",
      firstName: "",
      lastName: "",
      gender:'MALE',
      email: "",
      countryCode: "234",
      phone: "",
    });
    const [error, setError] = useState(null);
    const [fullDetails, setFullDetails] = useState({
      passengerData: {},
      flightInfo: {},
    });
    // console.log(bookFlight)
    // useEffect(() => {
    //   if(Object.keys(fullDetails.flightInfo).length !==0){
    //   console.log("full Details changes");
    //   const updateBookings = [...allBookings, {...fullDetails}]
    //   console.log(updateBookings)
    //   localStorage.setItem('all-bookings', JSON.stringify(updateBookings))
    //     getAllBookings(fullDetails)
    //   }
    //   // getAllBookings(fullDetails)
    // }, [fullDetails]);
    const navigateTo = useNavigate();

    const handleOnchange = (event) => {
      const { name, value } = event.target;
      setPassengerInfo((prevVal) => ({ ...prevVal, [name]: value }));
      setError((prevVal) => ({ ...prevVal, [name]: "" }));
      setBookFlight((prevVals)=>({...prevVals, [name]: value}))
    };
    const handleGenderClick = (genderClick) => {
      setGenderSelected(genderClick);
      setPassengerInfo((prevVal) => ({ ...prevVal, sex: genderClick }));
      let sex = genderClick === "Mr" ? "MALE" :  "FEMALE" 
      setBookFlight((prevVals)=>({...prevVals, gender: sex} ))
      setError((prevVal) => ({ ...prevVal, sex: "" }));
    };
    const handleSubmit = () => {
      event.preventDefault();
      const validated = validateInputs();
      if (Object.keys(validated).length === 0) {
        // setFullDetails({
        //   passengerData: passengerInfo,
        //   flightInfo: bookedFlight,
        // });
        console.log('loading...')
        const headers = {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        };
        axios.post(`https://flight-search-api.onrender.com/flight/book/${flightData[0].id}`, bookFlight, {headers} )
        .then((response)=>{
          console.log(response.data.data)
          let data = response.data.data
          localStorage.setItem('booking-response', JSON.stringify(data))
        })
        .catch((error)=>{
          console.log(error)
        })
        // navigateTo("/booked");
      } else {
        setError(validated);
      }
    };
    const validateInputs = () => {
      let error = {};
      if (passengerInfo.sex === "") {
        error.sex = "Please select your gender";
      }
      if (passengerInfo.firstName === "") {
        error.firstName = "Please enter First Name";
      }
      if (passengerInfo.firstName === "") {
        error.lastName = "Please enter Last Name";
      }
      if (passengerInfo.email === "") {
        error.email = "Please enter your Email";
      }
      if (passengerInfo.phone === "") {
        error.tel = "Please enter your phone number";
      } else if (passengerInfo.phone.length < 10) {
        error.tel = "Enter a valid phone number";
      }
      return error;
    };
    const gender = (
      <div className="w-fit flex flex-row items-center divide-x">
        <button
          type="button"
          className={` rounded px-2 py-1 text-xs ${
            genderSelected === "Mr" ? "bg-blue-900 text-white" : " text-black"
          } ${error && error.sex && "border border-red-600"}`}
          onClick={() => handleGenderClick("Mr")}
        >
          MR
        </button>
        <button
          type="button"
          className={`w-fit rounded px-2 py-1 text-xs ${
            genderSelected === "Mrs"
              ? "bg-blue-900 text-white text-sm"
              : " text-black"
          } ${error && error.sex && "border border-red-600"}`}
          onClick={() => handleGenderClick("Mrs")}
        >
          MRS
        </button>
      </div>
    );

    return (
      <form id="passenger-form" onSubmit={handleSubmit}>
        <div className="flex flex-col border-2 rounded-lg mt-5 mb-4 bg-white w-full gap-8 ">
          <h5 className="text-base font-semibold border-b py-1 px-2">
            Passenger 1
          </h5>
          <div>
            <div className="flex flex-col sm:flex-row w-full gap-5 mb-7">
              <div className="w-fit flex flex-row border rounded divide-x text-base mx-2 ">
                {gender}
              </div>
              <div className="sm:w-[70%] flex flex-row text-base border rounded divide-x mx-1 gap-4">
                <div className="flex flex-col w-full">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="John"
                    value={passengerInfo.firstName}
                    onChange={handleOnchange}
                    className={`w-[100%] py-1 px-2 focus-visible:outline-none ${
                      error && error.firstName && "border border-red-600"
                    }`}
                  />
                  <p className="text-xs text-red-600">
                    {error && error.firstName}
                  </p>
                </div>
                <div className="flex flex-col w-full">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    value={passengerInfo.lastName}
                    onChange={handleOnchange}
                    className={`w-[100%] py-1 px-2 focus-visible:outline-none ${
                      error && error.firstName && "border border-red-600"
                    }`}
                  />
                  <p className="text-xs text-red-600">
                    {error && error.lastName}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <input
                type="date"
                name="dateOfBirth"
                value={bookFlight.dateOfBirth}
                onChange={handleOnchange}
                className="mx-2 mb-3 border rounded p-2"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col border rounder-lg mt-3 bg-white w-full">
          <h5 className="text-base py-1 px-2 border-b ">Contact Information</h5>
          <div className="flex flex-row w-full mt-6 mb-8">
            <div className="w-full flex flex-row gap-3 text-base border rounded divide-x mx-1 sm:mx-5">
              <div className="w-14 flex flex-col justify-center">
                <input
                  type='text'
                  name='countryCode'
                  value={bookFlight.countryCode}
                  onChange={handleOnchange}
                  placeholder='+234'
                  className='w-10 px-1'
                />
              </div>
              <div className="w-full flex flex-col">
                <input
                  type="phone"
                  name="phone"
                  minLength={10}
                  maxLength={14}
                  placeholder="123456789"
                  value={passengerInfo.tel}
                  onChange={handleOnchange}
                  className={`w-[100%] py-1 px-2 focus-visible:outline-none ${
                    error && error.tel && "border border-red-600"
                  }`}
                />
                <p className="text-xs text-red-600">{error && error.tel}</p>
              </div>
              <div className="w-full flex flex-col">
                <input
                  type="email"
                  name="email"
                  placeholder="Johndoe1985@gmail.com"
                  value={passengerInfo.email}
                  onChange={handleOnchange}
                  className={`w-[100%] py-1 px-2 focus-visible:outline-none ${
                    error && error.email && "border border-red-600"
                  }`}
                />
                <p className="text-xs text-red-600">{error && error.email}</p>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex flex-row justify-start mb-4 mt-4">
          <button
            type="submit"
            className="bg-transparent border border-blue-950 text-blue-950 hover:bg-blue-950 hover:text-white text-sm font-medium px-8 py-2 rounded"
          >
            Confirm
          </button>
        </div>
      </form>
    );
  };
  const passengerArray = new Array(Number(passengers)).fill(null);
  return (
    <div className="w-full bg-white h-full">
      <Navbar />
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 mt-10 sm:mt-20 gap-y-10 sm:gap-20 items-between px-2 sm:px-16">
        <div className=" col-span-2 w- flex flex-col bg-[#fbfeff] pt-2">
          <div className="flex flex-row justify-center border-b border-b-slate-300 pb-1 border-slate-400">
            <h3 className="text-xl font-medium">Passenger Details</h3>
          </div>
          {passengerArray.map((_, index) => (
            <div key={index}>
              <PassengerData />
            </div>
          ))}
          <div className=" flex flex-row justify-center mb-4 mt-4">
            <button
              type="submit"
              className="bg-blue-950 hover:bg-blue-900 text-white text-xl font-semibold px-12 py-2 rounded"
            >
              Book Flight
            </button>
          </div>
        </div>
        <div className="w-full">
          <div className="w-full flex flex-col rounded-lg border-2 ">
            <h5 className="text-base font-semibold border-b py-3 pl-4 px-2">
              Fee Summary
            </h5>
            <div className="flex flex-row justify-between border-b py-3">
              <p className="px-2 ml-3">Fare</p>
              <p className="px-2">$1500</p>
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

export default Details;
