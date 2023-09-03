const mongoose = require('mongoose');
const Joi = require('joi');
const { Int32 } = require('mongodb');

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
    }
    // isAdmin: {
    //     type: Boolean,
    //     required: true
    // }
});

const Booking = mongoose.model('Booking_History', UserSchema);

function validateBooking(user){
    const schema = Joi.object({
        firstName: Joi.string().min(5).max(255).required(),
        lastName: Joi.string().min(5).max(255).required(),
        mobile: Joi.string().min(10).max(10).required(),
        email: Joi.string().required().email(),
        NIC:Joi.string().required().min(10).max(12),
        passenger_count:Joi.required()
        // isAdmin: Joi.boolean().required()
    });
    return schema.validate(user);
};

module.exports.User = Booking;
module.exports.validate = validateBooking;