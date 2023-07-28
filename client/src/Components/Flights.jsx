import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faFilter, faPlane, faSort, faUser, faPlaneDeparture, faPlaneArrival, faCalendarDays, faShoePrints} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import airports from './airports.json'
import { useState, useEffect } from 'react'
import { accesstoken } from './redux/tokenSlice'
import { useSelector } from 'react-redux'
import Navbar from '../Navbar'
import PulseLoader from 'react-spinners/PulseLoader'
import FlightSearchMobile from './FlightSearchMobile'
import { NavLink } from 'react-router-dom'
import DropDownSearch from './DropDownSearch'
import SearchResult from './SearchResult'
import useFlightStore from './zustand store/ZStore'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import SortResults from './SortResults'


function Flights() {
  const token = useSelector(accesstoken)
  const {flightData, addFlight} = useFlightStore()
  const [departureOption, setDepartureOption] = useState(null)
  const [arrivalOption, setArrivalOption] = useState(null)
  const [searchInputs, setSearchInputs] = useState({
    origin: null,
    destination: null,
    departure_date: "",
    adults: '1'
  })
  const [isPending, setIsPending] = useState(false)
  const [errors, setErrors] = useState(null) 
  const [prompt, setPrompt] = useState(null)
  const [showFilter, setShowFilter] = useState(false)
  const notify = ()=>toast(prompt)
  useEffect(()=>{
    if(departureOption){
      setSearchInputs((prevValues)=>({...prevValues, origin:departureOption.value}))
    }
    if(arrivalOption){
      setSearchInputs((prevValues)=>({...prevValues, destination: arrivalOption.value}))}
    // console.log(departureOption, arrivalOption)
  },[departureOption, arrivalOption])
  const options = airports.map((item)=>({
    value: item.code,
    label: `${item.city} - ${item.code} `,
  }))
  const onInputChange=()=>{
    const {name, value} = event.target
    setSearchInputs((prevValues)=>({...prevValues, [name]: value}))
    setErrors((prevValues)=>({...prevValues, [name]:""}))
  }
  const verifyInputs=()=>{
    let errors ={}
    if(!departureOption){
      // setPrompt("Please select your origin")
      errors.departureOption="Please select your origin"
      console.log(errors.departureOption)
    }
    if(!arrivalOption){
      // setPrompt("Please select your destination")
      errors.arrivalOption="Please select your destination"
      console.log(errors.arrivalOption)
    } 
    if(!searchInputs.departure_date){
      errors.departure_date="Please select flight date"
      console.log(errors.departure_date)
    }  
    if(departureOption && arrivalOption && departureOption===arrivalOption){
      errors.match= "Match! Origin cannot be the same as destination."
      console.log(errors.match)
    }
    return errors
  }
  const handleSearchFlight=(event)=>{
    setIsPending(true)
    event.preventDefault()
    const validated = verifyInputs()
    console.log(validated)
    console.log(searchInputs)
    if(Object.keys(validated).length===0){
      console.log("loading... ")
      const headers = {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      }
      axios.post('https://flight-search-api.onrender.com/flight/search', searchInputs, {headers} )
      .then((response)=>{
        console.log(response)
        let data= response.data.data
        addFlight(data)
        localStorage.setItem('flight-data', JSON.stringify(data))
        if(data.length ===0){
          setPrompt("No flight reaults for the options selected")
          console.log("No flight reaults for the options selected")
          notify()
      }
      else if(data.length >=1){
        setPrompt("Successful!")
        notify()
      }
        setIsPending(false)
      })
      .catch((error)=>{
        console.log(error)
        console.log(error.response.data.flightErr)
        setIsPending(false)
      })
    }
    else{
      setIsPending(false)
      setErrors(validated)
      setPrompt("Error! something happened")
      notify()
    }
  }
  const setDepartureError=()=>{
    console.log('clear departure error')
    // setErrors((prevValues)=>({...prevValues, departureOption:""}))
  }
  const setArrivalError=()=>{
    setErrors((prevValues)=>({...prevValues, arrivalOption:""}))
  }
  const [classSelected, setClassSelected] = useState(null)
  const handleOptionclick=(optionClick)=>{
    setClassSelected(optionClick)
    console.log(optionClick)
  }
  const flightClass=(
      <div className='flex flex-row items-center divide-x'>
        <button 
        className={` rounded px-2 py-1 text-xs ${classSelected==='first' ? 'bg-blue-900 text-white' : ' text-black'}`}
        onClick={()=>handleOptionclick('first')}
        >FIRST
        </button>
        <button 
        className={` rounded px-2 py-1 text-xs ${classSelected==='economy' ? 'bg-blue-900 text-white text-sm' : ' text-black'}`}
        onClick={()=>handleOptionclick('economy')}
        >ECONOMY
        </button>
        <button 
        className={` rounded px-2 py-1 text-xs ${classSelected==='business' ? 'bg-blue-900 text-white text-sm' : ' text-black'}`}
        onClick={()=>handleOptionclick('business')}
        >BUSINESS
        </button>
      </div>
    )
  const handleFilterClick =()=>{
    setShowFilter(true)
  }
  
  return (
    <div className='w-[100%]'>
      <Navbar/>
      <ToastContainer/>
      <div className={`md:hidden p-2 ${showFilter && 'hidden'}`}>
        <FlightSearchMobile/>
      </div>
      <div className='hidden w-[100%] md:flex flex-col items-center mt-3 bg-white'>
        <div className={`w-[90%] flex flex-col rounded-lg shadow-xl h- pb-10 px-2 mt-10 border-2 ${showFilter && 'hidden'}`}>
          <div className='flex flex-row divide-x text-xs rounded border-2 w-fit mt-3 mx-3'>
            {flightClass}
          </div>
          <div className='w-[100%]' >
            <form onSubmit={handleSearchFlight} className='flex flex-row mt-4 gap-5 mx-2 w-[100%]'>
              <div className='w-[45%] flex flex-row divide-x-2 rounded-lg border-2'>
                <div className={`w-[50%] flex flex-row divide-x py-4 items-center ${errors && errors.departureOption && 'outline outline-red-300'}`}>
                  <div className=' flex flex-row justify-center items-center rounded-full bg-blue-950 w-7 h-6 mx-1'>
                    <FontAwesomeIcon 
                    className='text-white text-sm'
                    icon={faPlaneDeparture} />
                  </div>
                  <div className='flex flex-col pl-1 w-full px-3'>
                    <small className='text-xs text-slate-400 font-medium mb-1'>Departure</small>
                    <div className={`w-full font-medium text-blue-950 `}>
                      <DropDownSearch selectedOption={departureOption} setSelectedOption={setDepartureOption} options={options} setError={setDepartureError}
                      />
                    </div>
                  </div>
                </div>
                <div className={`w-[50%] flex flex-row divide-x pl-1 py-2 items-center ${errors && errors.arrivalOption && 'outline outline-red-300'}`}>
                <div className='flex flex-row justify-center items-center rounded-full bg-blue-950 w-7 h-6 mx-1'>
                    <FontAwesomeIcon 
                    className='text-white text-sm'
                    icon={faPlaneArrival} />
                  </div>
                  <div className='flex flex-col w-full px-1'>
                    <small className='text-xs text-slate-400 font-medium mb-1'>Arrival</small>
                    <div className={`w-full font-medium text-blue-950 `}>
                      <DropDownSearch selectedOption={arrivalOption} setSelectedOption={setArrivalOption} options={options} setError={setArrivalError} 
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-[45%] flex flex-row divide-x-2  rounded-lg border-2'>
                <div className={`w-[50%] flex flex-row divide-x py-2 items-center ${errors && errors.departure_date && 'outline outline-red-300'}`}>
                  <div className=' flex flex-row justify-center items-center rounded-full bg-blue-950 w-6 h-6 mx-1'>
                      <FontAwesomeIcon 
                      className='text-white text-sm'
                      icon={faCalendarDays} />
                  </div>              
                  <div className='flex flex-col pl-1'>
                    <small className='text-sm font-medium text-slate-400'>Departure Date</small>
                    <p className='text-sm font-medium text-blue-950'>
                      <input 
                        type='date'
                        name='departure_date'
                        value={searchInputs.departure_date}
                        onChange={onInputChange}
                        />
                    </p>
                  </div>
                </div>
                <div className='w-[50%] flex flex-row divide-x  items-center mx-1 '>
                  <div className=' flex flex-row justify-center items-center rounded-full bg-blue-950 w-6 h-6 mx-1'>
                    <FontAwesomeIcon 
                    className='text-white text-sm'
                    icon={faShoePrints}
                    rotation={270}
                    />
                  </div>
                  <div className='w-full flex flex-col '>
                    <small className='text-sm mx-1 text-slate-400 font-medium'>Passengers</small>
                    <input type='number'
                      name='adults'
                      value={searchInputs.adults}
                      onChange={onInputChange} 
                      className='text-sm font-medium text-blue-950 mx-1 focus:outline-none'
                    />
                  </div>
                </div>
              </div>
              <div className='flex flex-row items-center w-[10%]'>
                <button className={`bg-blue-950 w-full mr-2 font-bold text-slate-200 py-4 px-3 rounded-lg ${isPending && 'w-20 px-2 bg-gray-600'}`}
                  disabled={isPending}> {!isPending ? <span>SEARCH</span> :<PulseLoader color="#ffffff" size={7}/>}
                </button> 
              </div>
            </form>
          </div>
        </div>
        <SortResults handleFilterClick={handleFilterClick} setShowFilter={setShowFilter}/>
      </div>
      <div className='w-[100%] flex flex-col items-center'>
        <SearchResult showFilter={showFilter} setShowFilter={setShowFilter} />
      </div>
    </div>
   )
}

export default Flights