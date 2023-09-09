const express = require('express');
const router = express.Router();
const {User, validate} = require('../Models/User');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const {Token} = require('../Models/Token');
const sendEmail = require('../Utils/SendEmails');

// This is for get the user details for logged in user which has valid token. Password won't get.
// router.get('/me', auth, async (req, res) => {
//     const user = await User.findById(req.user._id).select('-password');
//     res.send(user);
// })
//https:localhost:4000/register//:id/verify/:emailToken
router.get('/:id/verify/:emailToken', async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if (!user) {
            // return res.status(400).send('Invalid link!');
            return res.status(400).json({ error: 'Invalid link!' });
        }
        const emailToken = await Token.findOne({userId: user._id, emailToken: req.params.emailToken});
        if (!emailToken) {
            // return res.status(400).send('Invalid link!');
            return res.status(400).json({ error: 'Invalid link!' });
        }
        await User.updateOne({_id: user._id}, {verified: true});
        await Token.deleteOne({_userId: user._id, emailToken: req.params.emailToken});
        res.status(200).send('Email verified successfully!');
    } catch(error){
        res.status(500).send('Something went wrong!');
    }
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }


    let user = await User.findOne({email:req.body.email});
    if (user) {
        // return res.status(400).send('User already registered!')
        return res.status(400).json({ error: 'User already registered!' });
    }

    user = new User(_.pick(req.body, ['firstName', 'lastName', 'mobile', 'NIC', 'email', 'password', 'isAdmin']));
    // bcrypt used to hash the password
    // salt is like a key. Without salt we cannot decrypt the hashed password. salt is included in the password.
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user = await user.save();

    //  lodash is used to get specific items to the user as a response. Pick method is usefull for that purpose. 
    // Send the logged in token through a http header.
    const token = jwt.sign({_id:user._id, email:user.email}, config.get('privateKey'));
    // res.header('x-author-token', token).send(_.pick(user, ['name', 'email']));
    const emailToken = new Token({
        userId: user._id,
        emailToken: token
    }).save();
    const url = `${process.env.BASE_URL}register/${user._id}/verify/${token}`;
    await sendEmail(user.email, 'Email Verification', url);
    res.send(token);
});


module.exports = router;