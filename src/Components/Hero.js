import React, { useContext } from 'react'
import phoneImg from '../images/phone.svg'
import { AppContext } from '../context'
const Hero = () => {
  const {closeSubMenu} = useContext(AppContext);
  return (
    <section className='hero' onMouseOver={closeSubMenu}>
      <div className='hero-center'>
        <article className='hero-info'>
          <h1>
            Welocome to <br />
            Sri Lanka Railways
          </h1>
          <p>
            Adventure awaits! Hop aboard and let the journey begin.
          </p>
          <button className='btn'>Book Now</button>
        </article>
        {/* <article className='hero-images'>
          <img src={phoneImg} className='phone-img' alt='phone' />
        </article> */}
      </div>
    </section>
  );
}

export default Hero
