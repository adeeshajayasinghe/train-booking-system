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
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import SeatView from './Pages/SeatView';
import EmailVerify from './Pages/EmailVerify';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import ModifySchedule from './Pages/ModifySchedule';
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
        <Route path='/modify-schedules' element={<ModifySchedule/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
