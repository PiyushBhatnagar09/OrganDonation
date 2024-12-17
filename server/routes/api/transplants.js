const router = require('express').Router();
let Transplant = require('../../models/transplant.model');

router.route('/').get( async (req, res) => {
    console.log("here");
    await Transplant.find()
        .then(transplants => res.json(transplants))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/').post(async (req, res) => {
    await Transplant.create({
        donor_addr: req.body.donor_addr,
        recipient_addr: req.body.recipient_addr
    })
    .then(() => res.json('Transplant information added Successfully'))
    .catch(err => {
        console.log(err);
        res.status(500).json('Internal Server Error')}
    );
});

module.exports = router;