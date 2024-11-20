// server/models/Classification.js
const mongoose = require("mongoose");

const RiceDieasePrediction = new mongoose.Schema({
  imageName: String,
  classification: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("RiceDieasePrediction", RiceDieasePrediction);
