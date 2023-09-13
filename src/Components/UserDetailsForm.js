import React from 'react'
import { useContext, useState, useEffect } from 'react'
import {AppContext} from '../context'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

const UserDetailsForm = () => {
    const inputRef = React.useRef(null);
    const {openPopup, handlePopup, firstName, lastName, mobile, NIC, email, passengerCount, date, from, to, handleFirstName, handleLastName, handleMobile, handleNIC, handleEmail, handlePassengerCount, handleRefNumber, trainName, classIndex, classPrice, seatNumbers, timeFrom, timeTo, handleClassName } = useContext(AppContext);
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');
    const userid=window.localStorage.getItem("userID") ;
    const data={userID:userid};
    let registered=true;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.post('http://localhost:4000/popupForm', 
                    data,
                );
                if(res){
                    console.log(res.data.firstName);
                    handleFirstName(res.data.firstName);
                    handleLastName(res.data.lastName);
                    handleMobile(res.data.mobile);
                    handleNIC(res.data.NIC);
                    handleEmail(res.data.email);
                }
                else{
                    registered=false;
                }

            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    setErrorMessage(error.response.data.error);
                }
            }
        };
        fetchData();
    }, []); // Run only once when the component mounts

    const handleSubmit = async () => {
        try {
            const totalPayment = (classPrice * passengerCount).toString();
            let className = '';
            if (classIndex === 0) {
                className = 'First Class';
            } else if (classIndex === 1) {
                className = 'Second Class';
            } else {
                className = 'Third Class';
            }
            handleClassName(className);
            const response = await axios.post('http://localhost:4000/booking', {
                firstName,
                lastName,
                mobile,
                email,
                NIC,
                passengerCount,
                trainName,
                from,
                to,
                date,
                price: totalPayment,
                seat_numbers: seatNumbers,
                class: className,
                timeFrom,
                timeTo
            });
            handleRefNumber(response.data);
            handlePopup(false);
            navigate('/payment');
        }catch(error) {
            if (error.response && error.response.data && error.response.data.error) {
                setErrorMessage(error.response.data.error);
            }
        }
        
    };

  return (
    <Dialog open={openPopup}>
        <DialogTitle>User Form</DialogTitle>
        
        <DialogContent>
        <DialogContentText>
           Please enter your details to make the payment.
        </DialogContentText>
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
            value={passengerCount} onChange={(event) => handlePassengerCount(event.target.value)}
            />
                    </FormControl>
                </div>
            </div>
            {/* {errorMessage && <p className='error-msg'>{errorMessage}</p>} */}
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            {/* {message && <p className='success-msg'>{message}</p>} */}
            {message && <Alert severity="success">{message}</Alert>}
            <div className='submit-btn'>
                <DialogActions>
                    <Button onClick={()=>{handleSubmit()}}>Submit</Button>
                    <Button onClick={()=>{handlePopup(false)}}>Cancel</Button>
                </DialogActions>
            </div>
          
        </DialogContent>
    </Dialog>
  )
}

export default UserDetailsForm;