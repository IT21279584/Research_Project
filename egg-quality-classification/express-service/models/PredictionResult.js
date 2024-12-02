// models/PredictionResult.js
const mongoose = require('mongoose');

const predictionResultSchema = new mongoose.Schema({
    result: String,
    image1: String,  // Path or URL of the first image
    image2: String   // Path or URL of the second image
}, { timestamps: true });

module.exports = mongoose.model('PredictionResultEgg', predictionResultSchema);