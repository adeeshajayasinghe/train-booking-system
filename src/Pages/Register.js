import React, { useContext } from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Registerimg from '../images/register-img.png'
import { useState } from 'react';
import axios from 'axios';
import { AppContext } from '../context'
import Alert from '@mui/material/Alert';
import { useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Register = () => {

    const {firstName, lastName, mobile, NIC, email, password, handleFirstName, handleLastName, handleMobile, handleNIC, handleEmail, handlePassword} = useContext(AppContext);
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if(message){
            setErrorMessage(false);
            setOpen(false);
        }
        if(errorMessage){
            setOpen(false);
        }
      }, [message, errorMessage]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('https://stage-pilot-train-booking-system.onrender.com/register', {
                firstName,
                lastName,
                mobile,
                NIC,
                email,
                password
            });
            // navigate('/login');
            setMessage('Registration successful! Please check your email for verification link.');
        }catch(error) {
            if (error.response && error.response.data && error.response.data.error) {
                setErrorMessage(error.response.data.error);
            }
        }
    };

  return (
    <section className='hero'>
      <div className='hero-center'>
        <article className='hero-info'>
          <article className='hero-images'>
            <img src={Registerimg} className='login-img' alt='login' />
          </article>
         
        </article>
            
        <form className="review-reg" onSubmit={handleSubmit}>
            <h2>Register</h2>
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
            <div className='route'>
                <div className='origin'>
                        <FormControl>
                            <FormLabel>Mobile number</FormLabel>
                            <Input placeholder="Enter here" variant="soft" value={mobile} onChange={(event) => handleMobile(event.target.value)}/>
                        </FormControl>
                    </div>
                    <div className='dest'>
                        <FormControl>
                            <FormLabel>NIC</FormLabel>
                            <Input placeholder="Enter here" variant="soft" value={NIC} onChange={(event) => handleNIC(event.target.value)}/>
                        </FormControl>
                </div>
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
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            {message && <Alert severity="success">{message}</Alert>}
            <div className='submit-btn'>
                <Button type="submit" onClick={handleOpen}>Submit</Button>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        </form>
      </div>
      
    </section>
  );
}

export default Register
