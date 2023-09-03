
const express = require('express');
const router = express.Router();

const {User} = require('../Models/User');

router.post('/', async (req, res) => {
    
   console.log(typeof(req.body.userID));
    let user = await User.findOne({_id: req.body.userID});
    if(!user){
        return ;
    }
    const { firstName, lastName, mobile,email } = user; // Destructuring directly

    res.send({ firstName, lastName, mobile,email });
})


module.exports = router;