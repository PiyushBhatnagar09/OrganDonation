const router = require('express').Router();
let Transplant = require('../../models/transplant.model');
let Donor = require('../../models/donor.model');
let Recipient = require('../../models/recipient.model');

router.route('/').get( async (req, res) => {
    await Transplant.find()
        .then(transplants => res.json(transplants))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/').post(async (req, res) => {
    await Transplant.create({
        donor_addr: req.body.donor_addr,
        recipient_addr: req.body.recipient_addr
    })
    .then(async () => {
        const donor = await Donor.findOne({
            donor_addr: req.body.donor_addr,
        })
        const recipient = await Recipient.findOne({
            recipient_addr: req.body.recipient_addr
        })

        if (!donor) {
            return res.status(404).json('Donor not found');
        }
        if (!recipient) {
            return res.status(404).json('Recipient not found');
        }

        // Update the donor's address and approval status
        donor.matchFound = true;
        donor.recipient_addr = req.body.recipient_addr;

        recipient.matchFound = true;

        await donor.save();
        await recipient.save();

        res.json('Transplant information added Successfully')
    })
    .catch(err => {
        console.log(err);
        res.status(500).json('Internal Server Error')}
    );
});

module.exports = router;