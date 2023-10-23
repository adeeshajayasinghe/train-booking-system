const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');


router.post('/', async (req, res) => {
    try {
      const data = req.body.data;
      // Convert the array to a string.
      const text = data.join('\n'); // Use '\n' to separate elements
      // Generate the QR code
      const qrCode = await QRCode.toDataURL(text);
  
      res.json({ qrCode });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while generating the QR code.' });
    }
  });

  module.exports = router;