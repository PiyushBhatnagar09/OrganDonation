const mongoose = require('mongoose');

const recipientSchema = mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    gender: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    bloodgroup: { type: String, required: true },
    organ: { type: String, required: true },
    recipient_addr: { type: String, required: false, default: "" },
    exist: {type: Boolean, required: false, default: true},
    matchFound: {type: Boolean, required: false, default: false}
});

module.exports = mongoose.model('recipient', recipientSchema);