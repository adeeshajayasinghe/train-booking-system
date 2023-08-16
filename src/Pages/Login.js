import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import loginimg from '../images/Login-img.png'
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context'
import { useContext, useState } from 'react';

const Login = () => {
  const {email, password, handleEmail, handlePassword} = useContext(AppContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [cookies, setCookies] = useCookies(['access_token']);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/login', {
        email,
        password
      })
      const userType = response.data.userType;
      setCookies('access_token', response.data.token);;
      window.localStorage.setItem("userID", response.data.userID);
      if (userType === 'User') {
        navigate('/');
      } else if (userType === 'Admin') {
        navigate('/admin');
      }
      
    } catch(error) {
      // console.log(err);
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      }
    }
  };
  return (
    <section className='hero'>
      <div className='hero-center'>
        <article className='hero-info'>
            {/* <h1 className='welcome-text'>
            Welcome back. <br />
            Log in<br />
            and explore!
          </h1> */}
          <br />
          <br />
          <br />
          <br />
          <article className='hero-images'>
            <img src={loginimg} className='login-img' alt='login' />
          </article>
        </article>
        <form className="review-login" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className='login-fields'>
                <div className='origin'>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input placeholder="Enter here" variant="soft" type='email' value={email} onChange={(event) => handleEmail(event.target.value)}/>
                    </FormControl>
                </div>
                <div className='dest'>
                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input placeholder="Enter here" variant="soft" type='password' value={password} onChange={(event) => handlePassword(event.target.value)}/>
                    </FormControl>
                </div>
                {errorMessage && <p className='error-msg'>{errorMessage}</p>}
                
            </div>
            
            <div className='submit-btn'>
                <Button type="submit">Login</Button>
            </div>
        </form>
      </div>
      
    </section>
  );
}

export default Login
