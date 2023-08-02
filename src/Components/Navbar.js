import React, { useContext } from 'react'
import logo from '../images/logo.svg'
import { FaBars, FaTrain } from 'react-icons/fa'
import { AppContext } from '../context'
const Navbar = () => {
  const {openSidebar, openSubMenu, closeSubMenu} = useContext(AppContext);
  function dispalySubMenu(e){
    const page = e.target.textContent;
    const tempBtn = e.target.getBoundingClientRect();
    const center = (tempBtn.left + tempBtn.right) / 2;
    const bottom = tempBtn.bottom - 3;
    openSubMenu(page, {center, bottom})
  }
  function handleSubMenu(e){
    if(!e.target.classList.contains('link-btn')){
      closeSubMenu();
    }
  }
  return (
    <nav className='nav' onMouseOver={handleSubMenu}>
      <div className="nav-center">
        <div className="nav-header">
          {/* <img src={logo} alt='stripe' className='nav-logo'/> */}
          {/* <FaTrain/><span>Sri Lanka Railways</span> */}
          <div>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <FaTrain style={{ marginRight: '8px' }} />
                Sri Lanka Railways
            </span>
          </div>
          <button className='btn toggle-btn' onClick={openSidebar}><FaBars/></button>
        </div>
        <ul className='nav-links'>
          <li>
            <a className='link-btn' onMouseOver={dispalySubMenu} href='#home'>Home</a>
          </li>
          <li>
            <a className='link-btn' onMouseOver={dispalySubMenu} href='#gallery'>Gallery</a>
          </li>
          <li>
            <a className='link-btn' onMouseOver={dispalySubMenu} href='#services'>Services</a>
          </li>
          <li>
            <a className='link-btn' onMouseOver={dispalySubMenu} href='#journey'>Journey</a>
          </li>
          <li>
            <a className='link-btn' onMouseOver={dispalySubMenu} href='#about'>About</a>
          </li>
        </ul>
        <div className='register'>
          <button className='btn signin-btn'>Sign in</button>
          <button className='btn signin-btn'>Sign up</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar
