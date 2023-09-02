import React from 'react'
import { AppContext } from '../context'
import axios from 'axios';
import  { useContext,useEffect } from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Registerimg from '../images/register-img.png'

export default function Form() {
    
    const inputRef = React.useRef(null);
    const {NIC ,firstName,lastName,email,mobile,handleEmail,passenger_count,handleMobile, handleNIC,handlePassenger_count,handleFirstName,handleLastName} = useContext(AppContext);
    const [errorMessage, setErrorMessage] = React.useState('');
    const userid =window.localStorage.getItem("userID") ;
    
    const data={userID:userid};
    console.log(data.userID)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.post('http://localhost:4000/form', 
                    data,
                );

                handleFirstName(res.data.firstName); // Use res.data.firstName
                handleLastName(res.data.lastName);
                handleMobile(res.data.mobile);
                handleEmail(res.data.email);
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    setErrorMessage(error.response.data.error);
                }
            }
        };

        fetchData();
    }, []); // Run only once when the component mounts

    const handleSubmit = ()=>{
        console.log("nice");
        console.log(firstName);
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
            <h2>Booking Details</h2>
        
            <div className='route'>
                <div className='origin'>
                    <FormControl>
                        <FormLabel>First name</FormLabel>
                        <Input defaultValue={firstName} variant="soft" value={firstName} onChange={(event) => handleFirstName(event.target.value)}/>
                    </FormControl>
                </div>
                <div className='dest'>
                    <FormControl>
                        <FormLabel>Last name</FormLabel>
                        <Input defaultValue={lastName} variant="soft" value={lastName} onChange={(event) => handleLastName(event.target.value)}/>
                    </FormControl>
                </div>
            </div>
            <div className='route'>
                <div className='origin'>
                    <FormControl>
                        <FormLabel>Mobile number</FormLabel>
                        <Input defaultValue={mobile} variant="soft" value={mobile} onChange={(event) => handleMobile(event.target.value)}/>
                    </FormControl>
                </div>
           
           
                <div className='dest'>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input defaultValue={email} variant="soft" type='email' value={email} onChange={(event) => handleEmail(event.target.value)}/>
                    </FormControl>
                </div>
            </div>
            <div className='route'>
                <div className='origin'>
                    <FormControl>
                        <FormLabel>NIC</FormLabel>
                        <Input placeholder="Enter here" type="email" variant="soft"  value={NIC} onChange={(event) => handleNIC(event.target.value)}/>
                    </FormControl>
                </div>
            
                <div className='dest'>
                    <FormControl>
                        <FormLabel>passenger count</FormLabel>
                        
                        <Input
            type="number"
            placeholder='Choose a value'
            slotProps={{
            input: {
                ref: inputRef,
                min: 1,
                step: 1,
            },
    
            }}
            value={passenger_count} onChange={(event) => handlePassenger_count(event.target.value)}
            />
                    </FormControl>
                </div>
            </div>
            
            <div className='submit-btn'>
                <Button type="submit">Submit</Button>
            </div>
        </form>
      </div>
      
    </section>
  )
}
