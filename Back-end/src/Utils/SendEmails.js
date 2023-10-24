const nodemailer = require('nodemailer');
require('dotenv').config();
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { Link } = require('react-router-dom'); // Assuming you have React Router for the Link component

const EmailContent = ({ text }) => (
  <div>
    <h2>Thank you for registering with our system!</h2>
    <p>Please click the link below to verify your email address.</p>
    <Link to={text}>Click here</Link>
  </div>
);

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      service: process.env.EMAIL_SERVICE,
      port: Number(process.env.EMAIL_PORT),
      logger: Boolean(process.env.EMAIL_LOGGER),
      debug: Boolean(process.env.EMAIL_DEBUG),
      secureConnection: Boolean(process.env.EMAIL_SECURE_CONNECTION),
      secure: Boolean(process.env.EMAIL_SECURE),
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnAuthorized: Boolean(process.env.EMAIL_REJECT_UNAUTHORIZED),
      },
    });

    // Render the React component to an HTML string
    const emailHTML = ReactDOMServer.renderToStaticMarkup(
      <EmailContent text={text} />
    );

    await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: subject,
      text: 'Thank you for registering with our system!',
      html: emailHTML,
    });

    console.log('Email sent successfully');
  } catch (error) {
    console.log('Error sending email:', error.message);
  }
};

module.exports = sendEmail;
