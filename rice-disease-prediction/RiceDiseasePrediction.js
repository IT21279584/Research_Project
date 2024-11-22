const mongoose = require("mongoose");

const RiceDiseasePrediction = new mongoose.Schema({
  imageUrls: [String], // Array of image URLs
  predictions: [String], // Array of predictions for each image
  date: { type: Date, default: Date.now }, // Date of prediction
});

module.exports = mongoose.model("RiceDiseasePrediction", RiceDiseasePrediction);
