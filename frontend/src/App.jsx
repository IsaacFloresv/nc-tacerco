import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar } from './common/Navbar';
import { Home } from './views/Home';
import { ListEvent } from './views/ListEvent';
import Register from './views/Register';
import { Login } from './views/Login';
import { Footer } from './common/Footer';
import EventCharge from './views/EventCharge';
import { Profile } from './views/Profile';
import { LandingPage } from './views/LandingPage';
import './App.css';
import { ProfileChange } from './views/ProfileChange';
import { UserEvents } from './views/UserEvents';
import { CardEvent } from './common/CardEvent';

function App() {
   return (
      <>
         <main className='w-screen min-h-screen'>
            <BrowserRouter>
               <Navbar />
               <Routes>
                  <Route path='/' element={<LandingPage />} />
                  <Route path='/home' element={<Home />} />
                  <Route path='/create' element={<EventCharge />} />
                  <Route path='/list' element={<ListEvent />} />
                  <Route path='/event/:id' element={<CardEvent />} />
                  <Route path='/register' element={<Register />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/profile' element={<Profile />} />
                  <Route path='/profile/change' element={<ProfileChange />} />
                  <Route path='/profile/userEvents' element={<UserEvents />} />
               </Routes>
               <Footer />
            </BrowserRouter>
         </main>
      </>
   );
}

export default App;
