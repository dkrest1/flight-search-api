import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Components/Home';
import Navbar from './Navbar';
import Flights from './Components/Flights'
import Bookings from './Components/Bookings'
import Contact from './Components/Contact'
// import heroImg from '../../public/Assets/hero-image.jpg'
function App() {
  return (
   <div className='flex flex-col bg-hero-img h-screen bg-cover bg-no-repeat'>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/flights' element={<Flights/>}/>
        <Route exact path='/bookings' element={<Bookings/>}/>
        <Route exact path='/contact' element={<Contact/>}/>
      </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;
