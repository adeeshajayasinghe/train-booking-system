const express = require('express');
const Joi = require('joi');
const router = express.Router();
const {User} = require('../Models/User');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Token} = require('../Models/Token');
const sendOTP = require('../Utils/SendOTP');
require('dotenv').config();

router.post('/sendOTP', async (req, res) => {
    try{
        // Find the user by their email address
        let user = await User.findOne({ email: req.body.recipient_email });
        if (!user) {
            return res.status(400).json({ error: 'User is not registered.' });
        } else{
            await sendOTP(req.body.recipient_email, 'Password Reset', req.body.OTP);
            res.status(200).send('OTP sent successfully!');
            
        }
    } catch(error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
})

router.post('/resetPassword', async (req, res) => {
    const { newpassword, confirmpassword } = req.body;

    if (newpassword.length < 8) {
        return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }

    // Check if the newPassword and confirmPassword match
    if (newpassword !== confirmpassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Find the user by their email address
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ error: 'User not found' });
    }

    // Hash the new password and update the user's password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newpassword, salt);
    await user.save();

    const token = jwt.sign({_id:user._id, isAdmin:user.isAdmin}, process.env.JWT_PRIVATE_KEY);
    res.send({token: token, isAdmin: user.isAdmin});
});

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
    if (!user.verified) {
        let emailToken = await Token.findOne({userId: user._id});
        if (emailToken) {
            // const newToken = jwt.sign({_id:user._id, email:user.email}, config.get('privateKey'));
            // emailToken = new Token({
            //     userId: user._id,
            //     emailToken: newToken
            // }).save();
            // const url = `${process.env.BASE_URL}register/${user._id}/verify/${newToken}`;
            // await sendEmail(user.email, 'Email Verification', url);
            // return res.status(400).send({message:'An email sent to your account. Please verify.'});
            return res.status(400).json({ error: 'An email sent to your account. Please verify.' });
        }else {
            return res.status(400).json({ error: 'Please register using the sign up page' });
        }
        
    }
    /*After logged in server sends a token to the user. Usign this don't need to query the database for some details (like email which is 
        included in the payload) in the next time that user trying to log in.
        First para: payload, second para: Private key(shouldn't be hard coded in the source code like this. This use to identify the user by 
        the server from the token)*/
    // In powershell use $env:variablename = "value" to set environment variables. 'set' will not work.
   const token = jwt.sign({_id:user._id, isAdmin:user.isAdmin}, process.env.JWT_PRIVATE_KEY);
   res.send({token: token, isAdmin: user.isAdmin, userID: user._id });
});

function validate(user){
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(8).max(255).required()
    });
    return schema.validate(user);
};


module.exports = router;