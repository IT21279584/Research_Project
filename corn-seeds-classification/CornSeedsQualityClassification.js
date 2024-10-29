const mongoose = require("mongoose");

const CornSeedsQualityClassificationSchema = new mongoose.Schema({
  imageNames: [String], // Store multiple image names
  classifications: [String], // Store multiple classifications
  imageDatas: [Buffer], // Store an array of images as Buffers
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model(
  "Classification",
  CornSeedsQualityClassificationSchema
);
