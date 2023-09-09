const express = require('express');
const router = express.Router();
const {Booking, validate} = require('../Models/Booking');
const _ = require('lodash');


router.post('/', async (req, res) => {
    
    const {error} = validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    let booking = new Booking(_.pick(req.body, ['firstName', 'lastName', 'mobile', 'email', 'NIC','passengerCount','trainName','from','to','date']));
    
    await booking.save();
    res.status(200).send("successfully booked!");
})

router.post('/valid', async (req, res) => {
    const {error} = validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    return;
})

module.exports = router;