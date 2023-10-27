const mongoose = require('mongoose');
const Joi = require('joi');


const BookingSchema = new mongoose.Schema({
    ReferenceNo: {
        type: String,
        default: "",
    },
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
        required: true
    },
    NIC: {
        type: String,
        required: true,
        minlength:10,
        maxlength: 10
    },
    passengerCount: {
        type: Number,
        required: true
    },
    // trainNo: {
    //     tryp: Number,
    //     required: true
    // },
    trainName:{
        type:String,
        required:true
    },
    from:{
        type:String,
        required:true 
    },
    to:{
        type:String,
        required:true
    },
    date:{
        type: String,
        required:true
    },
    price:{
        type: String,
        required:true
    },
    seat_numbers: {
        type: Array,
        required:true
    },
    class: {
        type: String,
        required:true
    },
    timeFrom: {
        type: String,
        required:true
    },
    timeTo: {
        type: String,
        required:true
    },
    Status: { 
        type: String,
        default: "Pending",
    }

});

const Booking = mongoose.model('BookingHistory', BookingSchema);
function validateBooking(booking){
    const schema = Joi.object({
        firstName: Joi.string().min(5).max(255).required(),
        lastName: Joi.string().min(5).max(255).required(),
        mobile: Joi.string().min(10).max(10).required(),
        email: Joi.string().required().email(),
        NIC:Joi.string().required().min(10).max(10),
        passengerCount:Joi.required(),
        trainName:Joi.string().required(),
        from:Joi.string().required(),
        to:Joi.string().required(),
        date:Joi.string().required(),
        price:Joi.string().required(),
        seat_numbers:Joi.array().required(),
        class:Joi.string().required(),
        timeFrom:Joi.string().required(),
        timeTo:Joi.string().required()

    });
    return schema.validate(booking);
};

module.exports.Booking = Booking;
module.exports.validate = validateBooking;