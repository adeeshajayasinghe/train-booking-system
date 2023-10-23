import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Paper, Typography } from '@mui/material';


const ViewHistory = () => {
  const [bookingHistories, setBookingHistories] = useState([]);
  const userEmail = window.localStorage.getItem('userEmail'); 
  
  useEffect(() => {
    if (userEmail) {
      const fetchBookingHistories = async () => {
        try {
          const response = await axios.get(`https://stage-pilot-train-booking-system.onrender.com/profile/history/${userEmail}`);
          setBookingHistories(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchBookingHistories();
    }
  }, []);

  return (
    <div>
      <Typography variant="h4" style={{textAlign: "center", paddingTop: "2rem", textTransform: "none"}}>Booking History for {userEmail}</Typography>
      {bookingHistories.length === 0 ? (
        <Typography variant="body1">No booking history found.</Typography>
      ) : (
        <Grid container spacing={2} style={{padding: "2rem"}}>
          {bookingHistories.map((booking) => (
            <Grid item xs={12} sm={6} key={booking._id}>
              <Paper elevation={3}  style={{
                  background: '#0077b6',
                  padding: '30px',
                }}>
                <Typography variant="body1" style={{color: "white"}}>Reference No:<span style={{marginRight: "1rem"}} /> {booking.ReferenceNo}</Typography>
                <Typography variant="body1" style={{color: "white"}}>Origin:<span style={{marginRight: "4.6rem"}} /> {booking.from}</Typography>
                <Typography variant="body1" style={{color: "white"}}>Destination:<span style={{marginRight: "2.13rem"}} />   {booking.to}</Typography>
                <Typography variant="body1" style={{color: "white"}}>Train Name:<span style={{marginRight: "1.9rem"}} />    {booking.trainName}</Typography>
                <Typography variant="body1" style={{color: "white"}}>Passengers:<span style={{marginRight: "1.85rem"}} />    {booking.passengerCount}</Typography>
                <Typography variant="body1" style={{color: "white"}}>Date:<span style={{marginRight: "5.1rem"}} />          {booking.date}</Typography>
                <Typography variant="body1" style={{color: "white"}}>Status:<span style={{marginRight: "4.4rem"}} />        {booking.Status}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  )
}

export default ViewHistory