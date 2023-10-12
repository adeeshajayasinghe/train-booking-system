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
        // mobile: Joi.string().min(10).max(10).required(),
        mobile: Joi.string()
            .min(10)
            .max(10)
            .required()
            .custom((value, helpers) => {
                // Check if the value is a numeric string
                if (!/^\d+$/.test(value)) {
                    return helpers.message('Mobile must be a numeric string of 10 digits');
                }
                return value;
        }),
        // NIC: Joi.string().min(10).max(10).required(),
        NIC: Joi.string()
            .required()
            .custom((value, helpers) => {
                // Check if the value is either 10 digits or 9 digits with the last character as 'v'
                if (!/^\d{9}(\d|v)$/i.test(value)) {
                    return helpers.message('Please enter a valid NIC');
                }
                return value;
            }),
        email: Joi.string().required().email(),
        password: Joi.string().min(8).max(255).required()
    });
    return schema.validate(user);
};

module.exports.User = User;
module.exports.validate = validateGenre;