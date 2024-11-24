// models/PredictionResult.js
const mongoose = require('mongoose');

const predictionResultSchema = new mongoose.Schema({
    predicted_class: String,
    average_confidence: Number,
    probabilities: {
        high: Number,
        medium: Number,
        low: Number
    },
    image1: String,  // Path or URL of the first image
    image2: String   // Path or URL of the second image
}, { timestamps: true });

module.exports = mongoose.model('PredictionResultGuava', predictionResultSchema);


