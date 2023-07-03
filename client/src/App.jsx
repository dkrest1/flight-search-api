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

function App() {
  // const location = useLocation();
  const hiddenNavbarRoutes = ['/login', '/signup']
  const hideNavbar = hiddenNavbarRoutes.includes()

  // const useScrollToTop = () => {
    useEffect(() => {
      window.scrollTo({ top: 0 });
      // scroll to the top of the browser window when changing route
      // the window object is a normal DOM object and is safe to use in React.
    }, [location]);
  // };
  return (
   <div className='flex flex-col bg-hero-img h-screen bg-cover bg-no-repeat'>
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/flights' element={<Flights/>}/>
        <Route exact path='/bookings' element={<Bookings/>}/>
        <Route exact path='/contact' element={<Contact/>}/>
        <Route exact path='/details' element={<Details/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/signup' element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;
