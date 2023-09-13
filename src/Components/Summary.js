import React from 'react'
import { useContext } from 'react'
import {AppContext} from '../context'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SuccessIcon from '../images/Success-icon.png';

const Summary = () => {
    const {openPopup, handlePopup, trainName, trainNo, from, to, date, timeFrom, timeTo, passengerCount, className, classPrice} = useContext(AppContext);
  return (
    <Dialog open={openPopup}>
        <DialogTitle className='success-icon'>Payment Successfull!</DialogTitle>
        <DialogContent>
            <div className='success-icon'>
                <img src={SuccessIcon} alt='Success'/>
            </div>
            <div className='summary-wrapper'>
                <div>
                    <p>Train</p>
                </div>
                <div>
                    <p className='summary-txt'>{trainNo} {trainName}</p>
                </div>
            </div>
            <div className='summary-wrapper'>
                <div>
                    <p>Start Station</p>
                </div>
                <div>
                    <p className='summary-txt'>{from}</p>
                </div>
            </div>
            <div className='summary-wrapper'>
                <div>
                    <p>End Station</p>
                </div>
                <div>
                    <p className='summary-txt'>{to}</p>
                </div>
            </div>
            <div className='summary-wrapper'>
                <div>
                    <p>Daparture Date</p>
                </div>
                <div>
                    <p className='summary-txt'>{date}</p>
                </div>
            </div>
            <div className='summary-wrapper'>
                <div>
                    <p>Departs & Arrival</p>
                </div>
                <div>
                    <p className='summary-txt'>{timeFrom} & {timeTo}</p>
                </div>
            </div>
            <div className='summary-wrapper'>
                <div>
                    <p>Passengers</p>
                </div>
                <div>
                    <p className='summary-txt'>{passengerCount}</p>
                </div>
            </div>
            <div className='summary-wrapper'>
                <div>
                    <p>Train Class</p>
                </div>
                <div>
                    <p className='summary-txt'>{className}</p>
                </div>
            </div>
            <div className='summary-wrapper'>
                <div>
                    <p>Price</p>
                </div>
                <div>
                    <p className='summary-txt'>LKR {classPrice * passengerCount}</p>
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

export default Summary;
