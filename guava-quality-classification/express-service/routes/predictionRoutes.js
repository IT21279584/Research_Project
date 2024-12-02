// routes/predictionRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const { processPrediction, getAllPredictions } = require('../controllers/predictionController');
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname); // Get the file extension
        cb(null, file.fieldname + '-' + uniqueSuffix + extension); // Add the extension to the filename
    }
});

const upload = multer({ storage: storage });

// Define the route
router.post('/upload', upload.fields([{ name: 'file1' }, { name: 'file2' }]), processPrediction);

// Route to get all prediction results
router.get('/predictions', getAllPredictions);

module.exports = router;


