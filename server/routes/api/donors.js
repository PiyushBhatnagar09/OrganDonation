const router = require('express').Router();
let Donor = require('../../models/donor.model');

router.route('/').get(async (req, res) => {
    await Donor.find({
        approved: true,
        exist: true,
        matchFound: false
    })
        .then(donors => res.json(donors))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/:email').get((req, res) => {
    Donor.findOne({ email: req.params.email })
        .then(donor => res.json(donor))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/donor_info').post((req, res) => {
    Donor.findOne({
        donor_addr: req.body.donor_addr
    })
        .then(donor => res.json(donor))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/:email').delete((req, res) => {
    Donor.deleteOne({ email: req.params.email })
        .then(() => res.json("Donor deleted successfully"))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/').post(async (req, res) => {
    await Donor.create({
        fname: req.body.fname.toLowerCase(),
        lname: req.body.lname.toLowerCase(),
        gender: req.body.gender,
        city: req.body.city,
        phone: req.body.phone,
        email: req.body.email.toLowerCase(),
        bloodgroup: req.body.bloodgroup,
        organ: req.body.organ,
        pass: req.body.pass,
    })
        .then(() => res.json('Donor added Successfully'))
        .catch(err => {
            console.log(err);
            res.status(400).json('Email already registered')
        }
        );
});

router.route('/approve_donor').post(async (req, res) => {
    try {
        const donor = await Donor.findOne({
            fname: req.body.fname.toLowerCase(),
            lname: req.body.lname.toLowerCase(),
            email: req.body.email.toLowerCase()
        })

        if (!donor) {
            return res.status(404).json('Donor not found');
        }

        // Update the donor's address and approval status
        donor.donor_addr = req.body.donor_addr;
        donor.approved = true;

        await donor.save(); // Save the updated donor to the database

        res.json('Donor updated successfully');
    }
    catch (err) {
        console.log(err);
        res.status(500).json('An error occurred while updating the donor');
    }
});

module.exports = router;