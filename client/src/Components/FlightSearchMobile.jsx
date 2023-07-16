import React from 'react'
import airports from './airports.json'
import { useState, useEffect } from 'react'
import { DropDownSearch } from './Flights'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { accesstoken } from './redux/tokenSlice'
import { useSelector } from 'react-redux'
import axios from 'axios'

const FlightSearchMobile = () => {
    const token = useSelector(accesstoken)
    const [departureOption, setDepartureOption] = useState(null)
    const [arrivalOption, setArrivalOption] = useState(null)
    const [searchInputs, setSearchInputs] = useState({
    origin: null,
    destination: null,
    departure_date: "",
    adults: 0
  })
  const [isPending, setIsPending] = useState(false) 
  const [errors, setErrors] = useState(null)
  useEffect(()=>{
    if(departureOption){
      setSearchInputs((prevValues)=>({...prevValues, origin:departureOption.label}))
    }
    if(arrivalOption){
      setSearchInputs((prevValues)=>({...prevValues, destination: arrivalOption.label}))}
    console.log(departureOption, arrivalOption)
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
      console.log("something happened")
    }
  }
  const setDepartureErorr=()=>{
    setErrors((prevValues)=>({...prevValues, departureOption:""}))
  }
  const setArrivalErorr=()=>{
    setErrors((prevValues)=>({...prevValues, arrivalOption:""}))
  }
  return (
    <div className='w-full mt-6 '>
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
            <button className='text-white bg-blue-950 font-medium text-lg rounded tracking-wider mt-3 py-2'>Search</button>
        </form>
    </div>
  )
}

export default FlightSearchMobile