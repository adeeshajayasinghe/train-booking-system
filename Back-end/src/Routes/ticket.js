const express = require('express');
const router = express.Router();
const SendTicket = require('../Utils/SendTicket');

router.post('/', async (req, res) => {
    console.log("I'm in the ticket route")
    const { email, qrCodeUrl, summary } = req.body;

    await SendTicket(email, qrCodeUrl, summary);
  
    res.json({ message: 'Email sent successfully' });
});

module.exports = router;