import React from 'react'
import { useContext, useState, useEffect } from 'react'
import {AppContext} from '../context'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
const CancellationForm = ({cancelRef, refund, remainingDates}) => {


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
            {/* <div className='summary-wrapper'>
                <div>
                    <p>Train Name</p>
                </div>
                <div>
                    <p className='summary-txt'>{bookingData.trainName}</p>
                </div>
            </div>
            <div className='summary-wrapper'>
                <div>
                    <p>Start Station</p>
                </div>
                <div>
                    <p className='summary-txt'>{bookingData.from}</p>
                </div>
            </div>
            <div className='summary-wrapper'>
                <div>
                    <p>End Station</p>
                </div>
                <div>
                    <p className='summary-txt'>{bookingData.to}</p>
                </div>
            </div>
            <div className='summary-wrapper'>
                <div>
                    <p>Daparture Date</p>
                </div>
                <div>
                    <p className='summary-txt'>{bookingData.date}</p>
                </div>
            </div>
            <div className='summary-wrapper'>
                <div>
                    <p>Departs & Arrival</p>
                </div>
                <div>
                    <p className='summary-txt'>{bookingData.timeFrom} & {bookingData.timeTo}</p>
                </div>
            </div>
            <div className='summary-wrapper'>
                <div>
                    <p>Passengers</p>
                </div>
                <div>
                    <p className='summary-txt'>{bookingData.passengerCount}</p>
                </div>
            </div>
            <div className='summary-wrapper'>
                <div>
                    <p>Train Class</p>
                </div>
                <div>
                    <p className='summary-txt'>{bookingData.class}</p>
                </div>
            </div>
            <div className='summary-wrapper'>
                <div>
                    <p>Booked Seats</p>
                </div>
                <div>
                    <p className='summary-txt'>{seats}</p>
                </div>
            </div>
            <div className='summary-wrapper'>
                <div>
                    <p>Price</p>
                </div>
                <div>
                    <p className='summary-txt'>LKR {parseInt(bookingData.classPrice) * bookingData.passengerCount}</p>
                </div>
            </div> */}
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
            <div className='sumary-submit-btn'>
                <DialogActions>
                    <Button onClick={()=>{handlePopup(false)}}>Cancel</Button>
                </DialogActions>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default CancellationForm;