const express = require('express');
const Joi = require('joi');
const router = express.Router();
const {Station} = require('../Models/Station');
const {Route} = require('../Models/Route');
const {Train} = require('../Models/Train');
const { get } = require('lodash');

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    // const routeNumbers = db.stations.find(
    //     { station: { $in: [routeFrom, routeTo] } },
    //     { route: 1 }
    //   ).toArray();

    // Get Route Numbers for From and To Stations
    const routeNumbers = await Station.find({ station: { $in: [req.body.from, req.body.to] } });
    // Get the class prices that belongs to origin and destinatio
    const originClassPrices = routeNumbers[0].prices;
    const destinationClassPrices = routeNumbers[1].prices;
    // Get the route that belongs to origin and destination
    const route = routeNumbers[0].route_id;
    // Fetch the route from the database
    // Calculate the prices of three classes
    const routeDetails = await Route.findOne({ routeNo: route });
    const firstClassPriceIndex = Math.abs(parseInt(routeDetails.prices[0].indexOf(destinationClassPrices[0])) - parseInt(routeDetails.prices[0].indexOf(originClassPrices[0])));
    const secondClassPriceIndex = Math.abs(parseInt(routeDetails.prices[1].indexOf(destinationClassPrices[1])) - parseInt(routeDetails.prices[1].indexOf(originClassPrices[1])));
    const thirdClassPriceIndex = Math.abs(parseInt(routeDetails.prices[2].indexOf(destinationClassPrices[2])) - parseInt(routeDetails.prices[2].indexOf(originClassPrices[2])));
    const firstClassPrice = routeDetails.prices[0][firstClassPriceIndex];
    const secondClassPrice = routeDetails.prices[1][secondClassPriceIndex];
    const thirdClassPrice = routeDetails.prices[2][thirdClassPriceIndex];
    const classPrices = [firstClassPrice, secondClassPrice, thirdClassPrice];
    // Filter Trains by Route
    const trains = await Train.find({ routes: { $all: [routeNumbers[0].route_id, routeNumbers[1].route_id] } });
    const filteredTrains = trains.filter(train =>
        train.stations.includes(req.body.from) && train.stations.includes(req.body.to)
      );
    // Filter Trains by Date and Type
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const inputDate = new Date(req.body.date);
    const dayName = dayNames[inputDate.getDay()];

    const filteredTrainsByDate = filteredTrains.filter(train =>{
        if (dayName === 'Saturday' || dayName === 'Sunday') {
            return train.dates.includes('Daily') || train.dates.includes('Weekends');
        } else {
            return train.dates.includes('Daily') || train.dates.includes('Weekdays');
        }
    });
    res.json([filteredTrainsByDate, classPrices]);
})



function validate(train){
    const schema = Joi.object({
        from: Joi.string().required(),
        to: Joi.string().required(),
        date: Joi.string().required(),
        passengers: Joi.number().required(),
        returnDate: Joi.string().optional()
    });
    return schema.validate(train);
};

module.exports = router;