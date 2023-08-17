const express = require('express');
const router = express.Router();
const {Train, validate} = require('../Models/Train');


router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    let train = await Train.findOne({trainNo:req.body.trainNo});
    if (train) {
        return res.status(400).json({ error: 'Train is already added!' });
    } 

    train = new Train({
        trainName: req.body.trainName,
        origin: req.body.origin,
        destination: req.body.destination,
        trainNo: req.body.trainNo,
        routes: req.body.routes,
        dates: req.body.dates,
        stations: req.body.stations,
        arrivalTimes: req.body.arrivalTimes,
        departureTimes: req.body.departureTimes,
        class: req.body.class,
        seatsAvailability: req.body.seatsAvailability,
        seatsArrangement: req.body.seatsArrangement
    })
    train = await train.save();

});

module.exports = router;