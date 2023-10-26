import React from 'react'
import Navbar from './Components/Navbar';
import Gallery from './Pages/Gallery';
import Services from './Pages/Services';
import Register from './Pages/Register';
import Journey from './Pages/Journey';
import About from './Pages/About';
import Search from './Pages/Search';
import Dashboard from './Pages/Dashboard';
import Admin from './Pages/Admin';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import SeatView from './Pages/SeatView';
import EmailVerify from './Pages/EmailVerify';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import Payment from './Pages/Payment';
import Cancel from './Pages/Cancel';
import Profile from './Pages/Profile';
import ViewHistory from './Pages/ViewHistory';
import Footer from './Components/Footer';

import PaymentAnalitics from './Pages/PaymentAnalitics';
import TicketAnalysis from './Pages/TicketAnalysis';
import RouteDetails from './Pages/RouteDetails';
import BookingHistory from './Pages/BookingHistory';
import AdminTrains from './Pages/AdminTrains';
import './index.css';
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/gallery' element={<Gallery/>}></Route>
        <Route path='/services' element={<Services/>}></Route>
        <Route path='/journey' element={<Journey/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/search' element={<Search/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/admin' element={<Admin/>}></Route>
        <Route path='/seatview' element={<SeatView/>}></Route>
        <Route path='/register/:id/verify/:emailToken' element={<EmailVerify/>}></Route>
        <Route path='/forgotpassword' element={<ForgotPassword/>}></Route>
        <Route path='/resetpassword' element={<ResetPassword/>}></Route>
        <Route path='/payment' element={<Payment/>}></Route>
        <Route path='/cancel' element={<Cancel/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/viewhistory' element={<ViewHistory/>}></Route>
        <Route path='/routedetails' element={<RouteDetails></RouteDetails>}></Route>
        <Route path='/booking-history' element={<BookingHistory></BookingHistory>}></Route>
        <Route path='/modify-schedules' element={<AdminTrains/>}></Route>
        <Route path='/payment-analytics' element={<PaymentAnalitics/>}></Route>
        <Route path='/ticket-analytics' element={<TicketAnalysis/>}></Route>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
