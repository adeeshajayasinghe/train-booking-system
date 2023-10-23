const mongoose = require('mongoose');
const Joi = require('joi');

const RouteSchema = new mongoose.Schema({
    prices: {
        type: [[Number]],
        required: true
    },
    routeNo: {
        type: Number,
        required: true
    },
    name:{
        type:String,
        required:true
    }
});

const Route = mongoose.model('Routes', RouteSchema);

function validateRoute(route){
    const schema = Joi.object({
        prices: Joi.array().items(Joi.array().items(Joi.number())).required(),
        routeNo: Joi.number().required(),
        name:Joi.string().required()
    });
    return schema.validate(route);
};

module.exports.Route = Route;
module.exports.validate = validateRoute;
