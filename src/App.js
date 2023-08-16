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
      </Routes>
    </Router>
  )
}

export default App
