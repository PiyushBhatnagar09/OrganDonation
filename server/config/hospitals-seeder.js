const Hospital = require('../models/hospital.model');
const mongoose = require('mongoose');
const crypto = require('crypto');

require('dotenv').config();  // This must be at the very top

mongoose.connect(process.env.DATABASE_URL);
// mongoose.connect(`mongodb://localhost:27017/OrganDonation`);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
	console.log("Connection Established with Database!")
});

function hashData(data, algorithm = 'sha256') {
  const hash = crypto.createHash(algorithm);
  hash.update(data);
  return hash.digest('hex');
}

var hospitals = [new Hospital({
	username: 'Ace_Hospital',
	password: hashData('1234'),
	hospitalpublickey: '0x68099feE8C881F514dfd6A38fe4F72B9CA5F52e3',
	address: 'Pune, Maharashtra',
	contact: '020-25434063',
	city: 'Pune',
	img: '/images/ace.jpg'
}),
new Hospital({
	username: 'AIIMS_Delhi',
	password: hashData('1234'),
	hospitalpublickey: '0x3B38705F2f0839EcfEe2622b867073e6146fEacd',
	address: 'Aurobindo Marg, New Delhi',
	contact: '011-26588500',
	city: 'New Delhi',
	img: '/images/aiims.jpg'
}),
new Hospital({
	username: 'Fortis_Hospital',
	password: hashData('1234'),
	hospitalpublickey: '0xEe24e5C62A83c96B1De4b041Bd0b870E6202B5A6',
	address: 'vasant kunj, New Delhi',
	contact: '011-42776222',
	city: 'New Delhi',
	img: '/images/fortis.jpg'
}),
new Hospital({
	username: 'GB_Pant_Hospital',
	password: hashData('1234'),
	hospitalpublickey: '0x3CA1077784c6e3fddBFbF7C05a102D80d462e6F9',
	address: 'Nehru Marg, New Delhi',
	contact: '011-23234242',
	city: 'New Delhi',
	img: '/images/gbpant.jpg'
}),
new Hospital({
	username: 'Birla_Hospital',
	password: hashData('1234'),
	hospitalpublickey: '0x7DeC649AAe2aEFce55Bb4743D9Da4b7D1Bb89dAf',
	address: 'Gwalior, Madhya Pradesh',
	contact: '0751-2405659',
	city: 'Gwalior',
	img: '/images/birla.jpg'
})];

var done = 0;

for (var i = 0; i < hospitals.length; i++) {
	hospitals[i].save(function (err, result) {
		done++;
		if (done === hospitals.length)
			exit();
	});
}

function exit() {
	mongoose.disconnect();
}
