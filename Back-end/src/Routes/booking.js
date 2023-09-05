const express = require('express');
const router = express.Router();
const {Booking, validateBooking} = require('../Models/Booking_History');
const _ = require('lodash');

// const auth = require('../Middlewares/auth');


// This is for get the user details for logged in user which has valid token. Password won't get.
// router.get('/me', auth, async (req, res) => {
//     const user = await User.findById(req.user._id).select('-password');
//     res.send(user);
// })

router.post('/', async (req, res) => {
    
    const {error} = validateBooking(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    console.log(req.body.firstName);
    let booking = new Booking(_.pick(req.body, ['firstName', 'lastName', 'mobile', 'email', 'NIC','passenger_count','trainName','from','to','date']));
    
   await booking.save();
  res.send("successfully booked!");
})

module.exports = router;
