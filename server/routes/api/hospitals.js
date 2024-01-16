const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Hospital = require('../../models/hospital.model');

router.route('/:city').get((req, res) => {
    // console.log(req.params.city);
    Hospital.find({
        city: req.params.city
    })
        .then(hospitals => {
            res.send(hospitals)
        })
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/login').post((req, res) => {
    const { username, password } = req.body;
    // console.log(username, password);
    Hospital.findOne({ username })
        .then(hospital => {
            // console.log(hospital);
            if (!hospital) 
                return res.status(400).json({ msg: 'User does not exist' });
            if (hospital.password != password) 
                return res.status(400).json({ msg: 'Invalid Credentials!' });
            // console.log("here");
            const payload = {
                name: hospital.username,
                key: hospital.hospitalpublickey,
            };
            // console.log(payload);
            jwt.sign(payload, 'Think=>Code=>Build=>Hack', (err, token) => {
                // console.log(token);
                if (err) throw err;
                res.json({
                    token: token
                });
            })
        })
})

router.route('/profile/:publicKey').get((req, res) => {
    Hospital.findOne({ hospitalpublickey: req.params.publicKey })
        .then(hospital => {
            res.send(hospital)
        })
        .catch(err => res.status(400).json('Error:' + err));
})

module.exports = router;