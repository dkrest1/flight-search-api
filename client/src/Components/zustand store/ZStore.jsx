import {create} from 'zustand'

const useFlightStore = create((set)=>({
    flightData: JSON.parse(localStorage.getItem('flight-data')) || null,
    addFlight: (search)=> set((state)=>({flightData: search})),
    removeFlight: ()=> set((state)=>({flightData:null}))
}))

export default useFlightStore