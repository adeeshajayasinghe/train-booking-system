const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const router1 = require('./Routes/users');
const router2 = require('./Routes/auth');

// Connect to monogoDB
mongoose.connect('mongodb+srv://adeesha:gkp7ljvUc4uGCNCv@cluster0.dpisc3q.mongodb.net/train-ticket-bookings?retryWrites=true&w=majority');

// Middlewares
app.use(express.json());
app.use(cors());
app.use('/register', router1);
app.use('/login', router2);

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});