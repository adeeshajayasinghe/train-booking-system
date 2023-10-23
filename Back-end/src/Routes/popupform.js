const express = require('express');
const router = express.Router();
const {User} = require('../Models/User');

router.post('/', async (req, res) => {
    try{
        const user = await User.findOne({_id: req.body.userID});
        if (!user) {
            return;
        }
        const { firstName, lastName, mobile, NIC, email } = user; // Destructuring directly

        res.send({ firstName, lastName, mobile, NIC, email });
    } catch(error){
        res.status(500).send('Something went wrong!');
    }
});

module.exports = router;