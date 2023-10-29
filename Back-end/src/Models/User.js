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
        maxlenght: 12
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
        mobile: Joi.string()
            .min(10)
            .max(10)
            .required()
            .custom((value, helpers) => {
                if (!/^\d+$/.test(value)) {
                    return helpers.message('Mobile number must be 10 digits long');
                }
                return value;
        }),
        NIC: Joi.string()
            .custom((value, helpers) => {
                if (!/^(\d{9}v|\d{12})$/i.test(value)) {
                    return helpers.error('any.custom');
                }
                return value;
            })
            .messages({
                'any.custom': 'Please enter a valid NIC number.'
        }),
        email: Joi.string().required().email(),
        password: Joi.string().min(8).max(255).required()
    });
    return schema.validate(user);
};

module.exports.User = User;
module.exports.validate = validateGenre;
