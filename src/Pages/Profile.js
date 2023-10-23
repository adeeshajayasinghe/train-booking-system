import React, { useState, useEffect } from 'react'
import { TextField, Button, Grid, Typography, Paper, Avatar, Box, FormControl } from '@mui/material'; // Updated import statement
import axios from 'axios';
import Alert from '@mui/material/Alert';

const Profile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [nic, setNic] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const userEmail = window.localStorage.getItem("userEmail");
      const response = await axios.get(`https://stage-pilot-train-booking-system.onrender.com/profile/${userEmail}`);
      const user = response.data;
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setMobile(user.mobile);
      setNic(user.nic);
    }
    fetchUser();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userEmail = window.localStorage.getItem("userEmail");
      await axios.put(`https://stage-pilot-train-booking-system.onrender.com/profile/update/${userEmail}`, {
        firstName,
        lastName,
        mobile,
        nic
      });
      setMessage('Profile updated successfully!');
    } catch(error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      }
    }
  }
  return (
    <Paper elevation={3} style={{ padding: '70px' }} className='hero2'>
      <Typography variant="h4" style={{ marginTop: '2rem' }}>Profile Settings</Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar src="https://images.unsplash.com/photo-1601233749202-95d04d5b3c00?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHByb2ZpbGUlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D&w=500" alt="User Avatar" style={{ width: '200px', height: '200px' }} />
          <Typography variant="h5" textAlign={'center'}>{firstName} {lastName}</Typography>
          <Typography variant="subtitle1" textAlign={'center'}>{window.localStorage.getItem("userEmail")}</Typography>
        </Box>
        </Grid>
        <Grid item xs={8}>
        <Box display="flex" flexDirection="column">
            <FormControl fullWidth>
              <TextField
                name="firstName"
                label="First Name"
                variant="outlined"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </FormControl>
            <FormControl fullWidth style={{ marginTop: '1rem' }}>
              <TextField
                name="lastName"
                label="Last Name"
                variant="outlined"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </FormControl>
            <FormControl fullWidth style={{ marginTop: '1rem' }}>
              <TextField
                name="mobile"
                label="Mobile"
                variant="outlined"
                value={mobile}
                onChange={(event) => setMobile(event.target.value)}
              />
            </FormControl>
            <FormControl fullWidth style={{ marginTop: '1rem', marginBottom: '1rem' }}>
              <TextField
                name="nic"
                label="NIC"
                variant="outlined"
                value={nic}
                onChange={(event) => setNic(event.target.value)}
              />
            </FormControl>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            {message && <Alert severity="success">{message}</Alert>}
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Profile