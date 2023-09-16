import React from 'react';
import CancelImg from '../images/cancel.png';
import Input from '@mui/joy/Input';
import Button from '@mui/material/Button';
import CancellationForm from '../Components/CancellationForm';
import { AppContext } from '../context';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';

const Cancel = () => {
    const {handlePopup, handleCancelRef, cancelRef, openPopup} = useContext(AppContext);
    const [refund, setRefund] = useState(null);
  const [remainingDates, setRemainingDates] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  // const [bookingData, setBookingData] = useState();
  // const [seats, setSeats] = useState('');
  const handlePoppup = () => {
    handlePopup(true);
  }
  useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await axios.post('http://localhost:4000/refund', 
                {ReferenceNo: cancelRef},
            );
            setRefund(res.data.refund);
            setRemainingDates(res.data.daysRemaining);
            // setBookingData(res.data.booking);
            // setSeats(res.data.booking.seat_numbers.join(', '));
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                handlePopup(false);
                setErrorMessage(error.response.data.error);
            }
        }
    };
    if (openPopup){
        fetchData();
    }
  }, [openPopup]) ; 
  return (
    <section className='hero'>
        <div className='hero-center'>
            <article className='hero-info'>
            <br />
            <br />
            <br />
            <br />
            <h2>Booking Cancellation</h2>
            <article className='hero-images'>
            <img src={CancelImg} className='phone-img' alt='Payment-image' />
          </article>
            </article>
            <form className='review-reg'>
                <p>Enter your reference number</p>
                <Input
                    placeholder="Enter here"
                    sx={{
                        '--Input-focusedInset': 'var(--any, )',
                        '--Input-focusedThickness': '0.25rem',
                        '--Input-focusedHighlight': 'rgba(13,110,253,.25)',
                        '&::before': {
                        transition: 'box-shadow .15s ease-in-out',
                        },
                        '&:focus-within': {
                        borderColor: '#86b7fe',
                        },
                    }}
                    value={cancelRef} onChange={(event) => handleCancelRef(event.target.value)}
                />
                <br/>
                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                 <Button sx={{
                        width: 170,
                        height: 40,
                        borderRadius: '5px',
                        margin: '0 10px 10px 0', 
                    }}
                    variant='contained'
                    onClick={handlePoppup}
                    >
                    Search
                </Button>
            </form>
            {openPopup && <CancellationForm cancelRef={cancelRef} refund={refund} remainingDates={remainingDates}/>}
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>  
        </div>
    </section>
  )
}

export default Cancel;
