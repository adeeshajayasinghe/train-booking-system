const express = require('express');
const Joi = require('joi');
const router = express.Router();
const { Booking } = require('../Models/Booking'); // Import your Booking model


router.post('/', async (req, res) => {
  
  console.log(req.body);
  const referenceNo = req.body.ReferenceNo;
  console.log(referenceNo);
        
  if (!referenceNo) {
    return res.status(400).json({ message: 'ReferenceNo is required in the request body' });
  }

  const booking = await Booking.findOne({ ReferenceNo: referenceNo });  //find the booking by reference number

  if (booking.length === 0) {
    return res.status(404).json({ message: 'Booking not found! Enter a valid ref.no' });
  }
  if (booking.Status === "Cancelled") {
    return res.status(400).json({ message: 'Booking already cancelled' });
  }

  if (booking.Status === 'Completed') {
    return res.status(400).json({ message: 'Booking already completed' });
  }


 
  const bookdate = booking.date;  //gt the booked date
  const date = new Date();
  const today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();  //get today date

  // Parse the date strings into Date objects
  const date1 = new Date(bookdate);
  const date2 = new Date(today);

  // Calculate the difference in milliseconds
  const millisecondsDefference = date1 - date2;  //find the difference between two dates

  //convert milliseconds to days
  const daysDifference = Math.floor(millisecondsDefference / (1000 * 60 * 60 * 24)); //convert milliseconds to days
          

  let refund = 0;
  if (daysDifference >= 7) {
    refund = 0.75 * booking.price;
  }
  else if (daysDifference >= 2 && daysDifference < 7) {
    refund = 0.5 * booking.price;
  }
  else {
    refund = 0;
  }

  console.log(booking.price);
  //deducting the booking fee
  if (refund !== 0){
    refund = refund - booking.price * 0.03;
  }
  

  console.log(refund);


  console.log(`The difference in days is: ${daysDifference}`);
    
  const response = { refund: refund, daysRemaining: daysDifference, booking: booking };

   res.status(200).send(response);
  //res.send({ response });
}

);

// update the status with cancelled when user hit the cancel confirmation button
router.post('/cancel-booking', async (req, res) => {
  const { referenceNo } = req.body.ReferenceNo;

  // Update the document based on the referenceNo
  const result = await Booking.findOneAndUpdate(
    {ReferenceNo: referenceNo},
    { $set: { Status: 'Cancelled' } },
    { new: true }
  );
  res.json({ success: true, message: 'Booking cancelled successfully.' });
  // if (result.matchedCount === 1 && result.modifiedCount === 1) {
  //   res.json({ success: true, message: 'Booking cancelled successfully.' });
  // } else {
  //   res.status(500).json({ success: false, message: 'An error occurred while cancelling the booking.' });
  // }

  console.error('Error cancelling booking:');


  
});



module.exports = router;
