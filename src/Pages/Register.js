import React, { useContext } from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Registerimg from '../images/register-img.png'
import { useState } from 'react';
import axios from 'axios';
import { AppContext } from '../context'
import { useNavigate } from 'react-router-dom';
const Register = () => {
    // const [firstName, setFirstName] = useState('');
    // const [lastName, setLastName] = useState('');
    // const [mobile, setMobile] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    const {firstName, lastName, mobile, email, password, handleFirstName, handleLastName, handleMobile, handleEmail, handlePassword} = useContext(AppContext);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:4000/register', {
                firstName,
                lastName,
                mobile,
                email,
                password
            });
            navigate('/login');
        }catch(error) {
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
            Join us <br />
            today <br />
            with just a<br />
            few clicks!
          </h1> */}
          <article className='hero-images'>
            <img src={Registerimg} className='login-img' alt='login' />
          </article>
         
        </article>
        {/* <article className='hero-images'>
          <img src={travelImg} className='phone-img' alt='phone' />
        </article> */}
        <form className="review-reg" onSubmit={handleSubmit}>
            <h2>Register</h2>
            {/* <div className='radio-btn'>
                <div className='user-radio'>
                    <input
                    type="radio"
                    name="UserType"
                    value="User"
                    onChange={(event) => handleUserType(event.target.value)}
                    />
                    User
                </div>
                <div>
                    <input
                    type="radio"
                    name="UserType"
                    value="Admin"
                    onChange={(event) => handleUserType(event.target.value)}
                    />
                    Admin
                </div>   
            </div> */}
            <div className='route'>
                <div className='origin'>
                    <FormControl>
                        <FormLabel>First name</FormLabel>
                        <Input placeholder="Enter here" variant="soft" value={firstName} onChange={(event) => handleFirstName(event.target.value)}/>
                    </FormControl>
                </div>
                <div className='dest'>
                    <FormControl>
                        <FormLabel>Last name</FormLabel>
                        <Input placeholder="Enter here" variant="soft" value={lastName} onChange={(event) => handleLastName(event.target.value)}/>
                    </FormControl>
                </div>
            </div>
                <div className='origin'>
                    <FormControl>
                        <FormLabel>Mobile number</FormLabel>
                        <Input placeholder="Enter here" variant="soft" value={mobile} onChange={(event) => handleMobile(event.target.value)}/>
                    </FormControl>
                </div>
           
            <div className='route'>
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
            </div>
            {errorMessage && <p className='error-msg'>{errorMessage}</p>}
            <div className='submit-btn'>
                <Button type="submit">Submit</Button>
            </div>
        </form>
      </div>
      
    </section>
  );
}

export default Register
