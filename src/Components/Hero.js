import React, { useContext } from 'react'
import { AppContext } from '../context'
import travelImg from '../images/Home-img.png';
import { Link } from 'react-router-dom';
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
          {/* <a href='#searchbox'>
            <button className='btn'>Book Now</button>
          </a> */}
          <Link to="/search">
            <button className='btn'>
              Book Now
            </button>
          </Link>
        </article>
        <article className='hero-images'>
          <img src={travelImg} className='phone-img' alt='travel-man' />
        </article>
      </div>
    </section>
  );
}

export default Hero
