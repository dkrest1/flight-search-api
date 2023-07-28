import {create} from 'zustand'

const useFlightStore = create((set)=>({
    flightData: JSON.parse(localStorage.getItem('flight-data')) || null,
    sortedData: null,
    addFlight: (search)=> set((state)=>({flightData: search})),
    removeFlight: ()=> set((state)=>({flightData:null})),
    getSorted: (sorted)=> set((state)=>({sortedData: sorted}))
}))

export default useFlightStore