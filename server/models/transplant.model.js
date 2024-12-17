const mongoose = require('mongoose');

const transplantSchema = mongoose.Schema({
    donor_addr: { type: String, required: false, default: "" },
    recipient_addr: { type: String, required: false, default: "" },
    date: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('transplant', transplantSchema);