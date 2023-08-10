import { create } from "zustand";

const useFlightStore = create((set) => ({
  flightData: JSON.parse(localStorage.getItem("flight-data")) || null,
  passengers: localStorage.getItem("passengers") || 1,
  passengersInfo: [],
  showResult: JSON.parse(localStorage.getItem("flight-data")) || null,
  filteredResult: null,
  bookedFlight: JSON.parse(localStorage.getItem("booked-flight")) || null,
  allBookings: JSON.parse(localStorage.getItem("all-bookings")) || [],
  isLoggedIn: false,
  getIsLoggedIn: (login) => set((state) => ({ isLoggedIn: login })),
  getBookedFlight: (booked) => set((state) => ({ bookedFlight: booked })),
  getAllBookings: (bookings) =>
    set((state) =>
      state.allBookings
        ? { allBookings: [...state.allBookings, bookings] }
        : { allBookings: [bookings] }
    ),
  removeAllBookings: () => set((state) => ({ allBookings: null })),
  getPassengersInfo: (info) =>
    set((state) => ({ passengersInfo: [...state.passengersInfo, info] })),
  removePassengersInfo: () => set((state) => ({ passengersInfo: null })),
  getPassengers: (number) => set((state) => ({ passengers: number })),
  addFlight: (search) => set((state) => ({ flightData: search })),
  removeFlight: () => set((state) => ({ flightData: null })),
  getResult: (result) => set((state) => ({ showResult: result })),
  getFiltered: (filtered) => set((state) => ({ filteredResult: filtered })),
  removeFiltered: () => set((state) => ({ filteredResult: null })),
}));

export default useFlightStore;
