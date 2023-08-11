import React from 'react'
import Hero from '../Components/Hero';
import Submenu from '../Components/Submenu';
import Gallery from './Gallery';
import Services from './Services';
import Sidebar from '../Components/Sidebar';
import Journey from './Journey';
import About from './About';

const Home = () => {
  return (
    <div id='main'>
      <Sidebar/>
      <Hero/>
      <Submenu/>
      <Gallery/>
      <Services/>
      <Journey/>
      <About/>
    </div>
  )
}

export default Home;
