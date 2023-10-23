const mongoose = require('mongoose');
const Joi = require('joi');

const TrainSchema = new mongoose.Schema({
    trainName: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    trainNo: {
        type: Number,
        required: true
    },
    routes: {
        type: [Number],
        required: true
    },
    dates: {
        type: String,
        enum: ['Daily', 'Weekdays', 'Weekends'],
        required: true
    },
    stations: {
        type: [String],
        required: true
    },
    arrivalTimes: {
        type: [String],
        required: true
    },
    departureTimes: {
        type: [String],
        required: true
    },
    class: {
        type: [String],
        enum: ["First Class", "Second Class", "Third Class"],
        required: true,
    },
    seatsAvailability: {
        type: [Number],
        required: true
    },
    seatsArrangement: {
        type: [[Number]],
        required: true
    }
});

const Train = mongoose.model('Trains', TrainSchema);


function validateTrain(train){
    const schema = Joi.object({
        trainName: Joi.string().required(),
        origin: Joi.string().required(),
        destination: Joi.string().required(),
        trainNo: Joi.number().required(),
        routes: Joi.array().items(Joi.number()).required(),
        dates: Joi.string().valid('Daily', 'Weekdays', 'Weekends').required(),
        stations: Joi.array().items(Joi.string()).required(),
        arrivalTimes: Joi.array().items(Joi.string().pattern(/^([01]\d|2[0-3]):[0-5]\d$/)).required(),
        departureTimes: Joi.array().items(Joi.string().pattern(/^([01]\d|2[0-3]):[0-5]\d$/)).required(),
        class: Joi.array().items(Joi.string()).required(),
        seatsAvailability: Joi.array().items(Joi.number()).required(),
        seatsArrangement: Joi.array().items(Joi.array().items(Joi.number().valid(0, 1))).required()
    });
    return schema.validate(train);
};

module.exports.Train = Train;
module.exports.validate = validateTrain;