const express = require('express');
const router = express.Router();
const {User, validate} = require('../Models/User');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
// const auth = require('../Middlewares/auth');


// This is for get the user details for logged in user which has valid token. Password won't get.
// router.get('/me', auth, async (req, res) => {
//     const user = await User.findById(req.user._id).select('-password');
//     res.send(user);
// })

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

    user = new User(_.pick(req.body, ['firstName', 'lastName', 'mobile', 'email', 'password', 'isAdmin']));
    // bcrypt used to hash the password
    // salt is like a key. Without salt we cannot decrypt the hashed password. salt is included in the password.
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user = await user.save();
    //  lodash is used to get specific items to the user as a response. Pick method is usefull for that purpose. 
    // Send the logged in token through a http header.
    const token = jwt.sign({_id:user._id, email:user.email}, config.get('privateKey'));
    // res.header('x-author-token', token).send(_.pick(user, ['name', 'email']));
    res.send(token);
});


module.exports = router;
