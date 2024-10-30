const mongoose = require("mongoose");

const CornSeedsQualityClassificationSchema = new mongoose.Schema({
  imageUrls: [String], // Store S3 image URLs
  classifications: [String], // Store classification results
  date: { type: Date, default: Date.now }, // Store the timestamp
});

module.exports = mongoose.model(
  "Classification",
  CornSeedsQualityClassificationSchema
);
