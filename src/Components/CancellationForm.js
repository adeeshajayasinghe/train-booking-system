import React from 'react'
import { useContext, useState, useEffect } from 'react'
import {AppContext} from '../context'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import Alert from '@mui/material/Alert';
const CancellationForm = ({cancelRef, refund, remainingDates}) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');
  const cancelBooking = async () => {
    try {
        await axios.post('http://localhost:4000/refund/cancel-booking', 
            {ReferenceNo: cancelRef},
        );
        setMessage('Booking cancelled successfully.');
    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            handlePopup(false);
            setErrorMessage(error.response.data.error);
        }
    }
  }
  const {openPopup, handlePopup} = useContext(AppContext);
  return (
    <Dialog open={openPopup}>
        <DialogTitle className='success-icon'>Booking Details</DialogTitle>
        <DialogContent>
            <div className='summary-wrapper'>
                <div>
                    <p>Reference No</p>
                </div>
                <div>
                    <p className='summary-txt'>{cancelRef}</p>
                </div>
            </div>
            <div className='summary-wrapper'>
                <div>
                    <p>Remaining Days</p>
                </div>
                <div>
                    <p className='summary-txt'>{remainingDates}</p>
                </div>
            </div>
            <div className='summary-wrapper'>
                <div>
                    <p>Refund Amount</p>
                </div>
                <div>
                    <p className='summary-txt'>LKR {refund}</p>
                </div>
            </div>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            {message && <Alert severity="success">{message}</Alert>}
            <div className='sumary-submit-btn'>
                <DialogActions>
                    <Button onClick={()=>{
                        cancelBooking();
                    }}>Confirm</Button>
                    <Button onClick={()=>{
                        handlePopup(false)
                    }}>Close</Button>
                </DialogActions>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default CancellationForm;