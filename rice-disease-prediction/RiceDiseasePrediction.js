// server/models/Classification.js
const mongoose = require("mongoose");

const RiceDieasePrediction = new mongoose.Schema({
  imageUrls: [String], // Array of image URLs
  classifications: [String], // Array of classifications for each image
  date: { type: Date, default: Date.now }, // Date of classification
});

module.exports = mongoose.model("RiceDieasePrediction", RiceDieasePrediction);