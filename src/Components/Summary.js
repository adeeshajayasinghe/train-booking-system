import React from 'react'
import { useContext, useEffect, useState } from 'react'
import {AppContext} from '../context'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

const Summary = () => {
    const {refNumber, openPopup, handlePopup, trainName, trainNo, from, to, date, timeFrom, timeTo, passengerCount, className, classPrice, seatNumbers} = useContext(AppContext);
    const [qrCodeUrl, setQRCodeUrl] = useState('');
    const seats = seatNumbers.join(', ');

    // fetch the qr code
    useEffect(() => {
        const generateQRCode = async () => {
            try {
              const data = [refNumber, trainName, trainNo, from, to, date, timeFrom, timeTo, passengerCount, className, classPrice, seats]
              const response = await axios.post('http://localhost:4000/qrcode', { data });
              setQRCodeUrl(response.data.qrCode);
            } catch (error) {
              console.error('Error generating QR code:', error);
            }
          };
        generateQRCode();
    }, []);
  return (
    <Dialog open={openPopup}>
        <DialogTitle className='success-icon'>Payment Successfull!</DialogTitle>
        <DialogContent>
            <div className='success-icon'>
            {qrCodeUrl && (
                <img src={qrCodeUrl} alt="QR Code" className="qr-code-image" />
            )}
            </div>
            <div className='summary-wrapper'>
                <div>
                    <p>Reference No</p>
                </div>
                <div>
                    <p className='summary-txt'>{refNumber}</p>
                </div>
            </div>
            <div className='summary-wrapper'>
                <div>
                    <p>Train No & Name</p>
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
                    <p className='summary-txt'>LKR {classPrice * passengerCount}</p>
                </div>
            </div>
            <div className='sumary-submit-btn'>
                <DialogActions>
                    <Button>Download</Button>
                </DialogActions>
                <DialogActions>
                    <Button onClick={()=>{handlePopup(false)}}>Cancel</Button>
                </DialogActions>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default Summary;
