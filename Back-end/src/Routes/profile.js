const express = require('express');
const router = express.Router();
const { User } = require('../Models/User');
const { Booking } = require('../Models/Booking');

router.get('/:email', async (req, res) => {
    const { email } = req.params;
  
    try {
      const user = await User.findOne({ email }); 
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Respond with the user details
      res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        mobile: user.mobile,
        nic: user.NIC,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.put('/update/:email', async (req, res) => {
    const { email } = req.params;
    const { firstName, lastName, mobile, nic } = req.body;
  
    try {
      const updatedUser = await User.findOneAndUpdate(
        { email },
        { firstName, lastName, mobile, nic },
        { new: true } // Return the updated user
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Respond with the updated user data
      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.get('/history/:email', async (req, res) => {
    const { email } = req.params;
  
    try {
      const bookingHistories = await Booking.find({ email });
  
      if (bookingHistories.length === 0) {
        return res.status(404).json({ message: 'No booking history found for this user.' });
      }
  
      res.json(bookingHistories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;