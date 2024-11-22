const mongoose = require("mongoose");

const classificationSchema = new mongoose.Schema({
  imageUrls: [String], // Array of image URLs
  classifications: [String], // Array of classifications for each image
  highestClassification: String, // Highest classification with the highest confidence
  highestConfidence: Number, // Highest confidence value
  date: { type: Date, default: Date.now }, // Date of classification
});

const Classification = mongoose.model("Classification", classificationSchema);

module.exports = Classification;
