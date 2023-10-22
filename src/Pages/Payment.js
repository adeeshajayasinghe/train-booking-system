import React, { useState } from 'react';
import Paymentimg from '../images/Payments.png';
import visacard from '../images/visa.png';
import mastercard from '../images/master.png';
import Button from '@mui/material/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import { AppContext } from '../context';
import { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Summary from '../Components/Summary';

const Payment = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const {classPrice, passengerCount, fullArray, clickedSeats, classIndex, seatingData, trainID, handleClickedSeats, handlePopup} = useContext(AppContext);
  const navigate = useNavigate();
  const handleCardSelect = (cardType) => {
    setSelectedCard(cardType);
  };
  const cardStyles = (cardType) => {
    return {
      border: selectedCard === cardType ? '2px solid #007bff' : '2px solid transparent',
    };
  };

  const handlePay = () => {
    const updatedFullArray = fullArray;
    updatedFullArray[classIndex] = seatingData;
    axios
      .put(`http://localhost:4000/trains/${trainID}`, { updatedData: updatedFullArray })
      .then((response) => {
        console.log('Data updated successfully:', response.data);
        handleClickedSeats([]); // Clear clicked seats
        // setSubmitted(true); // Mark the form as submitted
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
      handlePopup(true);
  };

  const handleCancel = () => {
    navigate('/seatview');
  }

  return (
    <section className='hero'>
      <div className='hero-center'>
        <article className='hero-info'>
          <br />
          <br />
          <br />
          <br />
          <h2>Payment Gateway</h2>
          <p>Make your payment here with secure.</p>
          <article className='hero-images'>
            <img src={Paymentimg} className='login-img' alt='Payment-image' />
          </article>
        </article>
        <form className='review-reg'>
          <p>Select your card type</p>
          <div className="payment-card-options">
            <div>
              <img src={visacard} alt="Visa"  className="payment-card"
              style={cardStyles('visa')}
              onClick={() => handleCardSelect('visa')}/>
            </div>
            <div>
              <img src={mastercard} alt="Mastercard" className="payment-card"
              style={cardStyles('mastercard')}
              onClick={() => handleCardSelect('mastercard')}/>
            </div>
          </div>
          <FormControl sx={{ width: 460, ml:2.9}}>
            <FormLabel>Card Number</FormLabel>
            <Input placeholder="0000-0000-0000-0000" variant="soft"/>
          </FormControl>
          <div className='route'>
                <div className='origin'>
                    <FormControl>
                        <FormLabel>Expiry</FormLabel>
                        <Input placeholder="MM/YY" variant="soft"/>
                    </FormControl>
                </div>
                <div className='dest'>
                    <FormControl>
                        <FormLabel>CVC</FormLabel>
                        <Input placeholder="CVC" variant="soft" type='password'/>
                    </FormControl>
                </div>
            </div>
            <p>Total payment: LKR {classPrice * passengerCount}</p>
          <Button sx={{
                    width: 170,
                    height: 40,
                    borderRadius: '5px',
                    margin: '0 10px 10px 0', 
                  }}
                  variant='contained'
                  onClick={()=> handlePay()}
                  >
                Pay Now
          </Button>
          <Button sx={{
                    width: 170,
                    height: 40,
                    borderRadius: '5px',
                    margin: '0 10px 10px 0', 
                  }}
                  variant='outlined' 
                  onClick={handleCancel}
                  >
                Cancel
              </Button>
      </form>
      <Summary />
      </div>
    </section>
  )
}

export default Payment;