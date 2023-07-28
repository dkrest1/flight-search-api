import {create} from 'zustand'

const useFlightStore = create((set) => ({
  flightData: JSON.parse(localStorage.getItem("flight-data")) || null,
  showResult: JSON.parse(localStorage.getItem("flight-data")) || null,
  filteredResult: null,
  addFlight: (search) => set((state) => ({ flightData: search })),
  removeFlight: () => set((state) => ({ flightData: null })),
  getResult: (result) => set((state) => ({ showResult: result })),
  getFiltered: (filtered) => set((state) => ({ filteredResult: filtered })),
  removeFiltered: () => set((state) => ({ filteredResult: null })),
}));

export default useFlightStore