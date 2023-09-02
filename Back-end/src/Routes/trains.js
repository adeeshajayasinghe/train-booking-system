const express = require('express');
const router = express.Router();
const {Train, validate} = require('../Models/Train');


router.get('/:id', async (req, res) => {
    const train = await Train.findById(req.params.id);
    if (!train) return res.status(404).send('The train with the given ID was not found.');
    res.send(train);
});

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

router.put('/:id', async (req, res) => {
    // const {error} = validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    const train = await Train.findByIdAndUpdate(req.params.id, {
        $set: {
            seatsArrangement: req.body.updatedData
        }
    }, {new: true});

    if (!train) return res.status(404).send('The train with the given ID was not found.');
    res.send(train);
});

module.exports = router;