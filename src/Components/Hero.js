import React, { useContext } from 'react'
import { AppContext } from '../context'
import Searchbox from './Searchbox';
const Hero = () => {
  const {closeSubMenu} = useContext(AppContext);
  return (
    <section className='hero' onMouseOver={closeSubMenu}>
      <div className='hero-center'>
        <article className='hero-info'>
          <br />
          <br />
          <br />
          <br />
          <h1 className='welcome-text'>
            Welocome to <br />
            Sri Lanka Railways
          </h1>
          <p className='sub-text'>
            Adventure awaits! Hop aboard and let the journey begin.
          </p>
          {/* <button className='btn'>Book Now</button> */}
          <a href='#searchbox'>
            <button className='btn'>Book Now</button>
          </a>
        </article>
        {/* <article className='hero-images'>
          <img src={phoneImg} className='phone-img' alt='phone' />
        </article> */}
      </div>
      <Searchbox/>
    </section>
  );
}

export default Hero
