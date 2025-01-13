const mongoose = require("mongoose");

const SoybeanClassificationSchema = new mongoose.Schema({
  imageUrls: [String], // Array of image URLs
  results: [
    {
      file: String, // File name
      classification: String, // Classification label
      confidence: Number, // Confidence score
      details: [Number], // Array of confidence scores for all classes
    },
  ],
  finalPrediction: {
    label: String, // Highest confidence label
    confidence: Number, // Highest confidence value
  },
  date: { type: Date, default: Date.now }, // Date of classification
});

const Classification = mongoose.model(
  "SoybeanClassification",
  SoybeanClassificationSchema
);

module.exports = Classification;
