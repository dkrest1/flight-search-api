import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
// import { useLocation } from 'react-router-dom';
import Home from './Components/Home';
import Navbar from './Navbar';
import Flights from './Components/Flights'
import Bookings from './Components/Bookings'
import Contact from './Components/Contact'
import Details from './Components/Details';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import { useEffect } from 'react';
import { accesstoken } from './Components/redux/tokenSlice';
import { user } from './Components/redux/userSlice';
import { useSelector } from 'react-redux';
import FlightInfo from './Components/FlightInfo';
import Booked from './Components/Booked';

function App() {
  const token = useSelector(accesstoken)
  const users = useSelector(user)
  // console.log(token)
  // console.log(users)
  // // const location = useLocation();

  // // const useScrollToTop = () => {
  //   useEffect(() => {
  //     window.scrollTo({ top: 0 });
  //     // scroll to the top of the browser window when changing route
  //     // the window object is a normal DOM object and is safe to use in React.
  //   }, [location]);
  // // };
  return (
    <div className="h-screen w-full box-content flex flex-col ">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/flights" element={<Flights />} />
          <Route exact path="/bookings" element={<Bookings />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/details/:id" element={<Details />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/flight-info/:id" element={<FlightInfo />} />
          <Route exact path='/booked' element={<Booked/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
