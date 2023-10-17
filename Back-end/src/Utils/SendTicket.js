const nodemailer = require('nodemailer');
require('dotenv').config();
const SendTicket = async (email, qrCodeUrl, summary) => {
    try{
        const transporter = nodemailer.createTransport({
            host:process.env.EMAIL_HOST,
            service:process.env.EMAIL_SERVICE,
            port:Number(process.env.EMAIL_PORT),
            logger:Boolean(process.env.EMAIL_LOGGER),
            debug:Boolean(process.env.EMAIL_DEBUG),
            secureConnection:Boolean(process.env.EMAIL_SECURE_CONNECTION),
            secure:Boolean(process.env.EMAIL_SECURE),
            auth:{
                user:process.env.EMAIL_USERNAME,
                pass:process.env.EMAIL_PASSWORD
            },
            tls:{
                rejectUnAuthorized:Boolean(process.env.EMAIL_REJECT_UNAUTHORIZED)
            }
            
    });
    await transporter.sendMail({
        from:process.env.EMAIL_USERNAME,
        to:email,
        subject:'Train Booking Confirmation',
        text:'Thank you for booking your train!',
        attachments: [
            {
              filename: 'QRCode.png',
              path: qrCodeUrl
            }
        ],
        html: `
      <h2>Thank you for booking your train!</h2>
      <h3>Summary:</h3>
      <p>Reference No: ${summary.refNumber}</p>
      <p>Train No & Name: ${summary.trainNo} ${summary.trainName}</p>
      <p>Start Station: ${summary.from}</p>
      <p>End Station: ${summary.to}</p>
      <p>Departure Date: ${summary.date}</p>
      <p>Departs & Arrival: ${summary.timeFrom} & ${summary.timeTo}</p>
      <p>Passengers: ${summary.passengerCount}</p>
      <p>Train Class: ${summary.className}</p>
      <p>Booked Seats: ${summary.seats}</p>
      <p>Price: LKR ${summary.classPrice * summary.passengerCount}</p>
    `
    });
    console.log('Email sent successfully');
    }catch(error){
        console.log('Error sending email:',error.message);
    }
};

module.exports = SendTicket;