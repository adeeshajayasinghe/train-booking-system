import * as React from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';


export default function Gallery() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
   });
  },[]);
  return (
    <section className='hero2'>
      <div className='content-center'>
       <div className='review' data-aos="fade-up" data-aos-offset="200">
        <h2>Gallery</h2>
       </div>
      </div>  
    </section>
    
  );
}

