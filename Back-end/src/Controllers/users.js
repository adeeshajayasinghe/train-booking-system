const {User} = require('../Models/User');
const {Token} = require('../Models/Token');

module.exports.verifyEmail = async function (req, res) {
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
        res.status(500);
        res.send({msg: 'Something went wrong!'});
    }
}
