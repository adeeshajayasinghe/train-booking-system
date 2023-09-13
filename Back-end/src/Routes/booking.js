const express = require('express');
const router = express.Router();
const {Booking, validate} = require('../Models/Booking');
const _ = require('lodash');

function generateRef() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');
  
    const formattedDate = `${year}${month}${day}`;
    const formattedTime = `${hour}${minute}${second}`;
    const referenceNumber = `TBS/${formattedDate}/${formattedTime}`;
  
    return referenceNumber;
  }


router.post('/', async (req, res) => {
    
    const {error} = validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    let Ref_no = generateRef();
    req.body.ReferenceNo = Ref_no;
    // let booking = new Booking(_.pick(req.body, ['firstName', 'lastName', 'mobile', 'email', 'NIC','passengerCount','trainName','from','to','date']));
    let booking = new Booking(_.pick(req.body, ['ReferenceNo','firstName', 'lastName', 'mobile', 'email', 'NIC', 'passengerCount', 'trainName', 'trainNo', 'from', 'to', 'date', 'price', 'seat_numbers', 'class', 'timeFrom', 'timeTo','Status']));
    await booking.save();
    // res.status(200).send("successfully booked!");
    res.status(200).send(Ref_no);
})

router.post('/valid', async (req, res) => {
    const {error} = validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    return;
})

module.exports = router;