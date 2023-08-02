import React from 'react'
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import Sidebar from './Components/Sidebar';
import Submenu from './Components/Submenu';
import Gallery from './Components/Gallery';
import Services from './Components/Services';
import './index.css';
function App() {
  return (
    <div id='main'>
      <Navbar/>
      <Sidebar/>
      <Hero/>
      <Submenu/>
      <Gallery/>
      <Services/>
    </div>
  )
}

export default App
