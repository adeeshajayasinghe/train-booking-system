const nodemailer = require('nodemailer');
require('dotenv').config();
const SendOTP = async (email, subject, text) => {
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
        subject:subject,
        text:'OTP verification for the password reset!',
        html: `
        <h2>Did you forget your password? Don't worry we are here to help you!</h2>
        <p>Please use this OTP to proceed.</p>
        <h3>${text}</h3>
        `
    });
    console.log('Email sent successfully');
    }catch(error){
        console.log('Error sending email:',error.message);
    }
};

module.exports = SendOTP;