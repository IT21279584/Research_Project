// controllers/predictionController.js
const axios = require('axios');
const PredictionResult = require('../models/PredictionResult');
const fs = require('fs');
const FormData = require('form-data');

exports.processPrediction = async (req, res) => {
    try {
        if (!req.files.file1 || !req.files.file2) {
            return res.status(400).json({ error: 'Two image files are required' });
        }

        // Get file paths of uploaded files
        const file1Path = req.files.file1[0].path;
        const file2Path = req.files.file2[0].path;

        // Prepare form data for the ML API
        const formData = new FormData();
        formData.append('file1', fs.createReadStream(file1Path));
        formData.append('file2', fs.createReadStream(file2Path));

        // Call the ML API
        const mlResponse = await axios.post(process.env.ML_API_URL, formData, {
            headers: formData.getHeaders(),
        });

        // Extract the required result from the ML API response
        const result = mlResponse.data.Result;
        // Save the result and image URLs to MongoDB
        const image1URL = `${req.protocol}://${req.get('host')}/uploads/${req.files.file1[0].filename}`;
        const image2URL = `${req.protocol}://${req.get('host')}/uploads/${req.files.file2[0].filename}`;
        
        const predictionResult = new PredictionResult({
            result,
            image1: image1URL,
            image2: image2URL
        });

        await predictionResult.save();

        // Send success response with URLs
        res.json({
            message: 'Files processed and result saved successfully',
            predictionResult
        });
    } catch (error) {
        console.error('Error processing prediction:', error);
        res.status(500).json({ error: 'An error occurred while processing the prediction' });
    }
};

// controllers/predictionController.js

exports.getAllPredictions = async (req, res) => {
    try {
        // Fetch the latest two predictions from MongoDB, sorted by creation date in descending order
        const predictions = await PredictionResult.find()
            .sort({ createdAt: -1 }) // Assumes there is a `createdAt` field
            .limit(2);

        res.json(predictions);
    } catch (error) {
        console.error('Error fetching predictions:', error);
        res.status(500).json({ error: 'An error occurred while fetching predictions' });
    }
};
