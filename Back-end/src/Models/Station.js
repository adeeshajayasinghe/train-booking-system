const mongoose = require('mongoose');
const Joi = require('joi');
const { Int32 } = require('mongodb');

const StationSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    station: {
        type: String,
        required: true
    },
    prices: {
        type: [Number],
        required: true
    },
    route_id: {
        type: Number,
        required: true
    }
});

const Station = mongoose.model('stations', StationSchema);

function validateStation(station){
    const schema = Joi.object({
        _id: Joi.number().required(),
        station: Joi.string().required(),
        prices: Joi.array().items(Joi.number()).required(),
        route_id: Joi.number().required()
    });
    return schema.validate(station);
};

module.exports.Station = Station;
module.exports.validate = validateStation;