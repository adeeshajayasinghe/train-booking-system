const mongoose = require('mongoose');
const Joi = require('joi');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 1,
        maxlenght: 255
    },
    lastName: {
        type: String,
        required: true,
        minlength: 1,
        maxlenght: 255
    },
    mobile: {
        type: String,
        required: true,
        minlength: 10,
        maxlenght: 10
    },
    NIC: {
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
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    verified: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('Users', UserSchema);

function validateGenre(user){
    const schema = Joi.object({
        firstName: Joi.string().min(1).max(255).required(),
        lastName: Joi.string().min(1).max(255).required(),
        mobile: Joi.string().min(10).max(10).required(),
        NIC: Joi.string().min(10).max(10).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(8).max(255).required()
    });
    return schema.validate(user);
};

module.exports.User = User;
module.exports.validate = validateGenre;