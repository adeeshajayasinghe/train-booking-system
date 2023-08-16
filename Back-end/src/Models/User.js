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
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
    // isAdmin: {
    //     type: Boolean,
    //     required: true
    // }
});

const User = mongoose.model('Users', UserSchema);

function validateGenre(user){
    const schema = Joi.object({
        firstName: Joi.string().min(5).max(255).required(),
        lastName: Joi.string().min(5).max(255).required(),
        mobile: Joi.string().min(10).max(10).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(8).max(255).required()
        // isAdmin: Joi.boolean().required()
    });
    return schema.validate(user);
};

module.exports.User = User;
module.exports.validate = validateGenre;