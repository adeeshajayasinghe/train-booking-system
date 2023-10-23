const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config');
require('dotenv').config();
const { Booking } = require('./Models/Booking');

const app = express();

const configFile = require('./startup/config');
configFile.checkConfig(config.get('privateKey'));

const router1 = require("./Routes/users");
const router2 = require("./Routes/auth");
const router3 = require("./Routes/trains");
const router4 = require("./Routes/search");
const router5 = require("./Routes/popupform");
const router6 = require("./Routes/booking");
const router7 = require("./Routes/cancel");
const router8 = require("./Routes/qrcode");
const router9 = require("./Routes/ticket");
const router10 = require("./Routes/profile");
const router11 = require("./Routes/contact");

// Connect to monogoDB
mongoose.connect(process.env.DATABASE_CONNECTION_STRING);

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/register", router1);
app.use("/login", router2);
app.use("/trains", router3);
app.use("/search", router4);
app.use("/popupform", router5);
app.use("/booking", router6);
app.use("/refund", router7);
app.use("/qrcode", router8);
app.use("/sendTicket", router9);
app.use("/profile", router10);
app.use("/contact", router11);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});

const schedule = require("node-schedule");

async function performTask() {
    // Your task logic (e.g., updating database records)
    // Get the current date
    const today = new Date();

    // Subtract one day from the current date
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // Extract year, month, and day components from the date object
    const year = yesterday.getFullYear();
    const month = String(yesterday.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(yesterday.getDate()).padStart(2, "0");

    // Output the date of yesterday in the format YYYY-MM-DD
    const formattedDate = `${year}-${month}-${day}`;
    //console.log(formattedDate);
    

  const result = await Booking.updateMany(
   { date: { $lt: formattedDate }, Status: "Pending" }, // Query to match documents
   { $set: { Status: "Canceled" } } // Update to set the Status field to "Canceled"
);
      
    console.log(result);
  console.log("Task executed.");
}

// Schedule the task to run every day at a specific time (e.g., 2:00 AM)
const job = schedule.scheduleJob("01 2 * * *", function () {
   performTask();
});
