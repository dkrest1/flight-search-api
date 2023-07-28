import React from 'react'
import airports from './airports.json'
import { useState, useEffect } from 'react'
import DropDownSearch from './DropDownSearch'
import { faUser, faPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { accesstoken } from './redux/tokenSlice'
import { useSelector } from 'react-redux'
import axios from 'axios'
import useFlightStore from './zustand store/ZStore'
import PulseLoader from 'react-spinners/PulseLoader'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const FlightSearchMobile = () => {
  const {flightData, addFlight} = useFlightStore()
  const searchData = flightData
  // console.log(flightData)
    const token = useSelector(accesstoken)
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
    if(departureOption && arrivalOption && departureOption.value===arrivalOption.value){
        errors.match="Match!! Origin cannot be the same as destination"
        console.log(errors.match)
    }
    return errors
  }
  const [prompt, setPrompt] = useState(null)
  const notify = ()=>toast(prompt)
  const handleSearchFlight=(event)=>{
    setIsPending(true)
    event.preventDefault()
    const validated = verifyInputs()
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
  const setDepartureErorr=()=>{
    setErrors((prevValues)=>({...prevValues, departureOption:""}))
  }
  const setArrivalErorr=()=>{
    setErrors((prevValues)=>({...prevValues, arrivalOption:""}))
  }
  const searchResult =(
    
      searchData ? searchData.map((value)=>(
      <>
      <div key={value.id} className='md:w-[90%] mt-3 '>
        <div className='w-full flex flex-row rounded-lg divide-2 border-2 shadow-sm h-ful'>
          <div className='hidde w-[14%] md:flex flex-row justify-center items-center border-r border-slate-300 py-1'>
            <img src=''alt={value.airline +' airline image'} className=' h-full '/>
          </div>
          <div className='w-[43%] flex flex-row border-dashed border-r border-slate-300 h-full items-center justify-center px-2 md:gap-10 py-2 md:py-7'>
            <div className='flex flex-col items-center '>
              <h2 className='font-semibold text-[17px] md:text-4xl tracking-wide md:tracking-wider'>{value.departure.iataCode}</h2>
              <small className=' text-slate-500 font-medium text-[9px] md:text-base'>{value.departure.at.substring(11)}</small>
            </div>
            <div className='flex flex-col items-center gap-2 md:-mt-2 '>
              <small className='text-[9px] text-slate-500 font-medium'>{value.duration.replace("hour", "hr").replace("minutes", "min")}</small>
              <FontAwesomeIcon 
                icon={faPlane} 
                className='text-lg text-blue-950'
              />
              <small className='text-[9px] text-center text-slate-500 font-medium'>{'flight no. '+ value.flightNumber}</small>
            </div>
            <div className='flex flex-col items-center'>
              <p className='font-semibold text-[17px] md:text-sm tracking-normal md:tracking-wide'>{value.arrival.iataCode}</p>
              <small className='text-[9px] text-slate-500 font-medium'>{value.arrival.at.substring(11)}</small>
            </div>
          </div>
          <div className='flex flex-row w-[43%] justify-between md:justify-end items-center md:gap-32 md:mx-5  '>
            <div className='flex flex-col w-full items-center gap-1 '>
              <small className='text-[9px] md:text-xs text-slate-500 font-medium'>price per seat</small>
              <h3 className='text-[16px] md:text-3xl font-semibold tracking-wide -ml-'>{ '€ '+value.price}</h3>
                <small className='text-[9px] md:text-xs text-slate-500 font-medium'>
                  <FontAwesomeIcon icon={faUser} className='text-blue-950' /> First Class</small>
            </div>
            <div className='flex flex-col w-full items-end md:items-center md:gap-2'>
              <button className='bg-blue-950 text-slate-200 text-[11px] md:text-sm w-fit py-1 md:py-2 px-1 md:px-3 rounded-lg'>Book Now</button>
              <small className='text-[9px] md:text-xs text-center text-slate-500 font-medium'>{value.numberOfBookableSeats + ' Available Seat(s)'}</small>
            </div>
          </div>
        </div>
      </div>
      </>
      ))
  :
  <p>loading...</p>
  
  )
  return (
    <div className='w-full mt-6 '>
      <ToastContainer/>
        <form onSubmit={handleSearchFlight} className='w-full flex flex-col'>
            <select name='class'className='border border-slate-300 rounded p-2'>
                <option value=''>First class</option>
                <option value='' >First class</option>
                <option value='' >Economy class</option>
            </select>
            <div className='relative text-sm mt-2'>
                <small className='absolute left-1 -top-1 z-10 text-[9px]'>From</small>
                <DropDownSearch name='origin' selectedOption={departureOption} setSelectedOption={setDepartureOption} options={options} setErorrs={setDepartureErorr}  className=''/>
                {errors && errors.departureOption && 
                    <small className='text-[10px] text-red-600 ml-1'>{errors.departureOption}</small>
                }
            </div>
            <div className='relative text-sm mt-2'>
                <small className='absolute left-1 -top-1 z-10 text-[9px]'>To</small>
                <DropDownSearch name='destination' selectedOption={arrivalOption} setSelectedOption={setArrivalOption} options={options} setErorrs={setArrivalErorr} className=''/>
                {errors && errors.arrivalOption && 
                    <small className='text-[10px] text-red-600 ml-1'>{errors.arrivalOption}</small>
                }
            </div>
            <div className='flex flex-row w-full gap-6 mt-2 h-12 '>
                <input type='date' 
                    name='departure_date' 
                    value={searchInputs.departure_date} 
                    onChange={onInputChange}
                    className='border rounded w-1/2 p-1'
                />
                <div className='flex flex-row border rounded gap-2 w-1/2 p-1 justify-between'>
                    <div className='flex flex-col w-[90%]'>
                        <small className='text-slate-500'>Passengers</small>
                        <input type='number' 
                            name='adults' 
                            value={searchInputs.adults}
                            onChange={onInputChange} 
                            className='-mt-1  focus:outline-none'
                        />
                    </div>
                    <div className='flex flex-row mt-3 -ml-2'>
                        <FontAwesomeIcon icon={faUser} className='text-slate-500 text-sm'/>
                        <FontAwesomeIcon icon={faUser} className='text-slate-500 text-xs -ml-1'/>
                    </div>
                </div>
            </div>
            <div className='flex flex-row justify-between '>
                {errors && 
                    <small className='text-[10px] text-red-600 ml-1'>{errors.departure_date}</small>
                }
                </div>
            <button className={`text-white bg-blue-950 font-medium text-lg rounded tracking-wider mt-3 py-2 ${isPending && 'bg-slate-700'}`} disabled={isPending}>
              {
                  isPending ? <span className=''>searching <PulseLoader color='#ffffff' size={4}/> </span>
                :
                <span>Search</span>
              }
            </button>
        </form>
        <div>
          {/* {searchResult} */}
        </div>
    </div>
  )
}

export default FlightSearchMobile