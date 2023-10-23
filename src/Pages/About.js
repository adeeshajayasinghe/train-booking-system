import React, { useState, useEffect } from 'react';
import { Container, Paper, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const About = () => {
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', subject: '', message: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if(message){
        setErrorMessage(false);
        setOpen(false);
    }
    if(errorMessage){
        setOpen(false);
    }
  }, [message, errorMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await axios.post('https://stage-pilot-train-booking-system.onrender.com/contact/send-email', formData);
      setMessage("Email sent successfully");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      }
    }
  };

  return (
    <section className='hero'>
      <Container maxWidth="sm" style={{marginTop: '9rem'}}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Contact Us
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              size="small"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              margin="normal"
            />
            <TextField
              label="Email"
              variant="outlined"
              size="small"
              fullWidth
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              margin="normal"
            />
             <TextField
                label="Mobile Number" // Add a mobile number field
                variant="outlined"
                size="small"
                fullWidth
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                margin="normal"
              />
            <TextField
              label="subject"
              variant="outlined"
              size="small"
              fullWidth
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              margin="normal"
            />
            <TextField
              label="Message"
              variant="outlined"
              size="small"
              fullWidth
              multiline
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              margin="normal"
            />
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            {message && <Alert severity="success">{message}</Alert>}
            <Button variant="contained" color="primary" type="submit" onClick={() => setOpen(true)}>
              Submit
            </Button>
            <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                >
                    <CircularProgress color="inherit" />
            </Backdrop>
          </form>
        </Paper>
      </Container>
    </section>
    
  );
};

export default About;
