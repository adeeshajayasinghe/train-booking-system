import React from 'react';
import { useEffect } from 'react';
import Payment from '../images/Payments.png';
import Trip from '../images/Home-img.png'
import Seat from '../images/cancel.png'
import Cancel from '../images/Login-img.png'
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from 'react-router-dom';

const Services = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000,
   });
  },[]);

  return (
    // <div className='services'>
    //   <h1>Services</h1>
    // </div>
    <section className='hero'>
    <div className='content-center'>
     
      <div className='service-card' data-aos="fade-right" data-aos-offset="200">
        <h3>Online Payments</h3>
        <img src={Payment} className='payment-img' alt='Online-Payment'/>
        <p>Simplify your train bookings with our secure online payment options. From credit cards to digital wallets, we've got you covered. Enjoy easy, worry-free payments with us.</p>
        <Link to="/journey">View More</Link>
      </div>
      <div className='service-card' data-aos="fade-right" data-aos-offset="200">
        <h3>Plan Your Trip</h3>
        <img src={Trip} className='payment-img' alt='Trip-planning'/>
        <p>Plan your train journey with us. Explore all available trains on your chosen date, empowering you to create the perfect travel itinerary. Your adventure begins here.</p>
        <Link to="/journey">View More</Link>
      </div>
      <div className='service-card' data-aos="fade-left" data-aos-offset="200">
        <h3>Select Your Seat</h3>
        <img src={Seat} className='payment-img' alt='seat-preferrence'/>
        <p>Choose your ideal train seat with our seat view feature. Early birds have the advantage, book in advance for a window seat and enjoy the best views on your journey.</p>
        <Link to="/journey">View More</Link>
      </div>
      <div className='service-card' data-aos="fade-left" data-aos-offset="200">
        <h3>Cancel Anytime</h3>
        <img src={Cancel} className='payment-img' alt='seat-preferrence'/>
        <p>Life happens, plans change. With us, you have the flexibility to cancel your booking at any time. No fuss, no hassle, just convenience at your fingertips.</p>
        <Link to="/journey">View More</Link>
      </div>
    </div>  
  </section>
    
  )
}
export default Services;