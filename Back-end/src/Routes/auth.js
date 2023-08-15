const express = require('express');
const Joi = require('joi');
const router = express.Router();
const {User} = require('../Models/User');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');


router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) {
        // return res.status(400).send(error.details[0].message);
        return res.status(400).json({ error: error.details[0].message });
    }

    // Get the user by email
    let user = await User.findOne({email: req.body.email});
    if (!user) {
        // return res.status(400).send('Incorrect email or password!')
        return res.status(400).json({ error: 'Incorrect email or password!' });
    }

    // Check for the password decrypting the user input. 
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        // res.status(400).json({ error: 'Incorrect email or password!' });
        return res.status(400).json({ error: 'Incorrect email or password!' });
    }

    /*After logged in server sends a token to the user. Usign this don't need to query the database for some details (like email which is 
        included in the payload) in the next time that user trying to log in.
        First para: payload, second para: Private key(shouldn't be hard coded in the source code like this. This use to identify the user by 
        the server from the token)*/
    // In powershell use $env:variablename = "value" to set environment variables. 'set' will not work.
   const token = jwt.sign({_id:user._id, isAdmin:user.isAdmin}, config.get('privateKey'));
   res.send(token);
});

function validate(user){
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(8).max(255).required()
    });
    return schema.validate(user);
};

module.exports = router;
