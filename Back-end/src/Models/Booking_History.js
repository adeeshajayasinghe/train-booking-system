const mongoose = require('mongoose');
const Joi = require('joi');


const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 5,
        maxlenght: 255
    },
    lastName: {
        type: String,
        required: true,
        minlength: 5,
        maxlenght: 255
    },
    mobile: {
        type: String,
        required: true,
        minlength: 10,
        maxlenght: 10
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    NIC: {
        type: String,
        required: true,
        minlength:10,
        maxlength: 12
    },
    passenger_count: {
        type: Number,
        required: true
    },
    trainName:{
        type:String,
        require:true
    },
    from:{
        type:String,
        require:true 
    },
    to:{
        type:String,
        require:true
    },
    date:{
        type: Joi.date(),
        require:true
    }

});

const Booking = mongoose.model('Booking_History', UserSchema);

function validateBooking(user){
    const schema = Joi.object({
        firstName: Joi.string().min(5).max(255).required(),
        lastName: Joi.string().min(5).max(255).required(),
        mobile: Joi.string().min(10).max(10).required(),
        email: Joi.string().required().email(),
        NIC:Joi.string().required().min(10).max(12),
        passenger_count:Joi.required(),
        trainName:Joi.string().required(),
        from:Joi.string().required(),
        to:Joi.string().required(),
        date:Joi.date().required()

    });
    return schema.validate(user);
};

module.exports.Booking = Booking;
module.exports.validateBooking = validateBooking;
