import React, { useState } from 'react'
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context'
import { useContext } from 'react';

const ResetPassword = () => {
    const [newpassword, setNewPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [cookies, setCookies] = useCookies(['access_token']);
    const navigate = useNavigate();
    const {email, handleAdmin} = useContext(AppContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.post('http://localhost:4000/login/resetpassword', {
            newpassword,
            confirmpassword,
            email
          })
          const userType = response.data.isAdmin;
          setCookies('access_token', response.data.token);;
          window.localStorage.setItem("userID", response.data.userID);
          if (userType) {
            handleAdmin(true);
            navigate('/admin');
          } else {
            navigate('/');
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
                    <form className="review-search" onSubmit={handleSubmit}>
                    <h2>Reset password</h2>
                    <div className='reset-fields'>
                        <div className='origin'>
                            <FormControl>
                                <FormLabel>New Password</FormLabel>
                                <Input placeholder="Enter here" variant="soft" type='password' value={newpassword} onChange={(event) => setNewPassword(event.target.value)}/>
                            </FormControl>
                        </div>
                        <div className='dest'>
                            <FormControl>
                                <FormLabel>Confirm Password</FormLabel>
                                <Input placeholder="Enter here" variant="soft" type='password' value={confirmpassword} onChange={(event) => setConfirmPassword(event.target.value)}/>
                            </FormControl>
                        </div>
                        {errorMessage && <p className='error-msg'>{errorMessage}</p>}
                        <div className='submit-btn'>
                            <Button type="submit">Login</Button>
                        </div>
                    </div>
                    
                   
                </form>
            </article>
        </div>
    </section>
  )
}

export default ResetPassword;
