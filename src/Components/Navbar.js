import React, { useContext } from 'react'
import { FaBars, FaTrain } from 'react-icons/fa'
import { AppContext } from '../context'
import {Link, useNavigate} from 'react-router-dom'
import {useCookies} from 'react-cookie'
const Navbar = () => {
  const {openSidebar, openSubMenu, closeSubMenu, adminEnable, handleAdmin} = useContext(AppContext);
  const [cookies, setCookies] = useCookies(['access_token']);
  const navigate = useNavigate();
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
  function logout(){
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    handleAdmin(false);
    navigate('/register');
  }
  return (
    <nav className={adminEnable?'nav-admin':'nav'} onMouseOver={handleSubMenu}>
      <div className="nav-center">
        <div className="nav-header">
          {/* <img src={logo} alt='stripe' className='nav-logo'/> */}
          {/* <FaTrain/><span>Sri Lanka Railways</span> */}
          <div>
            
          </div>
          <button className='btn toggle-btn' onClick={openSidebar}><FaBars/></button>
        </div>
        <ul className='nav-links'>
          <Link to={'/'} className={adminEnable?'admin-link-btn':'link-btn'} onMouseOver={dispalySubMenu}>Home</Link>
          <Link to={'/gallery'} className={adminEnable?'admin-link-btn':'link-btn'} onMouseOver={dispalySubMenu}>Gallery</Link>
          <Link to={'/services'} className={adminEnable?'admin-link-btn':'link-btn'} onMouseOver={dispalySubMenu}>Services</Link>
          <Link to={'/journey'} className={adminEnable?'admin-link-btn':'link-btn'} onMouseOver={dispalySubMenu}>Journey</Link>
          <Link to={'/about'} className={adminEnable?'admin-link-btn':'link-btn'} onMouseOver={dispalySubMenu}>About</Link>
          {adminEnable?(<Link to={'/admin'} className={adminEnable?'admin-link-btn':'link-btn'}>Admin</Link>):(null)}
          {/* <li>
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
          </li> */}
        </ul>
        {!cookies.access_token?(
           <div className='register'>
          <Link to="/login">
            <button className='btn signin-btn'>
              Sign in
            </button>
          </Link>
          <Link to="/register">
            <button className='btn signin-btn'>
              Sign up
            </button>
          </Link>
          </div>
        ):(<div className='register'>
            <button className='btn signin-btn' onClick={logout}>
              Log out
            </button>
        </div>)}
       
          {/* <button className='btn signin-btn'>Sign in</button>
          <button className='btn signin-btn'>Sign up</button> */}
        
      </div>
    </nav>
  );
}

export default Navbar
