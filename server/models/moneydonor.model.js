const mongoose = require("mongoose");

const moneydonorSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("Donor", moneydonorSchema);
