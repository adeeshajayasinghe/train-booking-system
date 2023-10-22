const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

const configFile = require('./startup/config');
configFile.checkConfig(process.env.JWT_PRIVATE_KEY);

const router1 = require('./Routes/users');
const router2 = require('./Routes/auth');
const router3 = require('./Routes/trains');
const router4 = require('./Routes/search');
const router5 = require('./Routes/popupform');
const router6 = require('./Routes/booking');
const router7 = require('./Routes/cancel');
const router8 = require('./Routes/qrcode');
const router9 = require('./Routes/ticket');
const router10 = require('./Routes/profile');
const router11 = require('./Routes/contact');


// Connect to monogoDB
mongoose.connect(process.env.DATABASE_CONNECTION_STRING);

// Middlewares
app.use(express.json());
app.use(cors());
app.use('/register', router1);
app.use('/login', router2);
app.use('/trains', router3);
app.use('/search', router4);
app.use('/popupform', router5);
app.use('/booking', router6);
app.use('/refund', router7);
app.use('/qrcode', router8);
app.use('/sendTicket', router9);
app.use('/profile', router10);
app.use('/contact', router11);


app.listen(4000, () => {
    console.log('Server is running on port 4000');
});