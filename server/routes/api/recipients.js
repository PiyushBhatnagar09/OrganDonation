const router = require('express').Router();
let Recipient = require('../../models/recipient.model');

router.route('/').get( async (req, res) => {
    await Recipient.find({
        exist: true,
        matchFound: false
    })
    .then(recipients => res.json(recipients))
    .catch(err => res.status(400).json('Error:' + err));
});

router.route('/').post(async (req, res) => {
    await Recipient.create({
        fname: req.body.fname.toLowerCase(),
        lname: req.body.lname.toLowerCase(),
        gender: req.body.gender,
        city: req.body.city,
        phone: req.body.phone,
        email: req.body.email.toLowerCase(),
        bloodgroup: req.body.bloodgroup,
        organ: req.body.organ,
        recipient_addr: req.body.recipient_addr
    })
    .then(() => res.json('Recipient added Successfully'))
    .catch(err => {
        console.log(err);
        res.status(400).json('Email already registered')}
    );
});

module.exports = router;