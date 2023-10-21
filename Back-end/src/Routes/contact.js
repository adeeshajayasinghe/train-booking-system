const express = require('express');
const router = express.Router();
const sendEmail = require('../Utils/SendReviews');
const Joi = require('joi');

router.post('/send-email', async (req, res) => {
    const {error} = validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    const { name, email, mobile, subject, message } = req.body;
    await sendEmail(name, email, mobile, subject, message);
    return res.status(200).send("Email sent successfully")
});

function validate(req) {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        mobile: Joi.string().required(),
        subject: Joi.string().required(),
        message: Joi.string().required()
    });
    return schema.validate(req);
}

module.exports = router;